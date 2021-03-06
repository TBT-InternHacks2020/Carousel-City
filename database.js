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
                if (0 <= i && i <= 5) rowLB += genereateBusinessStorefront(i, snap["Name"], snap["Colors"][0], snap["Colors"][1]);

                rowCounter++;

                if (rowCounter == 3 && (i == 2 || i == 5)) {
                    var divRow = document.createElement("div");
                    divRow.innerHTML = rowLB;
                    if(i == 2) {
                        appendToCarousel(rowLB, "active");
                    } else if (i == 5){
                        appendToCarousel(rowLB, "");
                    }
                    rowLB = "";
                    rowCounter = 0;
                }
            });
        }
    });
}

function adjust(color, amount) { // thnx SO
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function appendToCarousel(lbToAdd, isActive) {
    $("#insertStores").append(`<div class="carousel-item ${isActive}">${lbToAdd}</div>`);
}

function genereateBusinessStorefront(id, name, primaryColor, secondaryColor) {
    var titleClass = "titleFont";
    if (name.length > 25) {
        titleClass = "smallTitleFont";
    }

    return `
    <div class="overallOutStore">
    <div class="storefront">
    <!--Wall-->
    <svg viewBox="0 0 2304.000000 1902.000000">
        <g transform="translate(0.000000,1902.000000) scale(0.100000,-0.100000)"
        fill="${primaryColor}" stroke="none">   <!--Change color here!-->
            <path d="M4730 13156 c-3 -2 -506 -6 -1117 -7 l-1113 -4 0 -4752 0 -4753 2998
            0 2999 0 6 698 c4 383 7 1958 7 3500 l0 2802 2993 -2 2992 -3 6 -3415 c3
            -1878 7 -3452 8 -3497 l1 -83 3000 0 3000 0 0 4753 0 4752 -152 0 c-84 0 -591
            2 -1127 3 l-974 2 -51 -57 c-28 -31 -89 -89 -137 -128 -596 -496 -1770 -792
            -3569 -900 -634 -37 -825 -40 -3000 -40 -2175 0 -2366 3 -3000 40 -784 47
            -1496 136 -2030 255 -795 176 -1389 451 -1681 779 -30 34 -57 60 -59 57z
            m2768 -3763 l2 -1743 -1995 0 -1995 0 0 1745 0 1745 1993 -2 1992 -3 3 -1742z
            m12000 0 l2 -1743 -1995 0 -1995 0 0 1745 0 1745 1993 -2 1992 -3 3 -1742z"/>
        </g>

    <!--Wall Frame-->
        <g transform="translate(0.000000,1902.000000) scale(0.100000,-0.100000)"
        fill="${adjust(primaryColor, -30)}" stroke="none">   <!--Change color here!-->
            <path d="M3500 9396 l0 -1756 2006 0 2006 0 -3 1744 c-2 959 -8 1748 -12 1753
            -5 4 -906 10 -2003 12 l-1994 3 0 -1756z m3743 932 c4 -310 7 -983 7 -1495 l0
            -933 -1745 0 -1745 0 0 1495 0 1495 1738 0 1739 0 6 -562z"/>
            <path d="M15500 9396 l0 -1756 2006 0 2006 0 -3 1744 c-2 959 -8 1748 -12
            1753 -5 4 -906 10 -2003 12 l-1994 3 0 -1756z m3743 932 c4 -310 7 -983 7
            -1495 l0 -933 -1745 0 -1745 0 0 1495 0 1495 1738 0 1739 0 6 -562z"/>
            <path d="M8500 7146 l0 -3506 3006 0 3006 0 -3 3494 c-2 1922 -8 3498 -12
            3503 -5 4 -1356 10 -3003 12 l-2994 3 0 -3506z m5745 2934 l0 -305 -2742 -3
            -2743 -2 0 310 0 310 2743 -2 2742 -3 0 -305z m-4375 -3375 l0 -2805 -555 0
            -555 0 0 2805 0 2805 555 0 555 0 0 -2805z m3000 0 l0 -2805 -1370 0 -1370 0
            0 2805 0 2805 1370 0 1370 0 0 -2805z m1380 0 l0 -2805 -560 0 -560 0 0 2805
            0 2805 560 0 560 0 0 -2805z"/>
        </g>

    <!--Sign-->
        <g transform="translate(0.000000,1902.000000) scale(0.100000,-0.100000)"
        fill="${secondaryColor}" stroke="none">   <!--Change color here!-->
            <path d="M13691 16029 c0 -9 -15 -64 -32 -124 -213 -743 -786 -1319 -1535
            -1543 -384 -116 -849 -116 -1244 -1 -621 181 -1130 614 -1408 1198 -52 109
            -162 420 -162 458 0 11 -3 14 -8 7 -4 -7 -74 -14 -192 -18 -1400 -51 -2381
            -184 -3080 -416 -570 -189 -905 -446 -1005 -770 -14 -46 -18 -116 -22 -430 -8
            -569 5 -688 89 -828 189 -312 610 -546 1288 -716 707 -178 1553 -273 2825
            -318 488 -17 4102 -17 4590 0 1272 45 2118 140 2825 318 728 182 1175 448
            1325 789 54 120 59 175 59 635 0 480 -4 513 -72 655 -308 639 -1637 994 -4039
            1081 -165 6 -193 9 -196 23 -4 15 -5 15 -6 0z"/>
        </g>

    <!--Sign Frame-->
        <g transform="translate(0.000000,1902.000000) scale(0.100000,-0.100000)"
        fill="${adjust(secondaryColor, -100)}" stroke="none">   <!--Change color here!-->
            <path d="M11239 18749 c-206 -17 -508 -104 -724 -209 -291 -141 -598 -391
            -791 -645 -279 -367 -429 -758 -464 -1215 -6 -74 -13 -142 -16 -152 -5 -18 -2
            -18 -529 -43 -1736 -84 -2966 -350 -3609 -780 -354 -237 -556 -522 -587 -829
            -5 -50 -12 -234 -15 -408 l-6 -318 -1124 0 -1124 0 0 -250 0 -250 -250 0 -250
            0 0 -256 0 -256 1492 3 1493 3 70 -73 c493 -516 1568 -843 3220 -980 579 -49
            844 -59 1760 -72 895 -13 3749 -5 4155 11 1217 47 2074 149 2810 335 367 92
            598 173 865 305 265 130 429 244 580 401 l70 73 1410 -3 c776 -1 1449 1 1498
            5 l87 7 0 248 0 249 -250 0 -250 0 0 250 0 250 -1130 0 -1130 0 0 108 c-1 59
            -5 233 -10 387 -8 259 -10 287 -35 370 -86 292 -302 539 -660 752 -575 344
            -1600 581 -2940 682 -357 27 -800 51 -1037 55 l-63 1 -8 95 c-39 479 -144 808
            -365 1145 -327 499 -822 841 -1406 970 -193 43 -477 56 -737 34z m-1897 -2874
            c109 -361 281 -652 548 -929 390 -403 915 -642 1485 -674 83 -5 177 -7 210 -5
            612 36 1128 268 1535 689 274 285 440 580 562 999 7 28 18 50 23 50 476 -10
            1206 -57 1655 -106 1157 -126 1928 -352 2327 -684 142 -118 230 -246 283 -410
            22 -67 23 -88 28 -455 5 -437 -3 -559 -44 -670 -51 -137 -152 -269 -288 -374
            -521 -406 -1552 -644 -3206 -741 -642 -37 -860 -40 -2960 -40 -2101 0 -2310 3
            -2960 40 -1650 96 -2685 335 -3206 741 -134 104 -234 233 -290 375 l-29 74 -3
            489 c-3 476 -2 491 18 560 49 159 140 292 283 411 466 387 1437 631 2947 739
            259 19 1007 56 1034 51 5 -1 27 -59 48 -130z"/>
        </g>
    </svg>
</div>
    <div class="enterStoreDiv">
    <a class="enterStoreLink" href="business.html" onclick="enterStore(${id}, '${name}')">Enter ${name}</a>
    </div>
    </div>
  `
}

function generateBusinessDiv(name, address, type) {
    return `
    <div class="localBusinessDiv">
        <h3>${name}</h3>
        <span><em>${address}</em></span>
    </div>`
}

function enterStore(id, storeName) {
    console.log(id + " " + storeName);
    localStorage.setItem("idStore",id);
}

readData();