/* hacemos referencia a los elementos del DOM 
que vamos a manipular y los guardamos en una constante*/

const searchBtn = document.getElementById('search-btn');
const pokemonNameInput = document.getElementById('pokemon-name');
const pokemonIdDisplay = document.getElementById('pokemon-id');
const pokemonNameDisplay = document.getElementById('pokemon-name-display');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonType = document.getElementById('pokemon-type');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');


/** funcion para obtener la info del pokemon desde la API */

async function fetchPokemon(pokemon){
    try {
        //se llama a la API con el nombre o numero de pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    
        // si la respuesta es incorrecta: mensaje de error
        if(!response.ok){
            throw new Error('Pokemon no encontrado');
        }
         //si la respuesta es correcta, convertimos los datos a formato JSON
        const data = await response.json();

        //mostramos los datos del pokemon en la targeta 
        // llamo a la funcion displayPokemonData y llamo a la const data
        displayPokemonData(data);
    } catch (error) {
        alert(error.message);
        clearPokemonData();// si no se encuentra el pokemoon se limpia la targeta
    }
}
//funcion para mostrar los datos del pokemon
function displayPokemonData(data){
    pokemonIdDisplay.textContent = `#${data.id}`;
    pokemonNameDisplay.textContent = data.name.toUpperCase();
    pokemonImage.src = data.sprites.front_default;
    pokemonType.textContent = `Tipo: ${data.types.map(type => type.type.name).join(', ')}`;
    pokemonHeight.textContent = `Altura: ${data.height / 10} m`;
    pokemonWeight.textContent = `Peso: ${data.weight / 10} kg`;
}
// funcion para limpiar la targeta cuando no hay datos
function clearPokemonData(){
    pokemonIdDisplay.textContent = '';
    pokemonNameDisplay.textContent = '';
    pokemonImage.src = '';
    pokemonType.textContent = '';
    pokemonHeight.textContent = '';
    pokemonWeight.textContent = '';
}

// se crea el evento en el boton de busqieda
searchBtn.addEventListener('click', () => {
    const pokemon = pokemonNameInput.value;

// si el campo de busqueda esta vacio, mostramos una alerta
    if(pokemon.trim() === ''){
        alert('escribe el nombre o numero de un pokemon');
        return;
    }

    // llamamos a la funcion para obtener la informacion del pokemon
    fetchPokemon(pokemon)

});

