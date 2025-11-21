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
@app.get("/health", include_in_schema=False)
def health_check():
    return {"status": "ok"}

@app.head("/health", include_in_schema=False)
def health_check_head():
    return Response(status_code=200)


@app.get('/')
def hello():
    return {"message":"Hello World !"}

app.include_router(sales_forecasting.router)
app.include_router(chrun_prediction.router)
app.include_router(recommendation_model.router)
app.include_router(sentiment_analysis.router)