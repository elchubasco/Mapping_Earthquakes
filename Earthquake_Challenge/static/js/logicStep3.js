// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level. (simpler method)
// let map = L.map('mapid').setView([36.1733, -120.1794], 7);


// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup();
//   }
// }).addTo(map);

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.city + "</h2>")
//   }
// }).addTo(map);


// Coordinates for each point to be used in the line.
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790],
//   [40.7899, -111.9791],
//   [47.4502, -122.3088]
// ];

// An array containing each city's location, state, and population.
// let cities = [{
//   location: [40.7128, -74.0059],
//   city: "New York City",
//   state: "NY",
//   population: 8398748
// },
// {
//   location: [41.8781, -87.6298],
//   city: "Chicago",
//   state: "IL",
//   population: 2705994
// },
// {
//   location: [29.7604, -95.3698],
//   city: "Houston",
//   state: "TX",
//   population: 2325502
// },
// {
//   location: [34.0522, -118.2437],
//   city: "Los Angeles",
//   state: "CA",
//   population: 3990456
// },
// {
//   location: [33.4484, -112.0740],
//   city: "Phoenix",
//   state: "AZ",
//   population: 1660272
// }
// ];

// Get data from cities.js
// let cityData = cities;

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//   console.log(city)
//   L.marker(city.location).addTo(map);
// });

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//   console.log(city)
//   L.circleMarker(city.location, {
//     radius: city.population/100000,
//     color: 'orange', 
//   })
//   .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// .addTo(map);
// });

// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//   center: [40.7, -94.5],
//   zoom: 4
// });



// // Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data, {
//   // We turn each feature into a circleMarker on the map.
//   pointToLayer: function(feature, latlng) {
//               console.log(data);
//               return L.circleMarker(latlng);
//           },
//           // We set the style for each circleMarker using our styleInfo function.
//       style: styleInfo
//       }).addTo(map);
//   });

// // This function returns the style data for each of the earthquakes we plot on
// // the map. We pass the magnitude of the earthquake into a function
// // to calculate the radius.
// function styleInfo(feature) {
//   return {
//     opacity: 1,
//     fillOpacity: 1,
//     fillColor: "#ffae42",
//     color: "#000000",
//     radius: getRadius(),
//     stroke: true,
//     weight: 0.5
//   };
// }


// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//   center: [40.7, -94.5],
//   zoom: 4
// });



// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// We create the tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	"Streets": streets,
	"Satellite": satelliteStreets
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
zoom: 3,
	layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into two separate functions
// to calculate the color and radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// Retrieve the earthquake GeoJSON data.
d3.json(
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
).then(function (data) {
  console.log(data);
  // Create a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        'Magnitude: ' +
          feature.properties.mag +
          '<br> Location: ' +
          feature.properties.place
      );
    },
  }).addTo(map);
});


// // Retrieve the earthquake GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data).addTo(map);
// });


// // Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data, {
//   // We turn each feature into a circleMarker on the map.
//   pointToLayer: function(feature, latlng) {
//       console.log(data);
//       return L.circleMarker(latlng);
//     },
//   // We set the style for each circleMarker using our styleInfo function.
// style: styleInfo,
//   // We create a popup for each circleMarker to display the magnitude and
//   //  location of the earthquake after the marker has been created and styled.
//   onEachFeature: function(feature, layer) {
//   layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
// }
// }).addTo(map);




// // Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data, {

//   // We turn each feature into a circleMarker on the map.
  
//   pointToLayer: function(feature, latlng) {
//               console.log(data);
//               return L.circleMarker(latlng);
//           },
//         // We set the style for each circleMarker using our styleInfo function.
//       style: styleInfo
//       }).addTo(map);
//   // });

// // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data, {

// // We turn each feature into a circleMarker on the map.

// pointToLayer: function(feature, latlng) {
//             console.log(data);
//             return L.circleMarker(latlng);
//         },
//       // We set the style for each circleMarker using our styleInfo function.
//     style: styleInfo
//     }).addTo(map);
// });

// // Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data, {
//   // We turn each feature into a circleMarker on the map.
//   pointToLayer: function(feature, latlng) {
//               console.log(data);
//               return L.circleMarker(latlng);
//           },
//         // We set the style for each circleMarker using our styleInfo function.
//       style: styleInfo
//       }).addTo(map);
//       });

// // We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// // We create the dark view tile layer that will be an option for our map.
// let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// // Create a base layer that holds both maps.
// let baseMaps = {
//   Streets: streets,
//   SatelliteStreets: satelliteStreets
// };

// // Create the map object with center, zoom level and default layer.
// let map = L.map('mapid', {
//   center: [39.5, -98.5],
//   zoom: 3,
//   layers: [streets]
// })

// // Pass our map layers into our layers control and add the layers control to the map.
// L.control.layers(baseMaps).addTo(map);




// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.city + "</h2>")
//   }
// }).addTo(map);



// Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/elchubasco/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data).addTo(map);
// });

// Create a style for the lines.
// let myStyle = {
//   color: "#ffffa1",
//   weight: 2
// }

// Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data, {
//   style: myStyle,
//   onEachFeature: function(feature, layer) {
//     layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " 
//     + feature.properties.dst + "</h3>");
//   }
// })
// .addTo(map);
// });

// // Grabbing our GeoJSON data.
// d3.json(airportData).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
// L.geoJSON(data).addTo(map);
// });


// Then we add our 'streets' tile layer to the map.
// streets.addTo(map);
