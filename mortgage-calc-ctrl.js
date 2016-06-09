console.clear();

console.log(document.getElementsByName("incomeField").length);

document.onload = function(){
    showPage("page_calculator");
}

for(var i = 0; i < document.getElementsByName("incomeField").length; i++){
    document.getElementsByName("incomeField")[i].addEventListener("change", validateAndSubmit)
}

document.getElementById("submitButton").addEventListener("click", validateAndSubmit)
for(element of document.getElementsByClassName("menu-button")){
    element.addEventListener("click", showPage);
}


function validateAndSubmit() {   
    var val1 = document.getElementsByName("incomeField")[0].value;
    var val2 = document.getElementsByName("incomeField")[1].value;      
   
    var http = new XMLHttpRequest();
    var url = 'http://agile-wave-86684.herokuapp.com/max-to-loan';
    var params = quickParseParams(val1,val2);
    
    //TODO: Betere manier vinden om params op te maken. JSON.stringify achtige manier, maar dan zonder encoding??
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

function showPage(e){
    console.log(e.target.value.toLowerCase());
    var pages = ['page_calculator','page_rente','page_voorwaarden'];
    var selectedPage = 'page_'+e.target.value.toLowerCase();
    
    for(page of pages){
        page != selectedPage ? document.getElementById(page).style.display = 'none':
        document.getElementById(selectedPage).style.display = 'initial'; 
    }
}

function quickParseParams(){
    var parameter = "";
    for(var i = 0; i< arguments.length; i++){
        i<arguments.length-1? parameter += "income" + (i+1)+ "=" +(arguments[i]+"&"):
        parameter += "income" + (i+1)+ "=" +arguments[i];
    }
    return parameter;
}

