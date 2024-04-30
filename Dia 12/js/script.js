const API_URL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=4';

let jugadorMazo = [];
let maquinaMazo = [];
let puntajeJugador = 0;
let puntajeMaquina = 0;
let deckId = null;

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
    contenedorMaquina.removeChild(contenedorMaquina.lastChild);
    mostrarCartasEnMano([maquinaMazo[1]], 'maquina');
}

async function finalizarJuego() {
    mostrarSegundaCartaMaquina();
    mostrarPuntuacion();

    let resultado = '';
    if (puntajeJugador > 21) {
        resultado = "¡Te has pasado de 21! Has perdido.";
    } else if (puntajeMaquina > 21 || puntajeJugador > puntajeMaquina) {
        resultado = "¡Felicidades! Has ganado.";
    } else if (puntajeJugador < puntajeMaquina) {
        resultado = "La máquina ha ganado.";
    } else {
        resultado = "Empate.";
    }

    mostrarResultado(resultado);
    mostrarSegundaCartaMaquina()

    if (puntajeJugador <= 21) {
        await turnoMaquina();
    }
}

async function recibirCarta() {
    if (puntajeJugador < 21) {
        const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await respuesta.json();

        jugadorMazo.push(data.cards[0]);
        mostrarCartasEnMano([data.cards[0]], 'jugador');
        mostrarPuntuacion();
        calcularPuntajes();

        if (puntajeJugador === 21) {
            finalizarJuego();
        } else if (puntajeJugador > 21) {
            mostrarResultado("¡Te has pasado de 21! Has perdido.");
            mostrarSegundaCartaMaquina()
        } else {
            turnoMaquina();
        }
    }
}

function plantarse() {
    finalizarJuego();
    turnoMaquina();
}

function mostrarPuntuacion() {
    const infoJuegoDiv = document.getElementById('info-juego');
    infoJuegoDiv.innerHTML = `<p>Puntuación Jugador: ${puntajeJugador}</p><p>Puntuación Máquina: ${puntajeMaquina}</p>`;
}

function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<h2>${resultado}</h2>`;
}

async function turnoMaquina() {
    if (puntajeMaquina < 17) {
        const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await respuesta.json();

        maquinaMazo.push(data.cards[0]);
        mostrarCartasEnMano([data.cards[0]], 'maquina');
        calcularPuntajes();
        mostrarPuntuacion();

        if (puntajeMaquina === 21 || puntajeMaquina > 21) {
            finalizarJuego();
        } else {
            // Detener el turno después de tomar una carta
            return;
        }
    } else {
        finalizarJuego();
    }
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
            return 11; // El as puede tener un valor de 11
        } else if (valor === 'KING' || valor === 'QUEEN' || valor === 'JACK') {
            return 10; // Las cartas de figuras (rey, reina, jota) tienen un valor de 10
        } else {
            return 10; // Otras cartas de figuras tienen un valor de 10
        }
    } else {
        return parseInt(valor);
    }
}

document.addEventListener('DOMContentLoaded', iniciarJuego);
document.getElementById('hit-btn').addEventListener('click', recibirCarta);
document.getElementById('stand-btn').addEventListener('click', plantarse);
