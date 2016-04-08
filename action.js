var fromNum = 0; //where start getting new chunk
var counter = 1; //counter = pokemon's id
var i = 1; //variable for putting data into the table's row

/*---------------------------------------------------------------------------------------------------------------------------------------------*/
function getChank() {
    
    var j = 1; // --- table's cell
    $.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=12&offset='+ fromNum +'', function (data) {
        for(var k=1; k<=12; k++){
            var c = k-1; //variable for array
            $('tr:nth-child(' + i + ') td:nth-child(' + j + ')').append("<img class=" + counter + " src='http://pokeapi.co/media/img/"+counter+".png/' /><br>" + data.results[c].name + "<p>"+counter+"</p>"); //add img and name 
           
            counter +=1;
            if (j<3){
                j++;
            } else {
                i++;
                j = 1;
                
            } 
        }    
    })
    fromNum = fromNum + 12; //to start getting new chunk after old 12 elements 
}
/*---------------------------------------------------------------------------------------------------------------------------------------------*/

function getCard(){
    $("td, td img").click(function(event){
        console.log(event.target)
        $("#card").show(0.01);
        $.getJSON('http://pokeapi.co/api/v2/pokemon/1/', function (data) {
            $("#card").html("Triggered by a " + event.target + " element.");   
        })
    })
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function(){
    getChank(); //base chunk
    $("button").click(function(){
        $("table").append("<tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>"); //add table where we can put new data
        getChank(); //next chunk
    })
    getCard();
})