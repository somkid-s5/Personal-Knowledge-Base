resource "aws_fis_experiment_template" "cpu_stress" {
  description = "Stress CPU on 20% of instances in the target group"
  role_arn    = aws_iam_role.fis_role.arn

  stop_condition {
    source = "none"
  }

  action {
    action_id = "aws:ec2:send-spot-instance-interruptions" # Or cpu-stress
    name      = "stress-cpu"
    target {
      key   = "Instances"
      value = "target-instances"
    }
  }

  target {
    name           = "target-instances"
    resource_type  = "aws:ec2:instance"
    selection_mode = "PERCENT(20)"
    resource_tag {
      key   = "Environment"
      value = "Staging"
    }
  }
}
