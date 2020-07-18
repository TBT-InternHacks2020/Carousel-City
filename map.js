var styleSheet = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }]
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }]
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }]
    }
  ];
  
  function initMap() {
    // Styles a map in night mode.
    var Charleston = { lat: 32.7765, lng: -79.9311 };

    var map = new google.maps.Map(document.getElementById("map"), {
      center: Charleston,
      styles: styleSheet,
      zoom: 8
    });
    var marker = new google.maps.Marker({ position: Charleston, map: map });
    

    //new google.maps.Marker({ position: {lat: 32.7426751, lng: -79.9396906}, map: map });
  

    var firebaseConfig = {
      apiKey: "AIzaSyDjZmqB8ulR43ZUCMOTuXW2nbUJoD1PJtk",
      authDomain: "carousel-city.firebaseapp.com",
      databaseURL: "https://carousel-city.firebaseio.com",
      projectId: "carousel-city",
      storageBucket: "carousel-city.appspot.com",
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  function readData() {
      database.ref().on("value", function (snapshot) {
          var numBusinesses = snapshot.numChildren();
          for (var i = 0; i < numBusinesses; i++) {
              database.ref(i).on("value", function (snapshot) {
                  var snap = snapshot.val();

                  var latb = snap["Coordinates"][i][2][0];
                  var lngb = snap["Coordinates"][i][2][1];
                  var business = {lat: latb, lng: lngb};
                  new google.maps.Marker({ position: business, map: map });
  
              });
          }
      });
  }
    
  }
  
  