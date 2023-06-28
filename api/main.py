from fastapi import FastAPI, HTTPException, UploadFile,File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel
import pandas as pd
import sqlite3
import os, json
import createcreds
app = FastAPI()

security = HTTPBasic()

app.add_middleware(
      CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
async def login(credentials: HTTPBasicCredentials):
    correct_username = "admin"
    correct_password = "1234"
    conn = sqlite3.connect('main.db',)
    sql = 'SELECT user, password from admin'
    cursor = conn.cursor()
    cursor.execute(sql)
    res = cursor.fetchall()
    maindata = {}
    for i in res:
        uname = i[0]
        upass = i[1]
        maindata.update({uname:upass})

    if credentials.username in maindata.keys() :
        if credentials.password == maindata[credentials.username] :
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Incorrect password")
    else:
            raise HTTPException(status_code=401, detail="Incorrect username")

def getdf(raw,fname,fval):
    data = {}
    for i in raw:
        name = i[0]
        value = i[1]
        if name in data.keys():
            data[name] = data[name] + value
        else:
            data.update({name:value})
    temp = {fname:list(data.keys()),fval:list(data.values())}
    df = pd.DataFrame.from_dict(temp)
    return df

@app.get("/")
def root():
    return {"message": "Hello World"}

class JSONData(BaseModel):
    data: str

@app.post("/getdata")
def upload_json(json_data: JSONData):
    data = json_data.data
    df = pd.read_json(data)
    df.columns = df.columns.str.strip()
    df = df.dropna(how='any')
    conn = sqlite3.connect('main.db',)
    cursor = conn.cursor()
    df.to_sql('iteminfo', conn, if_exists='replace')
    cursor.execute('DELETE FROM ITEMINFO WHERE BUYER IS NULL')
    conn.close()
    return {"message": "JSON data received and processed successfully"}


@app.get("/process")
async def process():
    charts = [['pi','chart1','SELECT category, units FROM ITEMINFO','category','units'],['bar','chart2','SELECT LOCATION, UNITS FROM ITEMINFO','category','units'],['bar','chart3','SELECT BUYER, TOTAL FROM ITEMINFO','category','units']]
    conn = sqlite3.connect('main.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM ITEMINFO WHERE BUYER IS NULL')
    data = []
    for i in charts:
        cursor.execute(i[2])
        res = cursor.fetchall();
        df = getdf(res,i[3],i[4])
        data.append({i[1]:[i[0],df.to_dict('list')]})
    return data
