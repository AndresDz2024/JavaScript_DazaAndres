const API_URL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=4';

let jugadorMazo = [];
let maquinaMazo = [];
let puntajeJugador = 0;
let puntajeMaquina = 0;
let deckId = null;
let turnoMaquinaActivo = false;
let contador_J = 0;
let contador_M = 0;
mostrarRachaJ();
mostrarRachaM();

const CasinoSong = document.querySelector('.CasinoSong');

const volumeControl = document.getElementById('volumeControl');

volumeControl.addEventListener('input', function() {
  CasinoSong.volume = this.value;
});

function mostrarRachaJ() {
    const RachaJ = document.getElementById('idJ_victorias');
    RachaJ.textContent = `Racha del Jugador: ${contador_J}`;
}
function mostrarRachaM() {
    const RachaM = document.getElementById('idM_victorias');
    RachaM.textContent = `Racha de la Máquina: ${contador_M}`;
}

function reiniciarJuego() {
    jugadorMazo = [];
    maquinaMazo = [];
    puntajeJugador = 0;
    puntajeMaquina = 0;
    deckId = null;
    turnoMaquinaActivo = false;
    mostrarRachaJ();
    mostrarRachaM();
    
    document.getElementById('jugador-hand').innerHTML = '';
    document.getElementById('maquina-hand').innerHTML = '';

    document.getElementById('puntuacion-jugador').innerText = '';
    document.getElementById('puntuacion-maquina').innerText = '';

    document.getElementById('resultado').innerText = '';
    mostrarBotones();
    iniciarJuego();
}

function ocultarBotones() {
    document.getElementById('hit-btn').style.display = 'none';
    document.getElementById('stand-btn').style.display = 'none';
}

function mostrarBotones() {
    document.getElementById('hit-btn').style.display = 'inline';
    document.getElementById('stand-btn').style.display = 'inline';
}

async function iniciarJuego() {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();

    deckId = datos.deck_id;
    jugadorMazo = datos.cards.slice(0, 2);
    maquinaMazo = datos.cards.slice(2, 4);

    mostrarCartasEnMano(jugadorMazo, 'jugador');
    mostrarCartasEnMano([maquinaMazo[0]], 'maquina');
    ocultarSegundaCartaMaquina();
    calcularPuntajes();
    mostrarPuntuacionJugador();
    mostrarRachaJ();
    mostrarRachaM();
}

function ocultarSegundaCartaMaquina() {
    const contenedorMaquina = document.getElementById('maquina-hand');
    const imagenCartaOculta = document.createElement('img');
    imagenCartaOculta.className = 'card';
    imagenCartaOculta.src = 'https://deckofcardsapi.com/static/img/back.png';
    imagenCartaOculta.alt = 'Carta Oculta';
    contenedorMaquina.appendChild(imagenCartaOculta);
}

function mostrarSegundaCartaMaquina() {
    const contenedorMaquina = document.getElementById('maquina-hand');
    contenedorMaquina.removeChild(contenedorMaquina.lastChild); // Remover la carta oculta
    mostrarCartasEnMano(maquinaMazo, 'maquina'); // Mostrar todas las cartas de la máquina
}


async function finalizarJuego() {

        mostrarSegundaCartaMaquina();
        mostrarPuntuaciontotal();

        let resultado = '';
        if (puntajeJugador > 21) {
            resultado = "¡Te has pasado de 21! Has perdido.";
            contador_M += 1
        } else if (puntajeMaquina > 21 || puntajeJugador > puntajeMaquina) {
            resultado = "¡Felicidades! Has ganado.";
            contador_J += 1
        } else if (puntajeJugador < puntajeMaquina) {
            resultado = "La máquina ha ganado.";
            contador_M += 1
        } else {
            resultado = "Empate.";
        }

        mostrarResultado(resultado);
        mostrarRachaJ();
        mostrarRachaM();
    }

function plantarse() {
    ocultarBotones();
    turnoMaquina();
}

function mostrarPuntuacionJugador() {
    const infoJuegoDiv = document.getElementById('info-juego');
    const puntuacionJugadorP = document.getElementById('puntuacion-jugador');

    puntuacionJugadorP.innerHTML = `Puntuación Jugador: ${puntajeJugador}`;
}

function mostrarPuntuaciontotal() {
    const infoJuegoDiv = document.getElementById('info-juego');
    const puntuacionJugadorP = document.getElementById('puntuacion-jugador');
    const puntuacionMaquinaP = document.getElementById('puntuacion-maquina');

    puntuacionJugadorP.innerHTML = `Puntuación Jugador: ${puntajeJugador}`;
    puntuacionMaquinaP.innerHTML = `Puntuación Máquina: ${puntajeMaquina}`;
}

function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<h2>${resultado}</h2>`;
}

async function recibirCarta() {
    if (puntajeJugador < 21) {
        const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await respuesta.json();

        jugadorMazo.push(data.cards[0]);
        mostrarCartasEnMano([data.cards[0]], 'jugador');
        calcularPuntajes(); // Actualizar la puntuación después de recibir una carta
        mostrarPuntuacionJugador();

        if (puntajeJugador === 21) {
            turnoMaquina();
        } else if (puntajeJugador > 21) {
            turnoMaquina(); // Si el jugador se pasa de 21, finalizar el juego inmediatamente
        } else if (puntajeJugador < 21) {
            return;
        }
    }
}

async function turnoMaquina() {
    const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await respuesta.json();
    ocultarBotones()
    maquinaMazo.push(data.cards[0]);
    mostrarCartasEnMano([data.cards[0]], 'maquina');
    calcularPuntajeMaquina(); // Calcular el puntaje de la máquina después de tomar una carta
    mostrarPuntuaciontotal(); // Mostrar la puntuación antes de calcularla
    calcularPuntajeMaquina(); // Calcular el puntaje de la máquina después de tomar una carta

    if (puntajeMaquina === 21 || puntajeMaquina > 21) {
        finalizarJuego();
    } else if (puntajeMaquina < 17 ) {
        turnoMaquina(); // Llamar recursivamente a turnoMaquina para que la máquina tome otro turno si es necesario
    } else if (puntajeMaquina ===  17 || puntajeMaquina > 17 ) {
        finalizarJuego(); // Finalizar el juego si el puntaje de la máquina es igual o mayor que 17
    }
}


function calcularPuntajeMaquina() {
    puntajeMaquina = sumarCartas(maquinaMazo);
}


function sumarCartas(cartas) {
    let total = 0;
    cartas.forEach(carta => {
        total += obtenerValorCarta(carta.value);
    });
    return total;
}

function mostrarCartasEnMano(cartas, jugador) {
    const contenedor = document.getElementById(jugador === 'jugador' ? 'jugador-hand' : 'maquina-hand');
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar las cartas

    cartas.forEach(carta => {
        const elementoCarta = document.createElement('img');
        elementoCarta.className = 'card';
        elementoCarta.src = carta.image;
        elementoCarta.alt = `${carta.value} ${carta.suit}`;
        contenedor.appendChild(elementoCarta);
    });
}

function calcularPuntajes() {
    puntajeJugador = sumarCartas(jugadorMazo);
    puntajeMaquina = sumarCartas(maquinaMazo);
}

function obtenerValorCarta(valor) {
    if (isNaN(valor)) {
        if (valor === 'ACE') {
            return 11; // El as tiene inicialmente un valor de 11
        } else if (['KING', 'QUEEN', 'JACK'].includes(valor)) {
            return 10; // Reina, Rey y Jota valen 10
        } else {
            return parseInt(valor);
        }
    } else {
        return parseInt(valor);
    }
}




document.addEventListener('DOMContentLoaded', iniciarJuego);
document.getElementById('hit-btn').addEventListener('click', recibirCarta);
document.getElementById('stand-btn').addEventListener('click', plantarse);
document.getElementById('reiniciar-btn').addEventListener('click', reiniciarJuego);


