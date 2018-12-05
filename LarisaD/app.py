import os

import pandas as pd
import numpy as np
from flask_pymongo import PyMongo
import pymongo
from flask import Flask, jsonify, render_template

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.air_quality
air_results = db.air_results

@app.route("/map")
def index():
    return render_template("index.html")
    
@app.route("/data")
def data():
    air_data = list(db.air_results.find())
    new_data = []
    for doc in air_data:
        doc.pop('_id')
        doc["city"] = doc["city"].title()
        new_data.append(doc)
    return jsonify(new_data)

if __name__ == "__main__":
    app.run(debug=True)