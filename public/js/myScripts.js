var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {
  'country': 'gr'
};
var countries = {
  'gr': {
    center: new google.maps.LatLng(37.063898, 25.4864014),
    zoom: 10
  }
};

function initialize(element) {
  var myOptions = {
    zoom: countries['gr'].zoom,
    center: countries['gr'].center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  };
  map = new google.maps.Map(element, myOptions);
  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
  autocomplete = new google.maps.places.Autocomplete(
  /** @type {HTMLInputElement} */
  (document.getElementById('autocomplete')), {
    types: ['(cities)'],
    componentRestrictions: countryRestrict
  });
  places = new google.maps.places.PlacesService(map);

  google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

  // Add a DOM event listener to react when the user selects a country.
  google.maps.event.addDomListener(document.getElementById('country'), 'change',
  setAutocompleteCountry);
}
var lat;
var long;
var lat2 = 37.063898;
var lon2 = 25.4864014;

var marker;
var myLatlng;

function onPlaceChanged() {

  var place = autocomplete.getPlace();
  if (place.geometry) {

    deleteOverlays();
    lat = JSON.stringify(place.geometry.location.k);
    long = JSON.stringify(place.geometry.location.B);
    if (calcCrow(lat, long, lat2, lon2) < 30) {
      myLatlng = new google.maps.LatLng(lat, long);
      map.panTo(place.geometry.location);
      marker = new google.maps.Marker({
        position: myLatlng,
        title: "Place"
      });
      markers.push(marker);
      map.setZoom(10);
      marker.setMap(map);
      search();
    }
    else {
      alert('mpa');
    }

  }
  else {
    document.getElementById('autocomplete').placeholder = 'Enter a city';
  }

}

function search() {
  var search = {
    bounds: map.getBounds()
  };
}

function setAutocompleteCountry() {
  var country = document.getElementById('country').value;

  autocomplete.setComponentRestrictions({
    'country': country
  });
  map.setCenter(countries[country].center);
  map.setZoom(countries[country].zoom);


}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
}

function deleteOverlays() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}
// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180;
}
