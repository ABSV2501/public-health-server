
# coding: utf-8

# In[26]:


import sys
import pandas as pd
import cv2
import numpy as np
import pickle
import os
os.environ['PF_CPP_MIN_LOG_LEVEL']='2'


# In[31]:


#df = pd.read_csv(path)
df = pd.read_csv(sys.argv[1])
df.dropna(inplace=True)
# load the model from disk
loaded_model = pickle.load(open(sys.argv[2], 'rb'))
district = np.array(df['district'])


# In[33]:


#normalization
arr_final = np.asarray(df)
for i in range(arr_final.shape[1]):
    arr_final[:,i]=(arr_final[:,i]-arr_final[:,i].mean())/arr_final[:,i].std()




# In[35]:


result = loaded_model.predict(arr_final)


# In[40]:


df = pd.DataFrame()
df['district'] = district
df['pred'] = result


# In[43]:


df.loc[df['pred']<=10,'pred']=1
df.loc[df['pred']==11,'pred']=0


# In[62]:


df_new=pd.DataFrame()
district_new = []
percs = []


# In[63]:


for i in range(int(df['district'].min()),int(df['district'].max())+1):
    true_val=(df[df['district']==i]['pred']==1).sum()
    total_val=(df['district']==i).sum()
    percs.append(true_val/total_val*100)
    district_new.append(i)
    


# In[64]:


df_new['district'] = district_new
df_new['perc'] = percs


# In[ ]:


df_new.to_csv(sys.argv[3],index=False)

