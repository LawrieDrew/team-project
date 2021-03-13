//var birthday input value
var brandy = "brandy";
var gin = "gin";
var vodka = "vodka";

var brandyBox = document.getElementById('brandy');
var brandyBox = document.getElementById('gin');
var brandyBox = document.getElementById('vodka');



var startBtn = document.getElementById('start');
var cardStartAray = [""]; //will just have card info from api, will have to manually add a string value for alcohol
var cardFilteredArrray = [''];//all possible cards based on user inpurs
var userArray = ['']; //where the 3 randomized cards live
//var card1Title = document.getID('title-card-1')


//moment.js check for birthday value. if OK then continue, if not, return - NEIL

function pickRandom(arr) {
    var index = Math.floor(Math.random()* arr.length);
    return arr[index];
}



//on click run function to generate tarot cards
startBtn.addEventListener('click', function(){
    var userAlc = [];

    if (brandyBox.checked){
            userAlc = userAlc.push("brandy");
        }

    console.log(userAlc);


    fetch('https://rws-cards-api.herokuapp.com/api/v1/cards')
    .then(response => response.json())
    .then(cards => {
        console.log(cards);

        //push first 18 indexes of larger array to cardStartArray

        //for each Card, add a string value of specific alcohol

        //if rum === checked then push the entire index of each index with a value rum
        
        //if all !== checked then return 

        //pickRandom(cardFilteredArray < 3)
        //assign randomized cards to userarray

        //assign name, desc, meaning_rev values of each card to correseponding variables card1Title = (userarray)[0]['name'] 

      })
   
})

