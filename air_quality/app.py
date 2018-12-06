from flask import Flask, render_template, jsonify
import pymongo
import os

app = Flask(__name__)

conn = os.environ.get('MONGO_URI')
if not conn:
    conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.citiesDB
breeze_info = db.breeze_info

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/map')
def maps():
    return render_template('map.html')

@app.route('/cityDash')
def city():
    return render_template('cityDash.html')

@app.route('/graphs')
def graphs():
    return render_template('graphs.html')

@app.route('/data')
def data(): 
    city_data = list(db.breeze_info.find())
    new_data = []
    for doc in city_data:
        doc.pop('_id')
        doc["city"] = doc["city"].title()
        new_data.append(doc)
    return jsonify(new_data)

if __name__ == "__main__":
    app.run(debug=True)