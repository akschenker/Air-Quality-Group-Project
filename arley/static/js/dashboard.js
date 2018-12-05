function makeDashboard(data) {
    data.forEach(d => {
        if (d.aqi === 0) {
            d.aqi = 0.2;
        }
    });

    // sort descending for top 10, then slice
    data.sort((d1, d2) => d2.aqi - d1.aqi);
    var top10 = data.slice(0, 10);

    // isolate aspects of top 10 cities
    var top10cities = top10.map(d => d.city);
    var top10aqis = top10.map(d => d.aqi);
    var top10pollutants = top10.map(d => d.pollutants);

    // sort ascending for bottom 10, then slice
    data.sort((d1, d2) => d1.aqi - d2.aqi);
    var bottom10 = data.slice(0, 10);

    // isolate aspects of bottom 10 cities
    var bottom10cities = bottom10.map(d => d.city);
    var bottom10aqis = bottom10.map(d => d.aqi);
    console.log(bottom10aqis);
    var bottom10pollutants = bottom10.map(d => d.pollutants);

    // sort descending for most populated, then slice
    data.sort((d1, d2) => d2.population - d1.population);
    var populous = data.slice(0, 10);

    // isolate aspects of populous cities
    var populousCities = populous.map(d => d.city);
    var populousaqis = populous.map(d => d.aqi);
    var populouspollutants = populous.map(d => d.pollutants);

    // initialize chart values
    var pieData = [];
    var pieLabels = [];
    var city = "";

    // define top bar chart
    var tBar = document.getElementById("top-barChart");
    var topBarChart = new Chart(tBar, {
        type: 'bar',
        data: {
            labels: top10cities,
            datasets: [{
                label: 'Breezometer AQI',
                data: top10aqis,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(153, 102, 255, 0.5)',
                hoverBorderColor: 'rgba(153, 102, 255, 1)',
            }]
        },
        options: {
            hover: {
                onHover: function(event) {
                    pieLabels = [];
                    pieData = []
                    var item = topBarChart.getElementAtEvent(event)[0];
                    var pollutants = top10pollutants[item._index];
                    Object.entries(pollutants).forEach(([key, value]) => {
                        pieLabels.push(value[1]);
                        pieData.push(value[2]);
                    })
                    city = item._model.label;
                    addHoverData(myPieChart, pieLabels, pieData, city);
                }
            },
            title: {
                text: "Top 10 Cities for Air Quality",
                display: true,
                fontSize: 18
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    // define bottom barChart
    var bBar = document.getElementById("bottom-barChart");
    var bottomBarChart = new Chart(bBar, {
        type: 'bar',
        data: {
            labels: bottom10cities,
            datasets: [{
                label: 'Breezometer AQI',
                data: bottom10aqis,
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)',
                hoverBorderColor: 'rgba(255, 159, 64, 1)',
            }]
        },
        options: {
            hover: {
                onHover: function(event) {
                    pieLabels = [];
                    pieData = []
                    var item = bottomBarChart.getElementAtEvent(event)[0];
                    var pollutants = bottom10pollutants[item._index];
                    Object.entries(pollutants).forEach(([key, value]) => {
                        pieLabels.push(value[1]);
                        pieData.push(value[2]);
                    })
                    city = item._model.label;
                    addHoverData(myPieChart, pieLabels, pieData, city);
                }
            },
            title: {
                text: "Bottom 10 Cities for Air Quality",
                display: true,
                fontSize: 18
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        max: 100
                    }
                }]
            }
        }
    });

    // define populous barChart
    var popBar = document.getElementById("pop-barChart");
    var popBarChart = new Chart(popBar, {
        type: 'bar',
        data: {
            labels: populousCities,
            datasets: [{
                label: 'Breezometer AQI',
                data: populousaqis,
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 206, 86, 0.4)',
                hoverBorderColor: 'rgba(255, 206, 86, 1)',
            }]
        },
        options: {
            hover: {
                onHover: function(event) {
                    pieLabels = [];
                    pieData = []
                    var item = popBarChart.getElementAtEvent(event)[0];
                    var pollutants = populouspollutants[item._index];
                    Object.entries(pollutants).forEach(([key, value]) => {
                        pieLabels.push(value[1]);
                        pieData.push(value[2]);
                    })
                    city = item._model.label;
                    addHoverData(myPieChart, pieLabels, pieData, city);
                }
            },
            title: {
                text: "Air Quality for 10 Most Populous Cities",
                display: true,
                fontSize: 18
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        max: 100
                    }
                }]
            }
        }
    });

    // function for updating pie chart
    function addHoverData(chart, labels, data, city) {
        chart.data.labels = labels;
        chart.data.datasets.forEach(dataset => {
            dataset.data = data;
        });
        chart.options.title.text = `Pollutants in ${city}`;
        chart.update();
    };

    // chart values upon page load
    Object.entries(top10pollutants[0]).forEach(([key, value]) => {
        pieLabels.push(value[1]);
        pieData.push(value[2]);
    });

    // define pie chart
    var pie = document.getElementById("pieChart");
    var myPieChart = new Chart(pie, {
        type: 'pie',
        data: {
            labels: pieLabels,
            datasets: [{
                data: pieData,
                backgroundColor: [
                'rgba(255, 99, 132, 0.4)', 'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)', 'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)', 'rgba(255, 159, 64, 0.4)',
                'rgba(255, 255, 255, 0.4)', 'rgba(165, 42, 42, 0.4)']
            }]
        },
        options: {
            responsive: false,
            title: {
                text: `Pollutants in Chelyabinsk`,
                display: true,
                fontSize: 18
            }
        }
    });
};