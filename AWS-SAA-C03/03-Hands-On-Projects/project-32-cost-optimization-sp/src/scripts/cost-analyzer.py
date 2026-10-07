import boto3
import json

def get_unit_economics(cluster_name):
    """
    Calculates cost per request/user by combining EKS and CUR data.
    """
    ce = boto3.client('ce')
    
    # Placeholder for EKS metrics (In real world, fetch from Prometheus)
    total_requests = 1000000 
    
    # Fetch Cost for EKS Service
    cost_data = ce.get_cost_and_usage(
        TimePeriod={'Start': '2024-03-01', 'End': '2024-03-31'},
        Granularity='MONTHLY',
        Filter={
            "Tags": {"Key": "Project", "Values": ["thaidemo-eks"]}
        },
        Metrics=['UnblendedCost']
    )
    
    total_cost = float(cost_data['ResultsByTime'][0]['Total']['UnblendedCost']['Amount'])
    cost_per_request = total_cost / total_requests
    
    return {
        "Project": "EKS-Prod",
        "Total_Cost": total_cost,
        "Total_Requests": total_requests,
        "Cost_Per_1k_Requests": cost_per_request * 1000
    }

if __name__ == "__main__":
    report = get_unit_economics("thaidemo-eks")
    print(json.dumps(report, indent=4))
