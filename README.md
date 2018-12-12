# air-quality-proj2

## Analyzing air quality of 400 densely populated cities

### Project Motivation

With the recent wildfire in northern California that started in Camp Butte and proceeded to be the most destructive and deadly wildfire in California history - and which significantly affected air quality hundreds of miles away - air quality was on the forefront of our minds and we found it prudent to do analyses of the air quality of different cities around the world. We were interested in analyzing the air quality of different cities around the world to see how the air quality differed from place to place, and we wanted to use a database that would give us different parameters of measuring the air quality. After looking around, we found BreezoMeter to be a great resource for our project, as it provided an API for extracting air quality information based on the parameters we wanted. BreezoMeter also created a standardized air quality index, which according to its [FAQ](https://breezometer.com/faq/) page, is created by doing the following:
What does the air quality index (AQI) mean?
An air quality index (AQI) is a number used to communicate how polluted the air currently is or how polluted it is forecasted to become. Today, there is no standardized approach to providing air quality information globally, meaning AQIs are usually different from country to country. BreezoMeter has created a new uniform index: the BreezoMeter Air Quality Index (BAQI). The BAQI values range between 100 (Excellent air quality) and 0 (Poor air quality), and are determined based on concentrations of predefined air pollutants depending on local standards (read more). In addition to the BAQI, the Local AQI is always available as well.

### Challenges
Challenges we faced included: 
1) Limited capabilty with the trial API:
  - Query limited to ###number of cities.
  - 14 day free-trial placed a limit on our ability to collect the most up to date data. 
2) Ensuring all group members stored the same data within their local MongoDB server since each API call would return updated data.  
3) Deploying the Flask app to Heroku to run without having to run on local server everytime.

### Tools used for ETL, analysis, and visualizing

We used a wide range of tools with differing use cases to complete this project.

* [BreezoMeter API](https://docs.breezometer.com/api-documentation/air-quality-api/v2/)
* [Mapbox](https://www.mapbox.com/)
* [Jupyter Notebook](http://jupyter.org/)
* Python ([Pandas](https://pandas.pydata.org/pandas-docs/stable/), [Flask](https://flask-pymongo.readthedocs.io/en/latest/))
* (MongoDB)[https://www.mongodb.com/]
* [HTML](https://www.w3schools.com/html/)/CSS
* JavaScript libraries:
  * [D3 (Data Driven Documents)](https://d3js.org/)
  * [Chart.js](https://www.chartjs.org/)
  * [Bootstrap] (https://getbootstrap.com/)
  * [Leaflet] (https://leafletjs.com/)

### Brief overview of tool usage
 1. We used Jupyter Notebook to insert the city latitude and longitude parameters from the CSV and feed it into the URL template provided by BreezoMeter. 
 2. After ensuring we could iterate through the rows in our CSV and we could successfully enter the coordinates contained in the CSV and the parameters we were interested in looking at into the BreezoMeter URL template, we wrote a Python script that would allow us to create a connection to our local MongoDB server on our machine. 
 3. We stored the features we requested for every city in our CSV file (given BreezoMeter had data for that city) from the BreezoMeter API in our MongoDB server.
 4. Map Visualization: Using the Leaflet JavaScript Library and Mapbox tilesets, we created a map based on the BreezoMeter AQI score along with the population parameter to see if there was a correlation between the population of a city and the BreezoMeter AQI score. 
 5. Graph Visualization: We visualized the date from the 10 cities with the best rated AQIs, the 10 cities with the lowest rated AQIs, and the 10 most populous cities in  bar chart form to allow us to compare how the different air quality parameters compared across the 10 best/worst/most populated cities.
 6. City Dashboard Visualization: We created a dashboard to access data from any particular city the user selected within a drop-down menu that allowed the user to see the AQI score, pollutant levels, and general recommendation on what to do based on the air quality.
 
### Conclusion

Our findings indicate that the air quality in densely populated cities tend to be worse on the Indian sub-continent and along east-Asia, and slightly better in the Western Hemisphere. However, this data is not necessarily reflective of the air quality of large regions of land since the data we analyzed only consisted of cities with populations of more than half a million people.

We noticed air quality and the city population did not correlate, as Tokyo, the most populous city in our database, had "good" air quality.