import sqlite3
import pandas as pd
users = {'user':['kvv','vas'],'password':['1234','5678']}
df = pd.DataFrame(users)
conn = sqlite3.connect('main.db')
df.to_sql('admin', conn, if_exists= 'replace')
conn.close()
print(df)
