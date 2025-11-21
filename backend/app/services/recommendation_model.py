from fastapi import APIRouter,Query
from joblib import load
from scipy.sparse import load_npz
import pandas as pd

router=APIRouter()

knn=load('backend/models/recommendation_model.joblib')
product_to_index=load('backend/models/product_to_index.joblib')
index_to_product=load('backend/models/index_to_product.joblib')
item_user_matrix=load_npz('backend/models/item_user_matrix.npz')
avg_review=pd.read_csv('datasets/avg_product_review_score.csv')

@router.get('/recommend/products')
def get_products(product_id:str=Query(...,description='product_id')):
    print(product_id)
    qry_indx=product_to_index[product_id]
    dist,indices=knn.kneighbors(item_user_matrix[qry_indx],n_neighbors=6)
    indices=indices.flatten()
    neighbors=[index_to_product[i] for i in indices if i!=qry_indx]
    print(neighbors)

    avg_review_dict = dict(zip(avg_review['product_id'], avg_review['avg_review_score']))
    avg_review_score = [avg_review_dict[i] for i in neighbors]

    print(avg_review_score)
    return {'recommendations':neighbors,'average_review_score':avg_review_score}