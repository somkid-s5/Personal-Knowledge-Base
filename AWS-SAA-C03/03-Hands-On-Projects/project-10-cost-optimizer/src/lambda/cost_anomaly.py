import boto3
import json
import os
from datetime import datetime, timedelta

def lambda_handler(event, context):
    ce = boto3.client('ce')
    sns = boto3.client('sns')
    sns_topic_arn = os.environ.get('SNS_TOPIC_ARN')
    
    # Define time periods
    end = datetime.now().date()
    start_this_week = end - timedelta(days=7)
    start_last_week = end - timedelta(days=14)
    
    # Get costs for this week
    this_week = ce.get_cost_and_usage(
        TimePeriod={'Start': str(start_this_week), 'End': str(end)},
        Granularity='MONTHLY',
        Metrics=['UnblendedCost'],
        GroupBy=[{'Type': 'DIMENSION', 'Key': 'SERVICE'}]
    )
    
    # Get costs for last week
    last_week = ce.get_cost_and_usage(
        TimePeriod={'Start': str(start_last_week), 'End': str(start_this_week)},
        Granularity='MONTHLY',
        Metrics=['UnblendedCost'],
        GroupBy=[{'Type': 'DIMENSION', 'Key': 'SERVICE'}]
    )
    
    # Compare (Simplified logic for demo)
    anomalies = []
    # Real implementation would map services and compare amounts
    
    if anomalies:
        sns.publish(
            TopicArn=sns_topic_arn,
            Message=json.dumps({'title': 'Cost Anomalies', 'anomalies': anomalies})
        )
        
    return {'statusCode': 200, 'body': 'Anomaly check complete.'}
