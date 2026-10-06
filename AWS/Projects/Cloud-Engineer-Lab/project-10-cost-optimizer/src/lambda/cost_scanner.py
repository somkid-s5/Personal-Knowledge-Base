import boto3
import json
import os
from datetime import datetime, timedelta

def get_metric_average(cw, instance_id, metric_name):
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(days=7)
    
    response = cw.get_metric_statistics(
        Namespace='AWS/EC2',
        MetricName=metric_name,
        Dimensions=[{'Name': 'InstanceId', 'Value': instance_id}],
        StartTime=start_time,
        EndTime=end_time,
        Period=86400 * 7,
        Statistics=['Average']
    )
    
    if response['Datapoints']:
        return response['Datapoints'][0]['Average']
    return None

def lambda_handler(event, context):
    ec2 = boto3.client('ec2')
    cw = boto3.client('cloudwatch')
    sns = boto3.client('sns')
    sns_topic_arn = os.environ.get('SNS_TOPIC_ARN')
    
    findings = []
    total_savings = 0
    
    # 1. Find Idle EC2 Instances
    instances = ec2.describe_instances(Filters=[{'Name': 'instance-state-name', 'Values': ['running']}])
    for reservation in instances['Reservations']:
        for instance in reservation['Instances']:
            instance_id = instance['InstanceId']
            avg_cpu = get_metric_average(cw, instance_id, 'CPUUtilization')
            
            if avg_cpu is not None and avg_cpu < 5.0:
                findings.append({
                    'category': 'Idle EC2',
                    'resource_id': instance_id,
                    'detail': f'Avg CPU: {avg_cpu:.2f}%',
                    'savings': 15.0 # Estimated $15/month for t3.micro/small
                })
                total_savings += 15.0

    # 2. Find Unattached EBS Volumes
    volumes = ec2.describe_volumes(Filters=[{'Name': 'status', 'Values': ['available']}])
    for vol in volumes['Volumes']:
        vol_id = vol['VolumeId']
        size = vol['Size']
        cost = size * 0.1 # $0.1 per GB-month
        findings.append({
            'category': 'Unattached EBS',
            'resource_id': vol_id,
            'detail': f'Size: {size}GB',
            'savings': cost
        })
        total_savings += cost

    # 3. Find Unused NAT Gateways
    # (Simplified check: check if NAT gateway exists and has very low data processed)
    # In real life, you'd check CloudWatch for BytesProcessed
    
    if findings:
        message = {
            'title': 'AWS Cost Scanner Findings',
            'total_savings': f'${total_savings:.2f}/month',
            'findings': findings
        }
        sns.publish(
            TopicArn=sns_topic_arn,
            Subject='Cost Optimization Recommendations',
            Message=json.dumps(message)
        )
        
    return {
        'statusCode': 200,
        'body': json.dumps(f'Found {len(findings)} issues.')
    }
