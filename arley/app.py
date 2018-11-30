from flask import Flask, render_template
import pymongo

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.citiesDB
breeze_info = db.breeze_info

@app.route('/')
def home():
    city_data = list(db.breeze_info.find())

    return render_template('index.html', city_data = city_data)

if __name__ == "__main__":
    app.run(debug=True)