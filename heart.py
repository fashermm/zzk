import pandas as pd
import numpy as np
from sklearn.metrics import make_scorer
import matplotlib.pyplot as plt


data = pd.read_csv(r'D:\数据集\心脏病发作风险预测数据集\heart_attack_prediction_dataset.csv')
y = data['Heart Attack Risk']
#描述 判断是否存在空
print(data)
print(data.describe())

#清晰步骤-------------
#删除无用的患者编号
data.drop('Patient ID', axis = 1, inplace = True)


#看一下男女心脏病的数量有区别
data.replace('Male', 0, inplace = True)
data.replace('Female', 1, inplace = True)
data_male = data[data['Sex'] == 0]
data_female = data[data['Sex'] == 1]

#得到男性数据为 0：3916，1：2195，女性数据为 0：1708，1：994
print(data_male['Heart Attack Risk'].value_counts())
print(data_female['Heart Attack Risk'].value_counts())

#男女心脏风险饼状图 由饼状图可以看的出来性别并不造成影响
""" plt.figure()
plt.subplot(1, 2, 1)
plt.pie([data_male['Heart Attack Risk'].value_counts().at[0], data_male['Heart Attack Risk'].value_counts().at[1]],
        labels = ['0', '1'],autopct='%1.1f%%')
plt.title('male')
plt.subplot(1, 2, 2)
plt.pie([data_female['Heart Attack Risk'].value_counts().at[0], data_female['Heart Attack Risk'].value_counts().at[1]],
        labels = ['0', '1'],autopct='%1.1f%%')
plt.title('female')
plt.show() """

#分开各个州看一下有没有区别 可以看的出来没有区别
""" contient = data['Continent'].unique().tolist()
data_continent = []
i = 1
plt.figure()
for con in contient:
    plt.subplot(1, len(contient), i)
    i += 1
    data_con = data[data['Continent'] == con]
    plt.pie([data['Heart Attack Risk'].value_counts().at[0],data['Heart Attack Risk'].value_counts().at[1]],
            labels = ['0', '1'],autopct='%1.1f%%')
    plt.title(con)
plt.show() """

#将血压值转换为两个整型列
data_pre = data.loc[:,'Blood Pressure'].values.reshape(-1, 1)
data_pressure = []
for i in range(data_pre.shape[0]):
    """print(data_pre[i].shape)
    print(np.array(data_pre[i][0].split('/')).reshape(1, -1)) """
    data_add = data_pre[i][0].split('/')
    data_pressure.append(data_add)
data_pressure = np.array(data_pressure)
data[['high blood pressure', 'low blood pressure']] = data_pressure
data.drop('Blood Pressure', axis = 1, inplace = True)
print(data.columns)

use_los = ['Sex', 'Contient', 'Hemisphere']
#将y分离出来
data.drop('Heart Attack Risk', axis = 1, inplace = True)