d3.json('/data').then(function(data) {
    var geoJSON = [];
    data.forEach(function(air){
        var object = {};
        object.aqi = air.aqi;
        object.city = air.city;
        object.general_rec = air.general_rec;
        object.location = [air.latitude, air.longitude];



        geoJSON.push(object);
    });
    console.log(geoJSON);

// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize(aqi) {
    return aqi * 1000;
  }
  
  // Each city object contains the city's name, location and population
  
  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < geoJSON.length; i++) {
    L.circle(geoJSON[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: markerSize(geoJSON[i].aqi)
    }).bindPopup("<h1>" + geoJSON[i].city +  "</h1><hr><h3>Recs: " + geoJSON[i].general_rec + "</h3>" + " <hr> <h3>AQI: " + geoJSON[i].aqi + "</h3>").addTo(myMap);
  }
  
});



