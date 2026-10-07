import boto3
import json
import os
from datetime import datetime, timedelta

def lambda_handler(event, context):
    cw = boto3.client('cloudwatch')
    rds = boto3.client('rds')
    sns = boto3.client('sns')
    sns_topic_arn = os.environ.get('SNS_TOPIC_ARN')
    
    findings = []
    
    instances = rds.describe_db_instances()['DBInstances']
    for db in instances:
        db_id = db['DBInstanceIdentifier']
        db_class = db['DBInstanceClass']
        
        # Check Connections last 14 days
        conn_stats = cw.get_metric_statistics(
            Namespace='AWS/RDS',
            MetricName='DatabaseConnections',
            Dimensions=[{'Name': 'DBInstanceIdentifier', 'Value': db_id}],
            StartTime=datetime.utcnow() - timedelta(days=14),
            EndTime=datetime.utcnow(),
            Period=86400 * 14,
            Statistics=['Maximum']
        )
        
        max_conn = 0
        if conn_stats['Datapoints']:
            max_conn = conn_stats['Datapoints'][0]['Maximum']
            
        if max_conn < 5:
            findings.append({
                'category': 'Over-provisioned RDS',
                'resource_id': db_id,
                'detail': f'Max connections (14d): {max_conn}. Current class: {db_class}',
                'recommendation': 'Consider downgrading instance size.'
            })
            
    if findings:
        sns.publish(
            TopicArn=sns_topic_arn,
            Subject='RDS Cost Recommendations',
            Message=json.dumps({'title': 'RDS Advisor Findings', 'findings': findings})
        )
        
    return {'statusCode': 200, 'body': f'Analyzed {len(instances)} RDS instances.'}
