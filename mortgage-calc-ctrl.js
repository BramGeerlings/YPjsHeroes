console.clear();

console.log(document.getElementsByName("incomeField").length);

for(var i = 0; i < document.getElementsByName("incomeField").length; i++){
    document.getElementsByName("incomeField")[i].addEventListener("change", validateAndSubmit)
}

document.getElementById("submitButton").addEventListener("click", validateAndSubmit)

function validateAndSubmit() {   
    var val1 = document.getElementsByName("incomeField")[0].value;
    var val2 = document.getElementsByName("incomeField")[1].value;      
    
    var http = new XMLHttpRequest();
    var url = 'http://agile-wave-86684.herokuapp.com/max-to-loan';
    var params = "income1=" + val1 + "&" + "income2=" +val2;

    http.open("GET", url+"?"+params,true);
    http.onreadystatechange = function()
    {
        if(http.readyState == 4 && http.status == 200) {           
             document.getElementById('total').innerHTML = JSON.parse(http.responseText).maxToLoan;
        }else if(http.readyState == 4 && http.status != 200){
            document.getElementById('total').innerHTML = 'Voer alleen numerieke karakters in';
        }
    }
    http.send(null);
}


