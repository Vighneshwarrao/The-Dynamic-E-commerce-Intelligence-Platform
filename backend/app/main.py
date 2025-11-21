from fastapi import FastAPI,Response
from backend.app.services import sales_forecasting ,chrun_prediction,recommendation_model,sentiment_analysis
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
'''Allow Origins'''
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)
# --- Recommended Health endpoint ---
@app.api_route("/", methods=["GET", "HEAD"], include_in_schema=False)
def hello():
    # GET returns JSON body; HEAD will get the same status + headers but no body (server handles it)
    return {"message": "Hello World !", "status": "ok"}

app.include_router(sales_forecasting.router)
app.include_router(chrun_prediction.router)
app.include_router(recommendation_model.router)
app.include_router(sentiment_analysis.router)