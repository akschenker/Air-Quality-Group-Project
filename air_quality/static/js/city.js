function cityDash(data) {
    var selector = d3.select("select");
    var aqiTitle = d3.select("#aqi-card").select(".card-title");
    var recText = d3.select("#rec-card").select(".card-text");

    // sort cities
    function sortStrings(a, b) {
        if (a.city.toUpperCase() < b.city.toUpperCase()) {
            return -1;
        }
        if (a.city.toUpperCase() > b.city.toUpperCase()) {
            return 1;
        }
        return 0;
    }

    data.sort(sortStrings);

    // Use the list of city names to populate the select options
    var allCities = [];
    data.forEach(d => {
        allCities.push(d.city);
    })
    
    allCities.forEach(city => {
        selector.append("option")
                .text(city)
                .property("value", city);
    });

    function updateDash(city) {
        var cityData = data.filter(d => d.city === city)[0];
        var aqi = cityData.aqi;
        var pollutants = cityData.pollutants;
        var pollutantNames = [];
        var pollutantQuantities = [];
        Object.entries(pollutants).forEach(([key, value]) => {
            pollutantNames.push(value[1]);
            pollutantQuantities.push(value[2]);
        })
        var rec = cityData.general_rec;

        aqiTitle.text(aqi)
                .style('text-align', 'center'); 
                
        updateChart(barChart, pollutantNames, pollutantQuantities);

        recText.text(rec);
    };

    var bar = document.getElementById("top-barChart");
    var barChart = new Chart(bar, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Contaminant Amount',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(153, 102, 255, 0.5)',
                hoverBorderColor: 'rgba(153, 102, 255, 1)',
            }]
        },
        options: {
            title: {
                text: "Pollutants",
                display: true,
                fontSize: 18
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    });

    function updateChart(chart, names, quantities) {
        chart.data.labels = names;
        chart.data.datasets.forEach(dataset => {
            dataset.data = quantities;
        });
        chart.update();
    }

    var initialCity = selector.node().value;
    updateDash(initialCity);

    // Grab selected city and populate data
    selector.on("change", function() {
        var city = selector.node().value;
        updateDash(city);
    })
}