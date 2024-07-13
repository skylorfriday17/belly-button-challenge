// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let info = metadata.filter(object => object.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    panel.html('');

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    info.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        panel.append('p').text(`${key}: ${value}`);
      });
    });
  }
)};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples

    // Filter the samples for the object with the desired sample number
    let info = samples.filter(object => object.id === sample)[0]

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = info.otu_ids
    let otu_labels = info.otu_labels
    let sample_values = info.sample_values

    // Build a Bubble Chart
    let trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      }
    };

    // Create layout for bubble chart.
    bubble_layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Number of Bacteria'
      }
    };

    // Place the trace data in an array to use when initializing the plot.
    let bubble_data = [trace2]

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubble_data, bubble_layout)

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let ids = otu_ids.map(entry => 'OTU' + String(entry))

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let sorted_ids = sample_values.sort((a,b) => b.sample_values - a.sample_values);
    let sliced_ids = sorted_ids.slice(0,10);
    sliced_ids.reverse()

    let trace1 = {
      type: 'bar',
      x: sliced_ids,
      y: ids,
      text: otu_labels,
      orientation: 'h'
    };

    // Create Bar Graph layout.
    let bar_layout = {
      title:'Top 10 Bacteria Cultures Found',
      xaxis: {
        title: 'Number of Bacteria'
      }
    };

    // Put the trace data for the bar chart into in array to use in the initialization of the plot.
    let bar_data = [trace1]

    // Render the Bar Chart
    Plotly.newPlot('bar', bar_data, bar_layout)
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (i = 0; i < names.length; i++) {
      dropdown.append('option').text(names[i]).property('value'), names[i];
    }

    // Get the first sample from the list
    let first_sample = names[0]

    // Build charts and metadata panel with the first sample
    buildCharts(first_sample);
    buildMetadata(first_sample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


// Below is the code I used to troubleshoot and observe the data which I commented out as it is not useful for the end product.

// d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
//   console.log(data);
//   let metadata = data.metadata;
//   // let info = metadata.filter(metadata.id);
//   for (let i = 0; i < metadata.length; i++) {
//     let object = metadata[i];
//     console.log(object.id);
//   };
// });
