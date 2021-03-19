//UI elements

var brandyBox = document.getElementById('brandy');//Must add all alcohol options
var vodkaBox = document.getElementById('vodka');
var tequilaBox = document.getElementById('tequila');
var ginBox = document.getElementById('gin');
var rumBox = document.getElementById('rum');
var whiskeyBox = document.getElementById('whiskey');

var card = document.querySelectorAll('.card');
var cardOne = document.getElementById('card-one');
var cardTwo = document.getElementById('card-two');
var cardThree = document.getElementById('card-three');
//Variables to target hiding and unhiding sections
var tarotCards = document.getElementById('tarot-cards');
var cocktailCards = document.getElementById('cocktail-cards');
var mainPage = document.getElementById('header');

//card tarot card one
var cardOneTitle = document.getElementById('first-card-title');
var cardOneMeaningUp = document.getElementById('first-card-meaning_up');
var cardOnePic = document.getElementById('card-one-pic');
var cardOneSelect = document.getElementById('card-one-button');

var cardTwoTitle = document.getElementById('second-card-title');
var cardTwoDesc = document.getElementById('second-card-desc');
var cardTwoMeaningUp = document.getElementById('second-card-meaning_up');
var cardTwoPic = document.getElementById('card-two-pic');
var cardThreeTitle = document.getElementById('third-card-title');
var cardThreeDesc = document.getElementById('third-card-desc');
var cardThreeMeaningUp = document.getElementById('third-card-meaning_up');
var cardThreePic = document.getElementById('card-three-pic');
var startBtn = document.getElementById('start');//variable to grab the start button

//variables for updated card info
var cardThreeTitleText;
var cardTwoTitleText;
var cardOneTitleText;

//Alcohol + Card Pairings Arrays
var brandyArray = [{name:"The Hierophant"}, {name:"Justice"}, {name:"The Moon"}] //Must add all arrays as decided by group
var vodkaArray = [{name:"The Emperor"}, {name:"The Empress"}, {name:"Wheel of Fortune"}]
var tequilaArray = [{name:"The Devil"}, {name:"The Lovers"}, {name:"The Tower"}]
var ginArray = [{name:"The Chariot"}, {name:"The Hermit"}, {name:"Temperance"}]
var rumArray = [{name:"The Magician"}, {name:"The High Priestess"}, {name:"The Star"}]
var whiskeyArray = [{name:"The Hanged Man"}, {name:"Death"}, {name:"Fortitude"}]

var alcoholChoice=[]; //variable to hold all alcohol associated with card
var drinksFiltered=[];//variable to hold the randomly selected drinks

//Manipulated arrays
var cardStartArray = []; //will just have card info from api
var cardFilteredArray = [];//all possible cards based on user inputs
var userArray = []; //where the 3 randomized cards live

//moment.js check for birthday value. if OK then continue, if not, return - NEIL
currentDate = moment().format("MM/DD/YYYY");
console.log(currentDate);

var DOBInput = document.querySelector("#birthday");



//on click run function to generate tarot cards
startBtn.addEventListener('click', function(){

    var userBirthday = DOBInput.value
    console.log(userBirthday);
    var birthday = moment(userBirthday).format("MM/DD/YYYY");
    console.log(birthday)

    //hiding and unhiding sections
    mainPage.classList.add("hidden")
    tarotCards.classList.remove("hidden");


   // if statement for birthday
   if ((moment(currentDate).diff(moment(birthday), "years") < 21)) {
    console.log("too young!");
    return
    }

    //if statement to check for user input values and creates custom user array
    if (brandyBox.checked) { //run if statement to check for "checks" for each alcohol type
        cardFilteredArray = cardFilteredArray.concat(brandyArray);
    }
    if (vodkaBox.checked) {
        cardFilteredArray = cardFilteredArray.concat(vodkaArray);
    }
    if (tequilaBox.checked) {
        cardFilteredArray = cardFilteredArray.concat(tequilaArray);
    }
    if (ginBox.checked) {
        cardFilteredArray = cardFilteredArray.concat(ginArray);
    }
    if (rumBox.checked) {
        cardFilteredArray = cardFilteredArray.concat(rumArray);
    }
    if (whiskeyBox.checked) {
        cardFilteredArray = cardFilteredArray.concat(whiskeyArray);
    }
    console.log(cardFilteredArray)
    while (userArray.length < 3){
        var options = cardFilteredArray[Math.floor(Math.random()*cardFilteredArray.length)];
        if (!userArray.some( function(user) { return user.name === options.name } ) ) { //checks for duplicate values
            userArray.push(options);
        }
    }

    console.log(userArray)
    //fetching the Tarot Cards API
    fetch('https://rws-cards-api.herokuapp.com/api/v1/cards')
    .then(response => response.json())
    .then(cards => {
        console.log(cards);
        cardStartArray = cards['cards'];
        console.log(cardStartArray)

        let resultsArray = cardStartArray.filter(o1 => userArray.some(o2 => o1.name === o2.name)); //filters API large array to only include the cards with name values matching those in the custom user array
        
        console.log(resultsArray);
        
        //variables changing the html values on UI
        //card one
        cardOneTitleText = resultsArray[0]['name'];
        console.log(cardOneTitleText);
        var cardOneMeaningUpText = resultsArray[0]['meaning_up'];
        console.log(cardOneMeaningUpText);
        var cardOnePicTitle = cardOneTitleText.split(" ").join("")//Removes spaces from title to format for jpeg
        var pngOne = "assets/"+cardOnePicTitle + ".PNG";
        console.log(pngOne)

        cardOneTitle.innerText = cardOneTitleText;
        cardOneMeaningUp.innerText = cardOneMeaningUpText;
        cardOnePic.src = pngOne;
        cardOne.classList.add(cardOnePicTitle);

        //card two 
        cardTwoTitleText = resultsArray[1]['name'];
        console.log(cardTwoTitleText);
        var cardTwoDescText = resultsArray[1]['desc'];
        console.log(cardTwoDescText);
        var cardTwoMeaningUpText = resultsArray[1]['meaning_up'];
        console.log(cardTwoMeaningUpText);
        var cardTwoPicTitle = cardTwoTitleText.split(" ").join("")//Removes spaces from title to format for jpeg
        var pngTwo = "assets/"+cardTwoPicTitle + ".PNG";
        console.log(pngTwo)

        cardTwoTitle.innerText = cardTwoTitleText;
        cardTwoDesc.innerText = cardTwoDescText;
        cardTwoMeaningUp.innerText = cardTwoMeaningUpText;
        cardTwoPic.src=pngTwo
        cardTwo.classList.add(cardTwoPicTitle);
    

        //card three
        cardThreeTitleText = resultsArray[2]['name'];
        console.log(cardThreeTitleText);
        var cardThreeDescText = resultsArray[2]['desc'];
        console.log(cardThreeDescText);
        var cardThreeMeaningUpText = resultsArray[2]['meaning_up'];
        console.log(cardThreeMeaningUpText);
        var cardThreePicTitle = cardThreeTitleText.split(" ").join("")//Removes spaces from title to format for jpeg
        var pngThree = "assets/"+cardThreePicTitle + ".PNG";
        console.log(pngThree)

        cardThreeTitle.innerText = cardThreeTitleText;
        cardThreeDesc.innerText = cardThreeDescText;
        cardThreeMeaningUp.innerText = cardThreeMeaningUpText;
        cardThreePic.src=pngThree
        cardThree.classList.add(cardThreePicTitle);

        cardOne.classList.remove("hidden");
        cardTwo.classList.remove("hidden");
        cardThree.classList.remove("hidden");
        
        //for each Card, add a string value of specific alcohol
    

    })

    //Click actions for each card. Proper alcohol array is returned
    cardOneSelect.addEventListener('click', function(){
        tarotCards.classList.add("hidden")
        cocktailCards.classList.remove("hidden");

        if (cardOne.classList.contains("TheHierophant")){ //will need an else if statement for each card Name and add to card One Two and Three
            alcohol="brandy"
        }   else if (cardOne.classList.contains("Justice")){
            alcohol="brandy"
        }   else if (cardOne.classList.contains("TheMoon")){
            alcohol="brandy"
        }   else if (cardOne.classList.contains("TheEmpress")){
            alcohol="vodka"
        }   else if (cardOne.classList.contains("TheEmperor")){
            alcohol="vodka"
        }  else if (cardOne.classList.contains("WheelOfFortune")){
            alcohol="vodka"
        }  else if (cardOne.classList.contains("TheHangedMan")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("Death")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("Fortitude")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("TheDevil")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheLovers")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheTower")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheChariot")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("TheHermit")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("Temperance")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("TheMagician")){
            alcohol="rum"
        }   else if (cardOne.classList.contains("TheHighPriestess")){
            alcohol="rum"
        }   else if (cardOne.classList.contains("TheStar")){
            alcohol="rum"
        }
    console.log(alcohol)
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+alcohol)//change this variable to reflect the UserCardChoice
    .then(response => response.json())
    .then(alcoholOptions => {
        console.log(alcoholOptions);
        alcoholChoice = alcoholOptions['drinks'];
        for (var i = 0; i < 3; i++){
            var options = alcoholChoice[Math.floor(Math.random()*alcoholChoice.length)];
            drinksFiltered.push(options)
        }
        console.log(drinksFiltered)
    })
})
    cardTwo.addEventListener('click', function(){
        if (cardOne.classList.contains("TheHierophant")){ //will need an else if statement for each card Name and add to card One Two and Three
            alcohol="brandy"
        }   else if (cardOne.classList.contains("Justice")){
            alcohol="brandy"
        }   else if (cardOne.classList.contains("TheMoon")){
            alcohol="brandy"
        }   else if (cardOne.classList.contains("TheEmpress")){
            alcohol="vodka"
        }   else if (cardOne.classList.contains("TheEmperor")){
            alcohol="vodka"
        }  else if (cardOne.classList.contains("WheelOfFortune")){
            alcohol="vodka"
        }  else if (cardOne.classList.contains("TheHangedMan")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("Death")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("Fortitude")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("TheDevil")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheLovers")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheTower")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheChariot")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("TheHermit")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("Temperance")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("TheMagician")){
            alcohol="rum"
        }   else if (cardOne.classList.contains("TheHighPriestess")){
            alcohol="rum"
        }   else if (cardOne.classList.contains("TheStar")){
            alcohol="rum"
        }
        console.log(alcohol)
        fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+alcohol)//change this variable to reflect the UserCardChoice
        .then(response => response.json())
        .then(alcoholOptions => {
            console.log(alcoholOptions);
            alcoholChoice = alcoholOptions['drinks'];
            for (var i = 0; i < 3; i++){
                var options = alcoholChoice[Math.floor(Math.random()*alcoholChoice.length)];
                drinksFiltered.push(options)
            }
            console.log(drinksFiltered)
        })
    })
    cardThree.addEventListener('click', function(){
        if (cardOne.classList.contains("TheHierophant")){ //will need an else if statement for each card Name and add to card One Two and Three
            alcohol="brandy"
        }   else if (cardOne.classList.contains("Justice")){
            alcohol="brandy"
        }   else if (cardOne.classList.contains("TheMoon")){
            alcohol="brandy"
        }   else if (cardOne.classList.contains("TheEmpress")){
            alcohol="vodka"
        }   else if (cardOne.classList.contains("TheEmperor")){
            alcohol="vodka"
        }  else if (cardOne.classList.contains("WheelOfFortune")){
            alcohol="vodka"
        }  else if (cardOne.classList.contains("TheHangedMan")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("Death")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("Fortitude")){
            alcohol="whiskey"
        }   else if (cardOne.classList.contains("TheDevil")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheLovers")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheTower")){
            alcohol="tequila"
        }   else if (cardOne.classList.contains("TheChariot")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("TheHermit")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("Temperance")){
            alcohol="gin"
        }   else if (cardOne.classList.contains("TheMagician")){
            alcohol="rum"
        }   else if (cardOne.classList.contains("TheHighPriestess")){
            alcohol="rum"
        }   else if (cardOne.classList.contains("TheStar")){
            alcohol="rum"
        }
        fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+alcohol)//change this variable to reflect the UserCardChoice
        .then(response => response.json())
        .then(alcoholOptions => {
            console.log(alcoholOptions);
            alcoholChoice = alcoholOptions['drinks'];
            for (var i = 0; i < 3; i++){
                var options = alcoholChoice[Math.floor(Math.random()*alcoholChoice.length)];
                drinksFiltered.push(options)
            }
            console.log(drinksFiltered)
            })
        })
   
})


