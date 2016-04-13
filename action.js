///////////////////////////////////////////////////////////////////
function getType(id, i, j){
    $.getJSON('http://pokeapi.co/api/v2/pokemon/'+id+'/', function (data) {
        
        if (data.types.length === 2){ //type
            $('tr:nth-child(' + i + ') td:nth-child(' + j + ')').append("<br>" + data.types[0].type.name +', ' + data.types[1].type.name);
        } else {
            $('tr:nth-child(' + i + ') td:nth-child(' + j + ')').append("<br>" + data.types[0].type.name);
        };
    }
)}



/*---------------------------------------------------------------------------------------------------------------------------------------------*/
var fromNum = 0; //where start getting new chunk
var counter = 1; //counter = pokemon's id
var i = 1; //variable for putting data into the table's row

function getChunk() {
    
    var one = counter; var two = counter +1; var three = counter +2; var four = counter +3; var five = counter +4; var six = counter +5; var seven = counter +6; var eight = counter +7; var nine = counter +8; var ten = counter +9; var eleven = counter +10; var twelve = counter +11; 
    
    $("table").append("<tr><td class=" + one + "></td><td class=" + two + "></td><td class=" + three + "></td></tr><tr><td class=" + four + "></td><td class=" + five + "></td><td class=" + six + "></td></tr><tr><td class=" + seven + "></td><td class=" + eight + "></td><td class=" + nine + "></td></tr><tr><td class=" + ten + "></td><td class=" + eleven + "></td><td class=" + twelve + "></td></tr>"); //add table where we can put new data
    
    
    var j = 1; // --- table's cell 
    
    $.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=12&offset='+ fromNum +'', function (data) {
        
        for(var k=1; k<=12; k++){
            var c = k-1; //variable for array
            $('tr:nth-child(' + i + ') td:nth-child(' + j + ')').append("<img class=" + counter + " src='http://pokeapi.co/media/img/"+counter+".png/' /><br>" + data.results[c].name); //add img and name             
            getType(counter, i, j);
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCard(){
    window.onclick = function(event) {
        
        $("#card").html("");
        console.log(event.srcElement.className)// then e.srcElement.className has the class
        var number = parseFloat(event.srcElement.className);
        if (isNaN(number)){
            $("#card").hide();
        } else {
            $("#card").show(0.01);
            getInfo(number);     
        }
        
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getInfo(id){ //get stats for card
        $.getJSON('http://pokeapi.co/api/v2/pokemon/'+id+'/', function (data) {
            $("#card").append("<img src='http://pokeapi.co/media/img/"+id+".png/' /> <br>"); //img
            $("#card").append(data.name + " #" + data.id); //name and id
            
            if (data.types.length === 2){ //type
                $("#card").append('<tr><td>Type</td><td>' + data.types[0].type.name +', ' + data.types[1].type.name + '</td></tr>');
            } else {
            $("#card").append('<tr><td>Type</td><td>' + data.types[0].type.name +'</td></tr>');
            };
            
            $("#card").append('<tr><td>Attack</td><td>' + data.stats[4].base_stat +'</td></tr>'); //attack
            $("#card").append('<tr><td>Defence</td><td>' + data.stats[3].base_stat +'</td></tr>'); //defence
            $("#card").append('<tr><td>HP</td><td>' + data.stats[4].base_stat +'</td></tr>'); //HP
            $("#card").append('<tr><td>SP attack</td><td>' + data.stats[2].base_stat +'</td></tr>'); //SP attack
            $("#card").append('<tr><td>SP attack</td><td>' + data.stats[1].base_stat +'</td></tr>');  //SP defence
            $("#card").append('<tr><td>Speed</td><td>' + data.stats[0].base_stat +'</td></tr>'); //speed
            $("#card").append('<tr><td>Weight</td><td>' + data.weight +'</td></tr>'); //weight
            $("#card").append('<tr><td>Total moves</td><td>' + data.moves.length +'</td></tr>'); //total moves  
        })    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
    getChunk(); //base chunk
    $("button").click(function(){
       
        
        getChunk(); //next chunk
    })
    getCard();
})

