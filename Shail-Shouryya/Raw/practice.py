import pandas as pd
import pymongo
import pprint
import requests
API_KEY = "8aa79a20642b4c8fa81ba0ad9ba504db"

#city_df = pd.read_txt(worldcitiespop.txt)
city_df = pd.read_csv('500cities.csv', delimiter = ",")
city_df

#city_df.sort_values(by=["Population"], ascending = False)

# geolocator = Nominatim(user_agent="coordinateFinder")
# location = geolocator.geocode("San Francisco")
# location

# (location.latitude, location.longitude)

latitude = df[]

r = requests.get(f"https://api.breezometer.com/air-quality/v2/current-conditions?lat={latitude}&lon={longitude}&key={API_KEY}&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information")


#print(r.status_code)
#print(r.headers)
#pp = pprint.PrettyPrinter(indent=4)
#pp.pprint(r.content)

