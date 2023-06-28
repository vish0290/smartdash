FROM python:3.8-slim-buster
WORKDIR /app
COPY req.txt req.txt
RUN pip3 install -r req.txt
COPY . /app/
CMD [ "uvicorn", "main:app","--host","0.0.0.0" ,"--port","8000"]