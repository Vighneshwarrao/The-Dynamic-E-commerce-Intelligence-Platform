from pydantic import BaseModel
from fastapi import APIRouter
from joblib import load
import re
from nltk.corpus import stopwords
from nltk.stem.snowball import PortugueseStemmer
from deep_translator import GoogleTranslator

import nltk
nltk.download('stopwords')


class Review(BaseModel):
    review: str

vectorizer=load('backend/models/sentiment_vectorizer.joblib')
model=load('backend/models/sentiment_model.joblib')

stemmer=PortugueseStemmer()
stop_words=set(stopwords.words('portuguese'))
def preprocess(text):
    text=str(text)
    text=text.lower()
    text=re.sub(r'[^A-Za-zÀ-ÿ\s]', ' ', text)
    text=re.sub(r'\s+', ' ', text).strip()
    tokens=text.split()
    tokens=[word for word in tokens if word not in stop_words]
    tokens=[stemmer.stem(word) for word in tokens]
    return " ".join(tokens)

router=APIRouter()

@router.post('/analyze/sentiment')
def sentiment_analysis(payload:Review):
    text=payload.review
    translated = GoogleTranslator(source='pt', target='en').translate(text)
    preprocessed_text=preprocess(text)
    text_vec=vectorizer.transform([preprocessed_text])
    pred=model.predict(text_vec)[0]
    prob=model.predict_proba(text_vec)[0]
    probs=[f"{i*100:.2f}%" for i in prob]
    prob_dict={}
    prob_dict['Negative']=probs[0]
    prob_dict['Positive']=probs[1]
    print(prob_dict)
    return{
        'translated':translated,
        'prediction':pred,
        'probability':prob_dict
    }
