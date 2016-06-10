console.clear();

window.onload = function () {
    init();

}

for (var i = 0; i < document.getElementsByName("incomeField").length; i++) {
    document.getElementsByName("incomeField")[i].addEventListener("change", validateAndSubmit)
}

//document.getElementById("submitButton").addEventListener("click", validateAndSubmit)
for (element of document.getElementsByClassName("menu-button")) {
    element.addEventListener("click", showPage);
}

var menuButtons = document.getElementsByClassName('menu-button');

function validateAndSubmit() {
    var val1 = document.getElementsByName("incomeField")[0].value;
    var val2 = document.getElementsByName("incomeField")[1].value;

    var http = new XMLHttpRequest();
    var url = 'http://agile-wave-86684.herokuapp.com/max-to-loan';
    var params = quickParseParams(val1, val2);

    http.open("GET", url + "?" + params, true);

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            document.getElementById('total').innerHTML = JSON.parse(http.responseText).maxToLoan;
        } else if (http.readyState == 4 && http.status != 200) {
            document.getElementById('total').innerHTML = 'Voer alleen numerieke karakters in';
        }
    }

    http.send(null);
}

function showPage(e) {
    var pages = ['page_calculator', 'page_rente', 'page_voorwaarden'];
    var selectedPage;
    e.target ? selectedPage = setMenuButtonToActive(e.target.value) :
        selectedPage = setMenuButtonToActive(e);

    for (page of pages) {
        if (document.getElementById("content")) {          
            document.getElementById("content").innerHTML = quickParseObjectToString(selectedPage);
        }
    }
}

function setMenuButtonToActive(buttonName) {

    for (menuButton of menuButtons) {
        if (menuButton.value === buttonName) {
            menuButton.style.backgroundColor = '#009';
        } else {
            menuButton.style.backgroundColor = '#fd6400';
        }
    }

    return buttonName;
}

function quickParseObjectToString(objToParse) {
    var obj = objToParse;
    var objectType = '<object  type="text/html"'
    var pageload = ' data= page_' + obj.toLowerCase() + '.html></object>';
    return objectType + pageload;
}

function quickParseParams() {
    var parameter = "";
    for (var i = 0; i < arguments.length; i++) {
        i < arguments.length - 1 ? parameter += "income" + (i + 1) + "=" + (arguments[i] + "&") :
            parameter += "income" + (i + 1) + "=" + arguments[i];
    }
    return parameter;
}

function init() {
    showPage("Calculator");
}

