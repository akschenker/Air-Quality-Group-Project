from flask import Flask, render_template, jsonify
import pymongo

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.citiesDB
breeze_info = db.breeze_info

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/cityDash')
def city():
    return render_template('city.html')

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