window.onload = function () {
    showPage("Calculator");
}

for (var i = 0; i < document.getElementsByName("incomeField").length; i++) {
    document.getElementsByName("incomeField")[i].addEventListener("change", validateAndSubmit)
}

for (element of document.getElementsByClassName("menu-button")) {
    element.addEventListener("click", showPage);
}

var menuButtons = document.getElementsByClassName('menu-button');

function validateAndSubmit() {
    switch (true) {
        case !!document.getElementById("page_calculator"):
            calculateMortgage();
            break;
        case !!document.getElementById("page_rente"):
            calculateInterest();
            break;
    }

}

function calculateMortgage() {
    var val1 = document.getElementsByName("incomeField")[0].value;
    var val2 = document.getElementsByName("incomeField")[1].value;

    var http = new XMLHttpRequest();
    var url = 'http://agile-wave-86684.herokuapp.com/max-to-loan';
    var params = quickParseParams(val1, val2);

    http.open("GET", url + "?" + params, true);   
  
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var maxTeLenen = parseInt(JSON.parse(http.responseText).maxToLoan);
            maxTeLenen = parseFloat(maxTeLenen).formatMoney(2,",");
            document.getElementById('total').innerHTML = "U kunt maximaal lenen: " + maxTeLenen + " euro";
        } else if (http.readyState == 4 && http.status != 200) {
            document.getElementById('total').innerHTML = 'Voer alleen numerieke karakters in';
        }
    }

    http.send(null);
}



function calculateInterest() {
    var val = document.getElementsByName("incomeField")[0].value;
    var interest = ' ';
    if (document.getElementById('currentRate')) {
        interest = parseFloat(document.getElementById('currentRate').innerHTML);
    }
    interest = interest / 100;
    var trueInterest = Math.round(((val / 12) * interest) * 100) / 100;
    trueInterest = parseFloat(trueInterest).formatMoney(2,",");
    document.getElementById('total').innerHTML = 'Bruto maandlast: ' + trueInterest + ' euro';
}

///NIET ZELF GESCHREVEN!!!
//http://www.josscrowcroft.com/2011/code/format-unformat-money-currency-javascript/
//Alleen aangepast naar europees format.
Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;	
	thousand = thousand || ".";
	decimal = decimal || ",";
	var number = this, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

function getCurrentInterestRate() {
    var http = new XMLHttpRequest();
    var url = 'http://agile-wave-86684.herokuapp.com/current-mortgage-interest-rate';

    http.open("GET", url, true);

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            document.getElementById('currentRate').innerHTML = JSON.parse(http.responseText).currentRate;
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

if (document.getElementById('currentRate')) {
    getCurrentInterestRate();
}


