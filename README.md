
# 📦 Dynamic E-commerce Intelligence Platform

A full-stack, production-grade machine learning platform that integrates four intelligence modules essential for modern e-commerce operations:

- **Sales Forecasting**
- **Customer Churn Prediction**
- **Product Recommendations**
- **Sentiment Analysis**

Frontend hosted on **GitHub Pages**, backend deployed on **Render**, powered by **FastAPI**, **scikit-learn**, **Pandas**, and **HTML/CSS/JS**.

---

## 🚀 Features

### 🔮 1. Sales Forecasting (Linear Regression)
Predicts weekly revenue using engineered features like:
- Lag values  
- Rolling means & std
- Week-of-year, year & month  
- Number of orders in a week 

### 🧊 2. Customer Churn Prediction (Logistic Regression)
Identifies customers at high risk of churn using:
- Recency  
- Frequency  
- Monetary Value  
- Review Score Behavior  
- Items Per Order  
Returns a probability score for targeted retention.

### 🧲 3. Product Recommendations (Item-based KNN)
Recommends top similar products using:
- User–item sparse matrix  
- Cosine similarity  
- Item-based collaborative filtering  

### 💬 4. Sentiment Analysis (Naive Bayes + TF-IDF)
Classifies customer reviews as **Positive** or **Negative** after:
- Text cleaning  
- Stopword removal  
- TF-IDF vectorization  

---

## 🏗️ System Architecture

```
 GitHub Pages (Frontend)
            |
            v
 FastAPI Backend (Render)
            |
            v
  ML Models (Sales, Churn, Sentiment, Recommendations)
```

---

## 📂 Project Structure

```
ecommerce-intelligence-platform/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   └── services/
│   │       ├── sales_predictor.py
│   │       ├── churn_predictor.py
│   │       ├── sentiment_analyzer.py
│   │       └── recommendations.py
│   ├── models/
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
│
└── notebooks/
    ├── 01_data_exploration.ipynb
    ├── 02_sales_forecasting_model.ipynb
    ├── 03_churn_prediction_model.ipynb
    ├── 04_recommendation_model.ipynb
    └── 05_sentiment_analysis_model.ipynb
```

---

## 🧪 API Endpoints

### **Sales Forecasting**
`POST /predict/sales`
```json
{
  "sales_lag_1": 65000,
  "sales_lag_2": 63400,
  "sales_lag_3": 61800,
  "sales_lag_4": 78000,
  "rolling_mean_4_weeks": 56000,
  "rolling_std_4_weeks":250,
  "week_of_year": 23,
  "year":2018,
  "month": 6
}
```
**Response**
```json
{ "predicted_sales": 74560.22 }
```

---

### **Customer Churn**
`GET /predict/churn/{customer_id}`
```json
{
  "customer_id": "123abc",
  "churn_probability": "0.83%"
}
```

---

### **Product Recommendations**
`GET /recommend/products/{product_id}`
```json
{
  "recommendations": ["prod_01", "prod_02", "prod_03", "prod_04", "prod_05"],
  "Average Review Score":[5,4,3,2,1]
}
```

---

### **Sentiment Analysis**
`POST /analyze/sentiment`
```json
{ "review_text": "produto excelente!" }
```
**Response**
```json
{ "sentiment": "Positive",
  "translated":"English meaning" }
```

---

## 🌐 Deployment

### **Frontend on GitHub Pages**
1. Move the frontend into a `docs/` folder:
```bash
cp -r frontend/* docs/
```
2. Push to GitHub  
3. Enable in GitHub → Settings → Pages → Source: `/docs`

---

### **Backend on Render**
- Connect GitHub repo  
- Render auto-builds using Dockerfile  
- Backend becomes available at:  
  `https://<service>.onrender.com`

Update your frontend JS to call the backend URL.

---

## 🐳 Running Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
python -m http.server 5500
```
Visit → `http://localhost:5500`

---

## 🔧 Tech Stack
- **FastAPI**
- **scikit-learn**
- **Pandas / NumPy**
- **Naive Bayes / Logistic Regression / KNN / Linear Regression**
- **HTML / CSS / JavaScript**
- **Render (Backend Hosting)**
- **GitHub Pages (Frontend Hosting)**

---

## 🏆 Author
**Vighneshwar Rao Bandaru**  
Engineer & Machine Learning Developer
