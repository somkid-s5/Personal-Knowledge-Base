import json
import boto3
import psycopg2 # Use RDS as source of truth

def publish_from_outbox():
    # Transactional Outbox Pattern
    # 1. App writes Order to 'orders' table AND 'outbox' table in ONE transaction.
    # 2. This script polls 'outbox' table and publishes to EventBridge.
    
    conn = psycopg2.connect("...")
    cur = conn.cursor()
    
    cur.execute("SELECT id, event_type, payload FROM outbox WHERE processed = false LIMIT 10 FOR UPDATE SKIP LOCKED")
    events = cur.fetchall()
    
    eb = boto3.client('events')
    
    for event_id, event_type, payload in events:
        eb.put_events(
            Entries=[{
                'Source': 'thaishop.checkout',
                'DetailType': event_type,
                'Detail': json.dumps(payload),
                'EventBusName': 'orders-bus'
            }]
        )
        cur.execute("UPDATE outbox SET processed = true WHERE id = %s", (event_id,))
    
    conn.commit()
