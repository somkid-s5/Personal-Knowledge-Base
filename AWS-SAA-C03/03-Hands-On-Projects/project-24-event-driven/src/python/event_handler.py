import json
import boto3

# Example of a robust event handler with idempotency check
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('processed_events')

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    # Iterate through SQS records (if triggered via SQS)
    for record in event.get('Records', []):
        try:
            body = json.loads(record['body'])
            # The event from EventBridge is nested inside the SNS message (if fan-out)
            # or directly in SQS body. Let's assume direct EventBridge-to-SQS.
            
            message_id = body.get('id', record['messageId'])
            
            # 1. Idempotency Check
            if check_if_processed(message_id):
                print(f"Skipping already processed event: {message_id}")
                continue
            
            # 2. Process Business Logic
            process_payment(body['detail'])
            
            # 3. Mark as Processed
            mark_as_processed(message_id)
            
        except Exception as e:
            print(f"Error processing record: {e}")
            raise e # Throwing here triggers SQS retry/DLQ

def check_if_processed(id):
    response = table.get_item(Key={'id': id})
    return 'Item' in response

def mark_as_processed(id):
    table.put_item(Item={'id': id, 'status': 'PROCESSED'})

def process_payment(payment_data):
    # Simulated 3rd party API call
    print(f"💰 Processing payment: {payment_data['amount']} {payment_data['currency']}")
    if payment_data['amount'] < 0:
        raise ValueError("Invalid amount")
    print("✅ Payment processed successfully")
