import sys

def calculate_migration_savings(on_prem_monthly, cloud_estimated_monthly, migration_cost):
    """
    Analyzes TCO and ROI for cloud migration.
    """
    monthly_savings = on_prem_monthly - cloud_estimated_monthly
    annual_savings = monthly_savings * 12
    payback_months = migration_cost / monthly_savings if monthly_savings > 0 else float('inf')
    roi_3_year = ((annual_savings * 3) - migration_cost) / migration_cost * 100

    print(f"--- Migration Financial Analysis ---")
    print(f"Monthly Savings: ${monthly_savings:,.2f}")
    print(f"Annual Savings: ${annual_savings:,.2f}")
    print(f"Payback Period: {payback_months:.1f} months")
    print(f"3-Year ROI: {roi_3_year:.1f}%")

    if roi_3_year < 20:
        print("[WARN] Low ROI. Consider Replatforming or Refactoring to reduce cloud costs.")

if __name__ == "__main__":
    # Example values for ThaiRetail Inventory System
    ON_PREM = 15000  # Hardware, Power, Cooling, Admin
    CLOUD_EST = 8500  # EC2, RDS, Bandwidth, Support
    MIG_COST = 50000  # Engineering hours + tools
    
    calculate_migration_savings(ON_PREM, CLOUD_EST, MIG_COST)
