# main.py

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data
data = pd.read_csv("data.csv")

@app.get("/api/data")
def get_data(dateRange: str = "3months", service: str = "all"):
    filtered_data = data

    # Apply date filtering
    if dateRange == "3months":
        filtered_data = filtered_data[filtered_data["month"].isin(["Oct", "Nov", "Dec"])]
    elif dateRange == "6months":
        filtered_data = filtered_data[filtered_data["month"].isin(["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])]

    # Apply service filtering
    if service != "all":
        filtered_data = filtered_data[filtered_data["service"] == service]

    return filtered_data.to_dict(orient="records")

@app.get("/api/insights")
def get_insights():
    # Calculate insights, trends, recommendations
    insights = {}
    insights['highest_engagement'] = data.groupby('service')['social_interactions'].sum().idxmax()
    insights['most_active_month'] = data['month'].value_counts().idxmax()
    
    # Example anomaly detection
    data['interaction_change'] = data['social_interactions'].pct_change()
    spikes = data.loc[data['interaction_change'].abs() > 0.3, ["month", "service", "interaction_change"]]
    insights['spikes'] = spikes.to_dict(orient="records")
    
    return {"insights": insights}
