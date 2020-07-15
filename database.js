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
                if (i == 0) genereateBusinessStorefront(i, snap["Name"], "active");
                else genereateBusinessStorefront(i, snap["Name"], "");

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

function genereateBusinessStorefront(id, name, isActive) {
    var titleClass = "titleFont";
    if (name.length > 25) {
        titleClass = "smallTitleFont";
    }

    $("#insertStores").append(`<div class="carousel-item ${isActive}">
    <img src="../images/Storefront.png" class="storefront">
	<svg viewBox="0 0 1000 500" preserveAspectRatio="xMinYMin meet" class="svg-content">
    <text x="50%" y="32%" dominant-baseline="middle" text-anchor="middle" class="${titleClass}"">${name}</text>
    <rect width="522" height="276" x="242" y="168" style="fill:rgb(0,0,255);"/>
    <rect width="378" height="110" rx="60" ry="68" x="314" y="82" style="fill:rgb(44, 52, 153);" /> 
    <rect onclick='enterStore(${id})' width="174" height="200" x="416" y="242" style="fill:rgb(0, 52, 153);" /> 
    </svg>
  </div>`);
}

function generateBusinessDiv(name, address, type) {
    return `
    <div class="localBusinessDiv">
        <h3>${name}</h3>
        <span><em>${address}</em></span>
    </div>`
}

function enterStore(storeName) {
    window.location.replace("../public/innerStore.html");
}

function generateInnerStore() {
    document.getElementById("innerStore").innerHTML ='<img src="../images/Inside of Store.png"></img>';
}

readData();