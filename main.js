let buttonMoods = document.querySelector('.header-container button');

function changeMode() {
    if (document.body.className == "light-mood") {
        buttonMoods.style.animation = "2s cubic-bezier(0.05, 1.61, 0.74,-0.51)";

        document.querySelector("#dark").style.display = "none";
        document.querySelector("#light").style.display = "block";

        document.body.classList.remove("light-mood");

        setTimeout(function () {
            buttonMoods.style.animation = ""
        }, 2002)
    } else {
        buttonMoods.style.animation = "2s gradient cubic-bezier(0.05, 1.61, 0.74,-0.51)";

        document.querySelector("#light").style.display = "none";
        document.querySelector("#dark").style.display = "block";

        document.body.classList.add("light-mood");

        setTimeout(function () {
            buttonMoods.style.animation = ""
        }, 2002)

    }
    buttonMoods.style.animation = "1s gradient ease"

    saveChangeInLocalStorage()
}

function saveChangeInLocalStorage() {
    let mood = JSON.stringify(document.body.className);
    window.localStorage.setItem("mood", mood);
}

function runMood() {
    let theme = JSON.parse(window.localStorage.getItem("mood"));
    if (theme !== "") {
        document.body.classList.add(theme);
    }
}

buttonMoods.addEventListener("click", changeMode);
runMood();

// =========================================    ===================================  //

function getData() {

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            let myArray = JSON.parse(this.responseText)
            filteration(myArray);
            window.localStorage.setItem("myArray", JSON.stringify(myArray))
        }

    }

    myRequest.open("GET", "data.json", true);
    myRequest.send();

}

getData();



// =========================================    ===================================  //
let lis = document.querySelectorAll(".top-section ul li button");

lis.forEach(li => {
    li.onclick = function () {
        lis.forEach(all => all.classList.remove("active"));
        li.classList.add("active");
        let referance = JSON.parse(localStorage.getItem("myArray"))
        filteration(referance);
    }
})



function filteration(myArray) {
    document.querySelector(".cards-con").textContent = "";
    let currentTarget = document.querySelector(".top-section ul li button.active").getAttribute("data-id");
    let bigboss = myArray;
    if (currentTarget == "all") {
        craeteCards(bigboss);
    } else if (currentTarget == "Active") {
        let collactionAV = bigboss.filter((e) => {
            return e.isActive === true;
        });
        craeteCards(collactionAV)
    } else {
        let collactionAV = bigboss.filter((e) => {
            return e.isActive === false;
        });
        craeteCards(collactionAV)
    }
}

function craeteCards(myFiltAry) {
    for (let i = 0; i < myFiltAry.length; i++) {

        let cardsCon = document.querySelector(".cards-con");

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

function createTopSec(card, content, myFiltAry) {
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "icon");
    let img = document.createElement("img");
    img.setAttribute("src", myFiltAry.logo);
    imgDiv.appendChild(img);
    content.appendChild(imgDiv);

    let textCon = document.createElement("div");
    textCon.setAttribute("class", "text-con");
    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(myFiltAry.name));
    textCon.appendChild(h3);
    let dis = document.createElement("p");
    dis.appendChild(document.createTextNode(myFiltAry.description));
    textCon.appendChild(dis);
    content.appendChild(textCon)


    card.appendChild(content);
}

function createBtnSec(card, btns, myFiltAry) {
    let button = document.createElement("button");
    button.textContent = "Remove";
    btns.appendChild(button);

    let frame = document.createElement("span");
    frame.setAttribute("class", "frame");

    let toggle = document.createElement("span");
    toggle.setAttribute("class", "toggle");
    if (myFiltAry.isActive === true) {
        frame.classList.add("isActive")
    }
    frame.appendChild(toggle);
    btns.appendChild(frame);

    card.appendChild(btns);
}

document.addEventListener("click", function (e) {
    let frameBtn = e.target.closest(".card .frame");
    if (frameBtn) {
        frameBtn.classList.toggle("isActive");
    }
})
document.addEventListener("click", function (e) {
    let removebtn = e.target.closest(".card button");
    if (removebtn) {
        removebtn.closest(".card").remove();
    }
})
