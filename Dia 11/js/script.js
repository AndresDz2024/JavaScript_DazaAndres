let searchPokemon = 1;

function fetchpokemon() {
  let pokemonInput = document.getElementById('Id').value.toLowerCase();
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displaypokemon(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displaypokemon(data) {
  let pokemonInfo = document.getElementById("pokeInfo");

  if (data.name) {
    let pokemonImage = data.id >= 650 ? './storage/img/noimg.png' : data.sprites.versions['generation-v']['black-white'].animated.front_default;
    pokemonInfo.innerHTML = `
    <div class="pokemon_datos">
      <span class="pokemon_numero">${data.id} -</span>
      <span class="pokemon_nombre">${data.name}</span>
    </div>
    <img class="pokemon__imagen" src=${pokemonImage}></img>
    `;
    searchPokemon = data.id;
    console.log(searchPokemon)
  } else {
    pokemonInfo.innerHTML = `<p>Error: Pokémon not found</p>`;
  }
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
