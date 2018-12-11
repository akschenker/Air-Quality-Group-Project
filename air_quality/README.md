# air-quality-proj2

## Analyzing air quality of 400 densely populated cities

### Project Motivation

With the recent wildfire in northern California that started in Camp Butte and proceeded to be the most destructive and deadly wildfire in California history - and which significantly affected air quality hundreds of miles away - air quality was on the forefront of our minds and we found it prudent to do analyses of the air quality of differnt cities around the world.

### Tools used for ETL, analysis, and visualizing

We used a wide range of tools with differing use cases to complete this project.

* [Breezometer API](https://docs.breezometer.com/api-documentation/air-quality-api/v2/)
* Jupyter Notebook
* Python (pandas, Flask)
* MongoDB
* HTML/CSS, Bootstrap
* JavaScript libraries:
  * [D3 (Data Driven Documents)](https://d3js.org/)
  * [Chart.js](https://www.chartjs.org/)
  * [Bootstrap] (https://getbootstrap.com/)
  * [Leaflet] (https://leafletjs.com/)

### Brief overview of tool usage
 Step 1: We used Jupyter Notebook to insert the city latitude and longitude from the CSV and feed it into the url template provided by BreezoMeter. 
 Step 2: After ensuring we could iterate through the rows in our CSV and we could successfully enter the coordinates contained in the CSV and parameters into the BreezoMeter URL template, we wrote a Python script that would allow us to create a connection to our local MongoDB server on our machine. 
 Step 3: With this MongoDB server, we stored the data we extracted from the BreezoMeter API using the features we requested for every city in our CSV file (given BreezoMeter had data for that city).
 Step 4: Map Visual; Using the leaflet JavaScript Library, we created a map based on the breezo-meter AQI score along with the population parameter to see if there is a correlation between the population of a city vs. the breezometer AQI score. 
 Step 5: Graph Visuals; We wanted to represent the 10 highest rated cities, the 10 lowest rated cities, and the 10 most populated cities according to AQI in a bar chart form, to help our followers to researchers to see if this is condensed to one particular area, spread out, and try to find a correlation between this information.
 Step 6: City Dashboard Visual: Lastly, we wanted to create a user-friendly dashboard for our users to be able to access any cities data they wanted to see individually by a drop-down menu, and within this they would be able to see the AQI score, the particular polutant amounts, as well as a general recommendation on what one should do during the current quality of air.  


### Approaches and challenges
A couple of challenges we faced were: 
1) Limited capabilities with a trial API:
  - Only able to query a certain amount of cities
  - 14 day free-trial limited us to when we were able to run live data vs. old data. 
2) Making sure all group members were able to store the same data format within their local MongoDB server. 
3) Making sure there were no merge conflicts on GitHub. 
4) Deploying the Flask app to Heroku to run without having to run on local server everytime.

### Conclusion

Our findings indicate that the air quality in densely populated cities tend to be worse on the Indian sub-continent and along east-Asia, and slightly better in the Western Hemisphere. However, this data is not necessarily reflective of the air quality of large regions of land since the data we analyzed only consisted of cities with populations of more than half a million people.

We noticed air quality and the city population did not correlate, as Tokyo, the most populous city in our database, had "good" air quality