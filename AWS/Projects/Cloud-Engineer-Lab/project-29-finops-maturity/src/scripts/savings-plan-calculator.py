import boto3
import json

def analyze_savings_plans():
    """
    Analyzes compute usage and recommends Savings Plan commitment.
    """
    client = boto3.client('ce') # Cost Explorer
    
    # In a real environment, we'd use GetSavingsPlansPurchaseRecommendation
    # For the lab, we'll simulate the logic.
    
    on_demand_hourly_avg = 15.50 # $15.50/hr average on-demand spend
    sp_discount_avg = 0.30       # 30% average discount
    
    target_commitment = on_demand_hourly_avg * 0.8 # Aim for 80% coverage
    estimated_monthly_savings = (on_demand_hourly_avg * sp_discount_avg) * 24 * 30
    
    print("--- Savings Plan Recommendation ---")
    print(f"Current Avg On-Demand: ${on_demand_hourly_avg}/hr")
    print(f"Recommended Commitment: ${target_commitment:.2f}/hr")
    print(f"Estimated Monthly Savings: ${estimated_monthly_savings:,.2f}")
    print(f"Total Annual Savings: ${estimated_monthly_savings * 12:,.2f}")

if __name__ == "__main__":
    analyze_savings_plans()
