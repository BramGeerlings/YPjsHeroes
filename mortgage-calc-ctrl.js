console.clear();

console.log(document.getElementsByName("incomeField").length);

for(var i = 0; i < document.getElementsByName("incomeField").length; i++){
    document.getElementsByName("incomeField")[i].addEventListener("change", validateAndSubmit)
}

document.getElementById("submitButton").addEventListener("click", validateAndSubmit)

function validateAndSubmit() {   
    var val1 = validateNumeric(document.getElementsByName("incomeField")[0].value);
    var val2 = validateNumeric(document.getElementsByName("incomeField")[1].value);  
    
    var total = val1 + val2;        
    var http = new XMLHttpRequest();
    var url = 'http://agile-wave-86684.herokuapp.com/max-to-loan';
    var params = "income1=" + val1 + "&" + "income2=" +val2;

    http.open("GET", url+"?"+params,true);
    http.onreadystatechange = function()
    {
        if(http.readyState == 4 && http.status == 200) {           
             document.getElementById('total').innerHTML = JSON.parse(http.responseText).maxToLoan;
        }
    }
    http.send(null);
}

function validateNumeric(val){   
    if(val !== "" && /^[0-9]*$/.test(val)){
        return parseInt(val);
    }
    return false;
}

