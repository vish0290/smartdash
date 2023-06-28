import random
import pandas as pd
category = ['fruits', 'vegetables', 'grains and cerials']
data = {'fruits':[{'apple':50},{'bananas':30}, {'oranges':35},{'strawberries':50}, {'grapes':40}], 'vegetables':[{'broccoli':20}, {'carrot':50}, {'potato':20}, {'tomatoe':15}, {'bell pepper':30}],'grains and cerials':[{'rice':50},{'wheat':30}, {'oats':30},{'pasta':25}]}
users = [ ['Iron Man', 'abc' , 'bangaluru north'],
['Captain America', 'abc', 'bangaluru south'], 
['Thor', 'abc', 'bangaluru east'],
['Hulk', 'abc', 'bangaluru north'],
['Black Widow', 'abc', 'bangaluru west'],
['Spider-Man' , 'abc', 'bangaluru north'], 
['Black Panther' , 'abc', 'bangaluru south'],
['Doctor Strange', 'abc', 'bangaluru west'], 
['Captain Marvel', 'abc', 'bangaluru north'],
['Hawkeye', 'abc', 'bangaluru north']] 
num = int(input('Enter the no of entries: '))


maindata = []

for i in range(num):
    cat = random.choice(category)
    items = data[cat]
    info = random.choice(items)
    item = list(info.keys())
    item = str(item[0])
    mrp = list(info.values())
    mrp = mrp[0]
    user = random.choice(users)
    buyer = user[0]
    address = user[1]
    location = user[2]
    units = random.randint(1, 5)
    total = mrp * units
    temp = {'products': item, 'category': cat,	'units': units,	'mrp': mrp ,'total': total, 'buyer': buyer, 'location':location}
    maindata.append(temp)
    
print(len(maindata))
df = pd.DataFrame.from_dict(maindata)
print(df)
df.to_csv('data.csv', index=False)    