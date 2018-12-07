
function makeMap(data) {
  // data.sort((d1, d2) => d1.aqi-d2.aqi);
  console.log(data);

  var buttonCities = data.sort((d1, d2) => d1.aqi-d2.aqi).slice(0,10);

  // Setting the dimensions for the SVG container
  // Create the tile layer that will be the background of our map
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: "pk.eyJ1IjoiYWtzY2hlbmtlciIsImEiOiJjam9qaW8wd3gwNWw2M2twYTkzb2l5NGhtIn0.RyQjIxRxHo6Jjc2X72-mPw"
  });
  var layers = {
    poor: new L.LayerGroup(),
    low: new L.LayerGroup(),
    moderate: new L.LayerGroup(),
    good: new L.LayerGroup(),
    excellent : new L.LayerGroup(),
    markerColor: new L.LayerGroup()
  };
  var map = L.map("map-id", {
    // center: [37.278518, -114.953091],
    center: [29.158628, -9.678791],
    zoom: 3,
    layers: [
      layers.poor,
      layers.low,
      layers.moderate,
      layers.good,
      layers.excellent,
      layers.markerColor
    ]
  });
  darkmap.addTo(map);

  var overlays = {
    "poor": layers.poor,
    "low": layers.low,
    "moderate": layers.moderate, 
    "good": layers.good,
    "excellent": layers.excellent 
  };
  L.control.layers(null, overlays).addTo(map);

  var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 20, 40, 60, 80],
            labels=[]
            
// loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML += 
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
};
legend.addTo(map);

function getColor(d) {
  return d > 0 & d < 20 ? 'red' :
    d > 20  & d < 40 ? 'orange' :
    d > 40 & d < 60 ? 'yellow' :
    d > 60 & d < 80  ? 'greenyellow' :
           'green';
  }

  var colors = {
    "excellent":"green",
    "good":"greenyellow",
    "moderate":"yellow",
    "low":"orange",
    "poor":"red"
  }
  for (var i = 0; i < data.length; i++) {

    var aqiCircle = data[i].aqi;
      // console.log(aqiCircle)

    var markerColor;

      if (aqiCircle <= 19) {
        markerColor = "poor";
      }
      
      else if (aqiCircle >= 20 && aqiCircle <= 39) {
        markerColor = "low";
      }
    
      else if (aqiCircle >= 40 && aqiCircle <= 59) {
        markerColor = "moderate";
      }
    
      else if (aqiCircle >= 60 && aqiCircle <= 79) {
        markerColor = "good";
      }
  
      else {
        markerColor = "excellent";
      }

      var format = d3.format(",")

      function markerSize(pop) {
        return pop / 30;
      }
      
      new L.circle([data[i].latitude, data[i].longitude], {
        // radius: 40-aqiCircle/3, 
        radius: markerSize(data[i].population), 
        color: 'grey',
        fillColor: colors[markerColor],
        // color: colorScale[aqiCircle_rounded],
        // fillColor:colorScale[aqiCircle_rounded], 
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
        clickable: true
      }).bindPopup(data[i].city + "<br> Air Ouality: " + data[i].aqi + "<br> Population: " + format(data[i].population)).addTo(layers[markerColor]);

  }

}

