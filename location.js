console.log('You have connected...')

// This is the main function, just runs on each load of page
document.addEventListener("DOMContentLoaded", () =>{

    // Wait for button to be clicked
    let generate2Btn = document.querySelector('#single-pokemon-button');
    generate2Btn.addEventListener('click', renderLocations)

})

// function for rendering data into the div container
function renderLocations(){
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = "";
    fetchSinglePokemon();
}

// Fetches all pokemon from the API, then uses a for loop to determine if its the right one
function fetchSinglePokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(function(singlepokemon){
        // start of each for loop
        singlepokemon.results.forEach(function(pokemon){ 
            // get the user input pokemon name
            const userpoke = document.querySelector('#single-pokemon').value;
            // if the name of the pokemon = user input, grab the data
            if (pokemon.name == userpoke){
                fetchPokemonData(pokemon);
            } 
        })
    })
}

// function for grabbing the JSON data for a pokemon, needed for the pokemon ID
function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
                                //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        fetchPokemonLocations(pokeData)
    })
}

// function for grabbing the location data for the pokemon, using the pokemon ID from last function to build the API URL
function fetchPokemonLocations(pokeData){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeData.id}/encounters`)
    .then(response => response.json())
    .then(function(pokeLocation){
        renderPokemon(pokeLocation)
    })
}

// Puts all of the locations into a list and displays it 
function renderPokemon(pokeLocation){
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    pokeContainer.classList.add('ui', 'card');
   
    let pokeLocations = document.createElement('ul') //ul list will hold the pokemon types
  
    createLocationList(pokeLocation, pokeLocations) // helper function to go through the types array and create li tags for each one

    pokeContainer.append(pokeLocations);
    allPokemonContainer.appendChild(pokeContainer);       //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

//creating HTML list for data
function createLocationList(locations, ul){
    locations.forEach(function(location){
        let locationLi = document.createElement('li');
        locationLi.innerText = location['location_area']['name'];
        ul.append(locationLi)
    })
}