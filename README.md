# 🕵️‍♂️ ResolvAI: Multi-Source Resolution Copilot

**Turning messy transaction history into instant, transparent customer answers.**

## 🎯 The Problem
Customer support agents waste 5-10 minutes per call manually piecing together data from 3+ systems (Billing, Usage, Subscriptions) to resolve billing disputes. This leads to long hold times, agent burnout, and frustrated customers experiencing "bill shock."

## 💡 The Solution
ResolvAI is an intelligent decision engine that:
1. **Ingests** multi-source customer data (subscriptions, usage logs, transactions)
2. **Analyzes** discrepancies using a hybrid approach (rule-based scoring + LLM reasoning)
3. **Decides** the optimal resolution with a fully explainable "Why" trail
4. **Acts** by generating empathetic, transparent customer communications

## 🏗️ Architecture


## 🛠️ Tech Stack
- **Backend:** FastAPI (Python)
- **Frontend:** Streamlit (Python)
- **AI/ML:** OpenAI GPT-4o-mini / LangChain
- **Data:** JSON, Pandas
- **Deployment:** Local (Hackathon PoC)

## 🚀 How to Run Locally

### Prerequisites
- Python 3.9+
- OpenAI API key (for AI features)

### Installation
```bash
# Clone the repository
git clone  https://github.com/kavishanimsara/codeXsabra-ResoveAI.git
cd resolv-ai-copilot

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Run the backend API
uvicorn backend.main:app --reload --port 8000

# In a new terminal, run the frontend
streamlit run frontend/app.py
