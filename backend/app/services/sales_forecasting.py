from fastapi import APIRouter
import pandas as pd
import joblib
from pydantic import BaseModel

class SalesFeatures(BaseModel):
    num_of_order: int
    sales_lag_1:float
    sales_lag_2:float
    sales_lag_3:float
    sales_lag_4:float
    rolling_mean_4:float
    rolling_std_4:float
    year:int
    month:int
    week_of_year:int

router=APIRouter()

model=joblib.load("backend/models/sales_forecast_model.joblib")
@router.post("/predict/sales")
def predict_sales(features:SalesFeatures):
    print("Received data:", features)
    data=pd.DataFrame([features.dict()])
    prediction=model.predict(data)
    return {"predicted_sales":float(prediction[0])}
