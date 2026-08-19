let buttonMoods = document.querySelector('.header-container button');

function changeMode() {

    //  btn prevent click 
    buttonMoods.style.pointerEvents = 'none';
    // add animation to the btn
    buttonMoods.style.animation = "1s gradient ease";

    if (document.body.className == "light-mode") {

        document.body.classList.remove("light-mode");

        document.querySelector("#dark").style.display = "none";
        document.querySelector("#light").style.display = "block";

    } else {

        document.body.classList.add("light-mode");

        document.querySelector("#light").style.display = "none";
        document.querySelector("#dark").style.display = "block";

    };

    // remove animation from btn
    buttonMoods.addEventListener("animationend", function() {
        buttonMoods.style.animation = ""

        // the btn return to press
        buttonMoods.style.pointerEvents = 'auto';
    });

    saveChangeInLocalStorage();
};

function saveChangeInLocalStorage() {
    let mode = document.body.className;
    if (mode == "light-mode") {
        window.localStorage.setItem("mode", JSON.stringify(mode));
    } else {
        window.localStorage.removeItem("mode");
    }
}

function runMood() {
    let theme = JSON.parse(window.localStorage.getItem("mode"));
    if (theme) {
        document.body.classList.add(theme);
    } else return;
}

buttonMoods.addEventListener("click", changeMode);
runMood();

// ===================================== GET DATA FROM JSON ===============================  //

let myArray = JSON.parse(localStorage.getItem("myArray"));


function getData() {
let myRequest = new XMLHttpRequest();
myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        window.localStorage.setItem("myArray", this.responseText)
    }
}
myRequest.open("GET", "data.json", true);
myRequest.send();
}

if ( myArray.length === 0 ) {
    getData();
    if(myArray.length > 0) {
        craeteCards(myArray);
    }
};

// ================================== filtration   =================================  //

let lis = document.querySelectorAll(".top-section ul li button");

lis.forEach(li => {
    li.onclick = function () {
        lis.forEach(all => all.classList.remove("active"));
        li.classList.add("active");
        filteration(myArray);
    }
});

function filteration(myArray) {
    let currentTarget = document.querySelector(".top-section ul li button.active").getAttribute("data-id");
    if (currentTarget == "all") {
        craeteCards(myArray);
    } else if (currentTarget == "Active") {
        let collactionAV = myArray.filter((e) => {
            return e.isActive === true;
        });
        craeteCards(collactionAV)
    } else {
        let collactionAV = myArray.filter((e) => {
            return e.isActive === false;
        });
        craeteCards(collactionAV)
    }
}

// =========================================    ===================================  //

function craeteCards(myFiltAry) {
    let cardsCon = document.querySelector(".cards-con");
    cardsCon.innerHTML = "";

    for (let i = 0; i < myFiltAry.length; i++) {


        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let content = document.createElement("div");
        content.setAttribute("class", "content");

        createTopSec(card, content, myFiltAry[i]);

        let btns = document.createElement("div");
        btns.setAttribute("class", "btns");

        createBtnSec(card, btns, myFiltAry[i]);


        cardsCon.appendChild(card);
    }
}

function createTopSec(card, content, myObj) {
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "icon");
    let img = document.createElement("img");
    img.setAttribute("src", myObj.logo);
    imgDiv.appendChild(img);
    content.appendChild(imgDiv);

    let textCon = document.createElement("div");
    textCon.setAttribute("class", "text-con");
    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(myObj.name));
    textCon.appendChild(h3);
    let dis = document.createElement("p");
    dis.appendChild(document.createTextNode(myObj.description));
    textCon.appendChild(dis);
    content.appendChild(textCon)


    card.appendChild(content);
}

function createBtnSec(card, btns, myObj) {
    let button = document.createElement("button");
    button.textContent = "Remove";
    btns.appendChild(button);

    let frame = document.createElement("span");
    frame.setAttribute("class", "frame");

    let toggle = document.createElement("span");
    toggle.setAttribute("class", "toggle");
    if (myObj.isActive === true) {
        frame.classList.add("isActive");
        card.setAttribute("data-active", "Active");
    }
    frame.appendChild(toggle);
    btns.appendChild(frame);

    card.appendChild(btns);
}

craeteCards(myArray);

// remove editing //

document.addEventListener("click", function(e) {
    let removeBtn = e.target.closest("button");
    
    if (removeBtn) {
        let parentCard = removeBtn.closest(".card");
        myArray = myArray.filter(e => e.name !== parentCard.querySelector("h3").textContent);
        editingLocalStorage(myArray);
        parentCard.remove();
    }
});

function editingLocalStorage(newArray) {
    // window.localStorage.removeItem(myArray);
    window.localStorage.setItem("myArray", JSON.stringify(newArray));
    
    craeteCards(myArray);
}

//  toggle frame

document.addEventListener("click", function (e) {
    let frameBtn = e.target.closest(".card .frame");
    if (frameBtn) {
        let thisCard = frameBtn.closest(".card");

        let thisObj;

        for (let j = 0; j < myArray.length; j++) {
            if (myArray[j].name === thisCard.querySelector("h3").textContent) {
                myArray[j].isActive = !myArray[j].isActive;
                window.localStorage.setItem("myArray", JSON.stringify(myArray))
            }
        }

        if (thisCard.hasAttribute("data-active")) {
            thisCard.removeAttribute("data-active");
        } else {
            thisCard.setAttribute("data-active", "Active");
        }

        frameBtn.classList.toggle("isActive");
    }
});