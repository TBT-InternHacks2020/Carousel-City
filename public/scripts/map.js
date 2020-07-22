mapboxgl.accessToken = 'pk.eyJ1IjoibWQyMDAyIiwiYSI6ImNrYnhvZTExcTBjb2gyd3BrdzZ6YWo5ZXAifQ.a2UZ_0adGG7ca9FO7U8sEw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 13,
    center: [-79.9311, 32.7765]
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

var size = 300;

// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // get rendering context for the map canvas when layer is added to the map
    onAdd: function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // called once before every frame where the icon will be used
    render: function () {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 2)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
    }
};

map.on('load', function () {
    // map.addImage('pulsing-dot', pulsingDot, {
    //     pixelRatio: 2
    // });

    // map.addSource('points', {
    //     'type': 'geojson',
    //     'data': {
    //         'type': 'FeatureCollection',
    //         'features': [{
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': 'Coordinates'
    //             }
    //         }]
    //     }
    // });
    // map.addLayer({
    //     'id': 'points',
    //     'type': 'symbol',
    //     'source': 'points',
    //     'layout': {
    //         'icon-image': 'pulsing-dot'
    //     }
    // });

    initMap();
});

function initMap() {
    // var firebaseConfig = {
    //     apiKey: "AIzaSyDjZmqB8ulR43ZUCMOTuXW2nbUJoD1PJtk",
    //     authDomain: "carousel-city.firebaseapp.com",
    //     databaseURL: "https://carousel-city.firebaseio.com",
    //     projectId: "carousel-city",
    //     storageBucket: "carousel-city.appspot.com",
    // };
    // firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    function readData() {
        database.ref().on("value", function (snapshot) {
            var numBusinesses = snapshot.numChildren();
            snapshot.forEach((childSnapshot) => {
                var snap = childSnapshot.val();

                if (snap && snap["Coordinates"]) {
                    var latb = snap["Coordinates"][0];
                    var lngb = snap["Coordinates"][1];
                    var marker = new mapboxgl.Marker()
                        .setLngLat([lngb, latb])
                        .addTo(map);
                    // callmap();
                } else {
                    console.log('snap:', snap);
                }
            });
        });
    }

    readData();
}

// map.on("load", function () {
//             map.loadImage(
//                 "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",

//                 function (error, image) {
//                     if (error) throw error;
//                     map.addImage("custom-marker", image);

//                     var Address = snap["Address"];
//                     var Rating = snap["Rating"];
//                     var Name = snap["Name"];
//                     var bType = snap["Type"];
//                     var Website = snap["Website"];

//                     map.addSource("places", {
//                         type: "geojson",
//                         data: {
//                             type: "FeatureCollection",
//                             features: [{
//                                 type: "Feature",
//                                 properties: {
//                                     description: Address + Rating + Website + Name + bType
//                                 },
//                                 geometry: {
//                                     type: "Point",
//                                     coordinates: [lngb, latb]
//                                 }
//                             }]
//                         }
//                     });

//                     // Add a layer showing the places.
//                     map.addLayer({
//                         id: "places",
//                         type: "symbol",
//                         source: "places",
//                         layout: {
//                             "icon-image": "custom-marker",
//                             "icon-allow-overlap": true
//                         }
//                     });
//                 }
//             );
            

//             // function callmap() {
//                 // Create a popup, but don't add it to the map yet.
//                 var popup = new mapboxgl.Popup({
//                     closeButton: false,
//                     closeOnClick: false
//                 });

//                 map.on("mouseenter", "places", function (e) {
//                     // Change the cursor style as a UI indicator.
//                     map.getCanvas().style.cursor = "pointer";

//                     var coordinates = e.features[0].geometry.coordinates.slice();
//                     var description = e.features[0].properties.description;

//                     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//                         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//                     }

//                     // Populate the popup and set its coordinates
//                     // based on the feature found.
//                     popup
//                         .setLngLat(coordinates)
//                         .setHTML(description)
//                         .addTo(map);
//                 });

//                 map.on("mouseleave", "places", function () {
//                     map.getCanvas().style.cursor = "";
//                     popup.remove();
//                 });
//             // };
//         })