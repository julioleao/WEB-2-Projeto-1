
var search = document.getElementById("searchField");

search.addEventListener("keyup", function(event) {
    if (event.keyCode === 13){
        document.getElementById("searchBtn").click();
    }
})

$("#searchBtn").click(function () {
    var input = document.getElementById("searchField").value.length;
    //console.log(input);
    if (input < 3){
        alert("Informe um valor com 3 ou mais caracteres!");
        $(".display-data").empty();
        document.getElementById("searchField").value = '';
        
        return;
    }
    $(".row").show();
    var input = document.getElementById("searchField").value;
    listAll( input );
});

function listAll( input ) {
    $.ajax({
        url: ("https://api.pokemontcg.io/v1/cards?name=" + input),
        method: "GET"
    }).done(function(data) {
        var comp = Object.keys(data.cards).length;
        var cards = data.cards;
        //var nom = "bulba"
        //var n = input.includes(nom,-1);
        //console.log(n);
        //console.log(comp);
        var str = '';

        if(comp < 1){
            alert("Sem resultados! Tente 'Bulbasaur'");
            document.getElementById("searchField").value = '';
            return;
        }
        
        for (var i = 0; i < comp; i++){
                str += '<div class="column"><div class="card"><img src="' +
                cards[i].imageUrl + '" alt="' +
                cards[i].name + '" style="width:100%">' +
                '<div class="card-container"><h4><b>' +
                cards[i].name + 
                '</b></h4></div></div></div>';           
        }
        $(".row").empty();
        $(".row").append(str);
    });
}

