import torch
import torch.nn as nn
import os

# Dummy training script for SageMaker
class SimpleNet(nn.Module):
    def __init__(self):
        super(SimpleNet, self).__init__()
        self.fc = nn.Linear(10, 2)

    def forward(self, x):
        return self.fc(x)

def train():
    print("🚀 Starting training job...")
    
    # Check for GPU
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device: {device}")

    model = SimpleNet().to(device)
    optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
    
    # Training loop simulation
    for epoch in range(5):
        inputs = torch.randn(64, 10).to(device)
        targets = torch.randint(0, 2, (64,)).to(device)
        
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = nn.CrossEntropyLoss()(outputs, targets)
        loss.backward()
        optimizer.step()
        
        print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")

    # Save model
    model_path = os.environ.get('SM_MODEL_DIR', './model')
    if not os.path.exists(model_path):
        os.makedirs(model_path)
    torch.save(model.state_dict(), os.path.join(model_path, 'model.pth'))
    print(f"✅ Model saved to {model_path}")

if __name__ == "__main__":
    train()
