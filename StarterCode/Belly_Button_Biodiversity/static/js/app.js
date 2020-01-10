 // @TODO: Complete the following function that builds the metadata panel
 function buildMetadata(sample) {
  var Metadatasample = d3.select("#sample-metadata");
  // Use d3 to select the panel with id of `#sample-metadata`
  // Use `.html("") to clear any existing metadata
    d3.json(`/metadata/${sample}`).then(function (data) {
      Metadatasample.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      var li = Metadatasample.append("li").text(`${key}:${value}`);
    });
  });


    // BONUS: Build the Gauge Chart
    // if(key === "WFREQ") {
    // //buildGauge(data.WFREQ);
}


  // @TODO: Use `d3.json` to fetch the sample data for the plots

  // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function buildCharts(sample) {
  function pieChart(data) {
    console.log(data);
    let labels = data.otu_ids.slice(0,10);
    let values = data.sample_values.slice(0,10);
    let hovertext = data.otu_labels.slice(0,10);

    let trace = [{
      values : values,
      labels : labels,
      type : "pie",
      textposition: "inside",
      hovertext : hovertext
    }];

    let layout = {
        title: '<b> Belly Button Pie Chart </b>',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
    };

    Plotly.newPlot('pie', trace , layout, {responsive: true});
}

// @TODO: Build a Bubble Chart using the sample data
 // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each)

function bubbleChart(data) {
  let x = data.otu_ids;
  let y = data.sample_values;
  let markersize = data.sample_values;
  let markercolors = data.otu_ids;
  let textvalues = data.otu_labels;

  let trace =[{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: markersize,
      color: markercolors,
    },
    text: textvalues
  }];

  let layout ={
    title:"<b> Belly Button Bubble Chart </b>",
    xaxis: {
      title: 'OTU ID',
    },
    yaxis: {
      title: 'Sample Value'
    },
    width:1100,
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
  };

  Plotly.newPlot('bubble', trace, layout, {responsive: true});
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

}