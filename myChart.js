var currentChart;

document.getElementById("renderBtn").addEventListener("click", fetchData);

async function fetchData() {
  var countryCode = document.getElementById("country").value;
  const indicatorCode = "SP.POP.TOTL";
  const baseUrl = "https://api.worldbank.org/v2/country/";
  const perpage = "?per_page=70";
  const url =
    baseUrl +
    countryCode +
    "/indicator/" +
    indicatorCode +
    perpage +
    "&format=json";
  console.log("Fetching data from URL: " + url);

  var response = await fetch(url);

  if (response.status == 200) {
    var fetchedData = await response.json();
    console.log(fetchedData);

    var data = getValues(fetchedData);
    var labels = getLabels(fetchedData);
    var countryName = getCountryName(fetchedData);
    renderChart(data, labels, countryName);
  }
}

function getValues(data) {
  var vals = data[1].sort((a, b) => a.date - b.date).map((item) => item.value);
  return vals;
}

function getLabels(data) {
  var labels = data[1].sort((a, b) => a.date - b.date).map((item) => item.date);
  return labels;
}

function getCountryName(data) {
  var countryName = data[1][0].country.value;
  return countryName;
}

function renderChart(data, labels, countryName) {
  //document.getElementById("countrycode").innerHTML = getCountryName;

  var ctx = document.getElementById("myChart").getContext("2d");
  var gradientStroke = ctx.createLinearGradient(0, 20, 00, 700);

  gradientStroke.addColorStop(0, "#2b55bd");
  gradientStroke.addColorStop(0.2, "#4895d4");
  gradientStroke.addColorStop(0.5, "#48cfd4");
  gradientStroke.addColorStop(1, "#52e3d2");

  if (currentChart) {
    currentChart.destroy();
  }

  currentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Population, " + countryName,
          data: data,
          borderColor: gradientStroke,
          backgroundColor: gradientStroke,

          fill: false,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      animation: {
        duration: 2000,
        easing: "easeInOutBack",
      },
    },
  });
  tulosta();
}
function tulosta() {
  kappale = document.createElement("p");
  kappale.textContent = "Maakoodi";
  document.body.append(kappale);
}
