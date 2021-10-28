console.log('You have connected...')

document.addEventListener("DOMContentLoaded", () =>{

    let generateBtn = document.querySelector('#generate-pokemon');
    generateBtn.addEventListener('click', renderLocations)

    let generate2Btn = document.querySelector('#single-pokemon-button');
    generate2Btn.addEventListener('click', renderLocations)

    getDeleteBtn().addEventListener('click', deleteEverything);
})

// OR make it /location?pokemon=USERINPUT
// Maybe make event POST request to /location
// get post data for pokemon to search for 
// get search term from user

function renderLocations(){
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = "";
    //fetchKantoPokemon();
    fetchSinglePokemon();

    getDeleteBtn().style.display = 'block'
}

function getDeleteBtn(){
    return document.querySelector('#delete-btn')
}

// Getting pokemon (limit this to just the one we want)
function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}

// Getting Single Pokemon - NEED TO FIX TO ONLY SELECT POKEMON WHERE NAME = USER INPUT
function fetchSinglePokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(function(singlepokemon){
        singlepokemon.results.forEach(function(pokemon){ // WHERE pokemon name = USER INPUT
            // check if name = user input
            // if it does then fetch data
            // if it doesnt then move on
            //const queryString = window.location.search;
            //const urlParams = new URLSearchParams(queryString);
            //const userpoke = urlParams.get('search')
            const userpoke = document.querySelector('#single-pokemon').value;
            if (pokemon.name == userpoke){
                fetchPokemonData(pokemon);
            } 
        })
    })
}

// for loop looking for all the pokemon returned, getting the name, checking if name = user input 
// if it matches user input, call function to get data of that pokemon

function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
                                //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        fetchPokemonLocations(pokeData)
    })
}

function fetchPokemonLocations(pokeData){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeData.id}/encounters`)
    .then(response => response.json())
    .then(function(pokeLocation){
        renderPokemon(pokeLocation)
    })
}

// selecting which information to display and how
function renderPokemon(pokeLocation){
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    pokeContainer.classList.add('ui', 'card');

    //createPokeImage(pokeData.id, pokeContainer);

    // let pokeName = document.createElement('h4') 
    // pokeName.innerText = pokeData.name

    // let pokeNumber = document.createElement('p')

    // for (i=0; i<pokeLocation.length; i++){
    //     pokeNumber.innerText = `${pokeLocation.name}`
    // }
     
    //pokeNumber.innerText = `${pokeLocation.name}`
   
    let pokeLocations = document.createElement('ul') //ul list will hold the pokemon types
  

    createTypes(pokeLocation, pokeLocations) // helper function to go through the types array and create li tags for each one

    //pokeContainer.append(pokeName, pokeNumber, pokeTypes);   //appending all details to the pokeContainer div
    pokeContainer.append(pokeLocations);
    allPokemonContainer.appendChild(pokeContainer);       //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

//creating HTML list for data
function createTypes(locations, ul){
    locations.forEach(function(location){
        let locationLi = document.createElement('li');
        locationLi.innerText = location['location_area']['name'];
        ul.append(locationLi)
    })
}

// Creating HTML div image for pokemon
// function createPokeImage(pokeID, containerDiv){
//     let pokeImgContainer = document.createElement('div')
//     pokeImgContainer.classList.add('image')

//     let pokeImage = document.createElement('img')
//     pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`

//     pokeImgContainer.append(pokeImage);
//     containerDiv.append(pokeImgContainer);
// }

// deletes everything
function deleteEverything(event){
    event.target.style = 'none';
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = ""

    let generateBtn = document.createElement('button')
    generateBtn.innerText = "Generate Pokemon"
    generateBtn.id = 'generate-pokemon'
    generateBtn.classList.add('ui', 'secondary', 'button')
    generateBtn.addEventListener('click', renderEverything);

    allPokemonContainer.append(generateBtn)
}