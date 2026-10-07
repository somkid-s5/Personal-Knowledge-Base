import json
import boto3
import os

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME', 'PromoTable')
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    Sample Lambda function to handle promotion alerts
    """
    print(f"Received event: {json.dumps(event)}")
    
    # Simple Router based on HTTP Method
    http_method = event.get('httpMethod')
    
    if http_method == 'GET':
        # Fetch items from DynamoDB
        response = table.scan()
        return {
            'statusCode': 200,
            'body': json.dumps(response.get('Items', []))
        }
    
    elif http_method == 'POST':
        # Save item to DynamoDB
        body = json.loads(event.get('body', '{}'))
        table.put_item(Item=body)
        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'Item saved successfully!'})
        }
        
    return {
        'statusCode': 400,
        'body': json.dumps({'error': 'Unsupported method'})
    }
