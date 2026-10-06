import boto3
import json
from datetime import datetime, timedelta

def lambda_handler(event, context):
    ec2_client = boto3.client('ec2')
    cloudwatch = boto3.client('cloudwatch')
    
    findings = []
    
    # 1. Find Unattached EBS Volumes
    volumes = ec2_client.describe_volumes(Filters=[{'Name': 'status', 'Values': ['available']}])
    for vol in volumes['Volumes']:
        size_gb = vol['Size']
        # Rough estimate: $0.08/GB-month for gp3
        cost = size_gb * 0.08
        findings.append({
            'Resource': vol['VolumeId'],
            'Type': 'EBS Volume (Unattached)',
            'Waste_Cost_Monthly': f"${cost:.2f}"
        })
        
    # 2. Find Idle EC2 Instances (CPU < 5% for 7 days)
    instances = ec2_client.describe_instances(Filters=[{'Name': 'instance-state-name', 'Values': ['running']}])
    
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(days=7)
    
    for reservation in instances['Reservations']:
        for inst in reservation['Instances']:
            instance_id = inst['InstanceId']
            
            # Check CloudWatch CPU
            stats = cloudwatch.get_metric_statistics(
                Namespace='AWS/EC2',
                MetricName='CPUUtilization',
                Dimensions=[{'Name': 'InstanceId', 'Value': instance_id}],
                StartTime=start_time,
                EndTime=end_time,
                Period=86400, # Daily
                Statistics=['Average']
            )
            
            is_idle = True
            if stats['Datapoints']:
                for dp in stats['Datapoints']:
                    if dp['Average'] > 5.0:
                        is_idle = False
                        break
            else:
                is_idle = False # Not enough data
                
            if is_idle:
                findings.append({
                    'Resource': instance_id,
                    'Type': f"Idle EC2 ({inst.get('InstanceType')})",
                    'Waste_Cost_Monthly': "Varies"
                })

    # Return results
    print(json.dumps(findings, indent=2))
    return {
        'statusCode': 200,
        'body': json.dumps(findings)
    }
