 // @TODO: Complete the following function that builds the metadata panel
 function buildMetadata(sample) {
   
     // Use `d3.json` to fetch the metadata for a sample
     d3.json(`/metadata/${sample}`).then((data) => {
      
      // Use d3 to select the panel with id of `#sample-metadata`
      let selectManipulatePanel = d3.select("#sample-metadata");
     
      // Use `.html("") to clear any existing metadata
      selectManipulatePanel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      selectManipulatePanel.append("h6").text(`${key}:${value}`);
  });
});
};


   // BONUS: Build the Gauge Chart
    // if(key === "WFREQ") {
    // //buildGauge(data.WFREQ);


function BuildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {
    console.log(data);

    let otu_ids = data.otu_ids;
    let otu_labels = data.otu_labels;
    let sample_values = data.sample_values;     
    
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    let pieChartData = [
      {
        values: data.sample_values.slice(0, 10),
        labels: data.otu_ids.slice(0, 10),
        hovertext: data.otu_labels.slice(0, 10),
        hoverinfo: "hovertext",
        colorscale: "Purple",
        type: "pie"
      }
    ];
    
    let pieChartLayout = {
      margin: { t: 0, l: 0 }
    };

    Plotly.plot("pie", pieChartData, pieChartLayout);


// @TODO: Build a Bubble Chart using the sample data
 // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each)

    let bubbleChartData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Greens",
        type: 'bubble'
        }
      }
    ];

    let bubbleChartLayout = {
      margin: { t: 0 },
      hovermode: "closests",
      xaxis: { title: "OTU ID"}
    };

    Plotly.plot("bubble", bubbleChartData, bubbleChartLayout);
});


function init() {
  // Grab a reference to the dropdown select element
  let dropdownSelect = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    BuildCharts(firstSample);
    BuildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  BuildCharts(newSample);
  BuildMetadata(newSample);
};

// Initialize the dashboard
init();

}
