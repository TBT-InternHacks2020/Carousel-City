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
        var rowCounter = 0;
        var rowLB = "";

        for (var i = 0; i < numBusinesses; i++) {
            database.ref(i).on("value", function (snapshot) {
                var snap = snapshot.val();
                rowLB += generateBusinessDiv(snap["Name"], snap["Address"], snap["Type"]);
                rowCounter++;

                if (rowCounter == 3) {
                    var divRow = document.createElement("div");
                    divRow.innerHTML = rowLB;
                    $("#container").append(divRow);
                    rowLB = "";
                    rowCounter = 0;
                }
            });
        }
    });
}

function generateBusinessDiv(name, address, type) {
    return `
    <div class="localBusinessDiv">
        <h3>${name}</h3>
        <span><em>${address}</em></span>
    </div>`
}

readData();