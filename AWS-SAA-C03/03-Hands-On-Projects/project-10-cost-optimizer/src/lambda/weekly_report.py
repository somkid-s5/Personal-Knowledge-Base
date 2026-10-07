import boto3
import json
import os
from datetime import datetime, timedelta

def lambda_handler(event, context):
    ce = boto3.client('ce')
    sns = boto3.client('sns')
    sns_topic_arn = os.environ.get('SNS_TOPIC_ARN')
    
    end = datetime.now().date()
    start = end - timedelta(days=30)
    
    response = ce.get_cost_and_usage(
        TimePeriod={'Start': str(start), 'End': str(end)},
        Granularity='MONTHLY',
        Metrics=['UnblendedCost'],
        GroupBy=[{'Type': 'DIMENSION', 'Key': 'SERVICE'}]
    )
    
    services = []
    for group in response['ResultsByTime'][0]['Groups']:
        services.append({
            'name': group['Keys'][0],
            'amount': float(group['Metrics']['UnblendedCost']['Amount'])
        })
        
    # Sort by amount descending
    services.sort(key=lambda x: x['amount'], reverse=True)
    top_5 = services[:5]
    
    sns.publish(
        TopicArn=sns_topic_arn,
        Message=json.dumps({'title': 'Weekly Cost Report', 'top_5': top_5})
    )
    
    return {'statusCode': 200, 'body': 'Weekly report sent.'}
