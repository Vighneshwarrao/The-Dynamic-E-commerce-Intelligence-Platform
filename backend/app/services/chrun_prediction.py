from fastapi import APIRouter,Query
import joblib
import pandas as pd
from pathlib import Path

BASE = Path(__file__).resolve().parent  # backend/services
DATASET_PATH = BASE.parents[2] / "datasets" / "customer_df.csv"

router=APIRouter()

model=joblib.load('backend/models/churn_prediction_model.joblib')

customer_df=pd.read_csv(DATASET_PATH)
feature_list=['total_payment', 'avg_score', 'avg_items','avg_delivery_time', 'avg_delivery_delay', 'delivery_fail_rate']
@router.get('/predict/churnprob')
def predict_churn(customer_id:str=Query(..., description="customer_unique_id")):
    print(customer_id)
    data=customer_df.loc[customer_df['customer_unique_id']==customer_id]
    print(data)
    if data.empty:
        return {'error':'Customer not found'}

    X=data[feature_list].values

    prob=model.predict_proba(X)[0][1]

    return {
        'customer_id':customer_id,
        'probability':f'{prob*100:.2f}%'
    }