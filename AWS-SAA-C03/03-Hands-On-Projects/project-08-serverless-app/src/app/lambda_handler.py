import json
import boto3
import os
from aws_xray_sdk.core import patch_all

# Patch all supported libraries for X-Ray tracing
patch_all()

# Initialize DynamoDB client outside the handler for connection reuse (Cold Start Optimization)
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME', 'thaidemo-items')
table = dynamodb.Table(table_name)

def handler(event, context):
    """
    Serverless API handler for items.
    """
    print(f"Received event: {json.dumps(event)}")
    
    try:
        # API Gateway HTTP API v2 payload format
        http_method = event.get('requestContext', {}).get('http', {}).get('method', event.get('httpMethod', 'GET'))
        path = event.get('requestContext', {}).get('http', {}).get('path', event.get('path', '/'))
        
        if http_method == 'GET':
            response = table.scan()
            return _build_response(200, response.get('Items', []))
        
        elif http_method == 'POST':
            body = json.loads(event.get('body', '{}'))
            if 'id' not in body:
                return _build_response(400, {'error': 'Missing required field: id'})
                
            table.put_item(Item=body)
            return _build_response(201, {'message': 'Item saved successfully!', 'item': body})
            
        elif http_method == 'DELETE':
            body = json.loads(event.get('body', '{}'))
            if 'id' not in body:
                return _build_response(400, {'error': 'Missing required field: id'})
                
            table.delete_item(Key={'id': body['id']})
            return _build_response(200, {'message': 'Item deleted successfully!'})
            
        else:
            return _build_response(405, {'error': 'Method Not Allowed'})
            
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return _build_response(500, {'error': 'Internal Server Error'})

def _build_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' # CORS
        },
        'body': json.dumps(body)
    }
