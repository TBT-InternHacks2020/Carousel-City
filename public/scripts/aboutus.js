function add () {
    pic("Dara");
}

function pic (name) {
    var img = document.createElement("img");
    img.scr = "../images/"+name+".png";
    img.width = 500;
    img.height - 500;
    // if (name == "Dara") {

    // }
    console.log("hi");
    document.body.appendChild(img); 
}