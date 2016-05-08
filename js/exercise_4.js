// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
var mapId = 'gooberfer.02m2dhjn';

// And this is my access token, use yours.
var accessToken = 'pk.eyJ1IjoiZ29vYmVyZmVyIiwiYSI6ImNpbnh2b2xjYTE3cml1aWtqNXc4ZWNqaWwifQ.gTQAK9D4U0xa9I3Akp3Oew';

// Create the map object with your mapId and token,
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([39, -96], 4);

// Great, now we have a basic web map!
var dataFileToAdd = 'data/restaurants.geojson';

var featureLayer = L.mapbox.featureLayer()
    .loadURL(dataFileToAdd)
    .addTo(map);
    
    featureLayer.on('ready', function() {
  this.eachLayer(function(layer){
    layer.setIcon(L.mapbox.marker.icon({
      'marker-color': '#8834bb',
      'marker-size': 'large',
      'marker-symbol': 'restaurant'
    }))
  });
  map.fitBounds(featureLayer.getBounds());
});

//featureLayer.on('ready', function(){
//  this.eachLayer(function(layer){
//    layer.bindPopup('Welcome to ' + layer.feature.properties.name);
//  });
//});

var clickHandler = function(e){
  $('#info').empty();

  var feature = e.target.feature;

  $('#sidebar').fadeIn(400,function(){
    var info = '';

    info += '<div>'
    info += '<h2>' + feature.properties.name + '</h2>'
    if(feature.properties.phone) info +=   '<p>'  + feature.properties.cuisine + '</p>'
    if(feature.properties.phone) info +=   '<p>'  + feature.properties.phone + '</p>'
    if(feature.properties.phone) info +=   '<p>'  + feature.properties.website + '</p>'
    if(feature.properties.phone) info +=   '<p><a href="' + feature.properties.website + '">'  + feature.properties.website + '</a></p>'
    info += '</div>'

    $('#info').append(info);
  });
};

featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
    layer.on('click', clickHandler);
  });
});

map.on('click',function(e){
    $('#info').fadeOut(200);
    $('#info').empty();
});

var myLocation = L.mapbox.featureLayer().addTo(map);

map.on('locationfound', function(e) {

    myLocation.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

});
