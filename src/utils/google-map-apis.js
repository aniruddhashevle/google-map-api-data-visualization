import { API_KEY } from '../config/constants';

export function importRequiredScripts() {
    let cloudflareScript = document.createElement("script");
    cloudflareScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`);
    document.body.appendChild(cloudflareScript);
}

export function initMap(geoJSON) {
    // set up the map
    var map = new window.google.maps.Map(document.getElementById('map'), {
        center: new window.google.maps.LatLng(0, 0),
        zoom: 2
    });
    loadGeoJsonString(geoJSON, map);
}

function loadGeoJsonString(geoString, map) {
    map.data.addGeoJson(geoString);
    zoom(map);
}

/**
 * Update a map's viewport to fit each geometry in a dataset
* @param {google.maps.Map} map The map to adjust
  */
function zoom(map) {
    var bounds = new window.google.maps.LatLngBounds();
    map.data.forEach(function (feature) {
        processPoints(feature.getGeometry(), bounds.extend, bounds);
    });
    map.fitBounds(bounds);
}

/**
 * Process each point in a Geometry, regardless of how deep the points may lie.
* @param {google.maps.Data.Geometry} geometry The structure to process
* @param {function (google.maps.LatLng)} callback A function to call on each
  *     LatLng point encountered (e.g. Array.push)
* @param {Object} thisArg The value of 'this' as provided to 'callback' (e.g.
  *     myArray)
  */
function processPoints(geometry, callback, thisArg) {
    if (geometry instanceof window.google.maps.LatLng) {
        callback.call(thisArg, geometry);
    } else if (geometry instanceof window.google.maps.Data.Point) {
        callback.call(thisArg, geometry.get());
    } else {
        geometry.getArray().forEach(function (g) {
            processPoints(g, callback, thisArg);
        });
    }
}
