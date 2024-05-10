let searchPokemon = 1;

document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('Id');
  input.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchpokemon();
    }
  });
});

function fetchpokemon() {
  let pokemonInput = document.getElementById('Id').value.toLowerCase();
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pokemon not found');
        } else {
          throw new Error('Network response was not ok');
        }
      }
      return response.json();
    })
    .then(data => {
      displaypokemon(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      if (error.message === 'Pokemon not found') {
        displaypokemon({ name: null });
      }
    });
}

const volumeControl = document.getElementById('volumeControl');

volumeControl.addEventListener('input', function() {
  pokemonCry.volume = this.value;
});

function displaypokemon(data) {
  let pokemonInfo = document.getElementById("pokeInfo");

  if (data.name) {
    if (data.sprites.versions['generation-v']['black-white'].animated.front_default) {
      pokeimgID = data.sprites.versions['generation-v']['black-white'].animated.front_default;
  } else{
    pokeimgID = data.sprites.front_default;
  }
pokemonInfo.innerHTML = `
    <div class="pokemon_datos">
      <span class="pokemon_numero">${data.id} -</span>
      <span class="pokemon_nombre">${data.name}</span>
    </div>
    <img class="pokemon__imagen" src=${pokeimgID}></img>
    `;
    searchPokemon = data.id;
    playPokemonCry(data.cries.latest);
    console.log(searchPokemon)
  } else {
    pokemonInfo.innerHTML = `
    <div class="pokemon_datos">
      <span class="pokemon_numero">-</span>
      <span class="pokemon_nombre">Not found</span>
    </div>
    <img class="pokemon__imagen" src="./storage/img/noimg.png"></img>
    `;
  }
}

function playPokemonCry(audioUrl) {
  let audio = document.getElementById("pokemonCry");
  audio.src = audioUrl;
  audio.play();
}


document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('Id');
  input.addEventListener('keypress', function(event) {
      if (event.keyCode === 13) {
          fetchpokemon();
          event.preventDefault();
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const buttonPrev = document.querySelector('.btn-prev');
  const buttonNext = document.querySelector('.btn-next');

  buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });

  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });

  renderPokemon(searchPokemon);
});

function renderPokemon(searchPokemon) {
  document.getElementById('Id').value = searchPokemon;
  fetchpokemon();
}

