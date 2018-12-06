// process the data, then call a function on it in a different file

function getData(dataFn) {
    d3.json('/data').then(function(data) {
        dataFn(data);
    });
}