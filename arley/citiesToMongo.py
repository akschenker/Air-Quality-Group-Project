import pandas as pd
from config import api_key
import pymongo
import requests

cities = pd.read_csv('500cities.csv')

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.citiesDB
db.breeze_info.drop()
breeze_info = db.breeze_info

for index, row in cities.iterrows():
    lat = row["Latitude"]
    lon = row["Longitude"]
    url = f"https://api.breezometer.com/air-quality/v2/current-conditions?lat={lat}&lon={lon}&key={api_key}"
    features = "&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information"
    response = requests.get(url + features).json()
    
    try:
        poll_obj = {}
        for pollutant, poll_info in response["data"]["pollutants"].items():
            poll_obj[pollutant] = [poll_info["display_name"],
                                   poll_info["full_name"],
                                   poll_info["concentration"]["value"],
                                   poll_info["concentration"]["units"]]

        info = {
            'city':row["City"],
            'latitude':lat,
            'longitude':lon,
            'population':row["Population"],
            'aqi':response["data"]["indexes"]["baqi"]["aqi"],
            'color':response["data"]["indexes"]["baqi"]["color"],
            'category':response["data"]["indexes"]["baqi"]["category"],
            'pollutants':poll_obj,
            'general_rec':response["data"]["health_recommendations"]["general_population"]

        }
        breeze_info.insert_one(info)
    except:
        print(row["City"])