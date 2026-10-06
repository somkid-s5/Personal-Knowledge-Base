import boto3
import json
from datetime import datetime, timedelta

def lambda_handler(event, context):
    rds_client = boto3.client('rds')
    cloudwatch = boto3.client('cloudwatch')
    
    findings = []
    
    # Find RDS instances
    instances = rds_client.describe_db_instances()
    
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(days=14)
    
    for db in instances['DBInstances']:
        db_id = db['DBInstanceIdentifier']
        db_class = db['DBInstanceClass']
        
        # Check CloudWatch CPU
        stats = cloudwatch.get_metric_statistics(
            Namespace='AWS/RDS',
            MetricName='CPUUtilization',
            Dimensions=[{'Name': 'DBInstanceIdentifier', 'Value': db_id}],
            StartTime=start_time,
            EndTime=end_time,
            Period=86400, # Daily
            Statistics=['Average']
        )
        
        # Check DB Connections
        conn_stats = cloudwatch.get_metric_statistics(
            Namespace='AWS/RDS',
            MetricName='DatabaseConnections',
            Dimensions=[{'Name': 'DBInstanceIdentifier', 'Value': db_id}],
            StartTime=start_time,
            EndTime=end_time,
            Period=86400, # Daily
            Statistics=['Maximum']
        )
        
        is_idle = True
        
        if stats['Datapoints'] and conn_stats['Datapoints']:
            for dp in stats['Datapoints']:
                if dp['Average'] > 10.0:
                    is_idle = False
                    break
            
            if is_idle:
                for cp in conn_stats['Datapoints']:
                    if cp['Maximum'] > 5:
                        is_idle = False
                        break
        else:
            is_idle = False # Not enough data
            
        if is_idle:
            findings.append({
                'Resource': db_id,
                'Type': f"Idle RDS ({db_class})",
                'Recommendation': 'Consider downsizing or stopping'
            })

    print(json.dumps(findings, indent=2))
    return {
        'statusCode': 200,
        'body': json.dumps(findings)
    }
