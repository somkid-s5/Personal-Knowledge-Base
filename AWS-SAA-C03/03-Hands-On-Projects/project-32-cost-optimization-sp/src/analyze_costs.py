import boto3
from datetime import datetime, timedelta

def get_ec2_recommendations():
    """
    Fetch cost optimization recommendations from AWS Compute Optimizer
    """
    client = boto3.client('compute-optimizer')
    
    try:
        response = client.get_ec2_instance_recommendations()
        recommendations = response.get('instanceRecommendations', [])
        
        print(f"Found {len(recommendations)} recommendations for EC2.")
        
        for rec in recommendations:
            instance_id = rec.get('instanceArn').split('/')[-1]
            current_type = rec.get('currentInstanceType')
            finding = rec.get('finding')
            
            if finding == 'OVER_PROVISIONED':
                print(f"⚠️ Instance {instance_id} is OVER_PROVISIONED (Current: {current_type})")
                # List top recommendation
                suggestion = rec['recommendationOptions'][0]
                print(f"   👉 Suggested Type: {suggestion['instanceType']} (Estimated Monthly Savings: ${suggestion['estimatedMonthlySavings']['value']})")
                
    except Exception as e:
        print(f"Error fetching recommendations: {str(e)}")

if __name__ == "__main__":
    get_ec2_recommendations()
