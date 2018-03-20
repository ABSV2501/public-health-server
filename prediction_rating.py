import sys
import pandas as pd
import cv2
import numpy as np
import pickle
import os
os.environ['PF_CPP_MIN_LOG_LEVEL']='2'


#df = pd.read_csv('cleaned_hospital_data_test.csv')
df = pd.read_csv(sys.argv[1])
df.dropna(inplace=True)
# load the model from disk
loaded_model = pickle.load(open(sys.argv[2], 'rb'))
hos_names = np.array(df['Hospital Name'])

df['Hospital Type'] = df['Hospital Type'].astype('category')
df['Hospital Type'] = df['Hospital Type'].cat.codes

for i in range(0,df.shape[1]):
    if df.iloc[:,i].dtype == object:
        df.iloc[:,i] = df.iloc[:,i].astype('category')
        df.iloc[:,i]=df.iloc[:,i].cat.codes
    elif df.iloc[:,i].dtype == bool:
        df.iloc[:,i] = df.iloc[:,i]*1

df.drop(['Hospital Name'],inplace=True,axis=1)
res = loaded_model.predict(df)
df_new = pd.DataFrame()
df_new['Hospital Name']=hos_names
df_new['Rating'] = res

df_new.to_csv(sys.argv[3],index=False)