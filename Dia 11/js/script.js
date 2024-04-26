

let buscarPokemon = 1;

const obtenerPokemon = async (pokemon) => {
  const respuestaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (respuestaAPI.status === 200) {
    const datos = await respuestaAPI.json();
    return datos;
  }
}
