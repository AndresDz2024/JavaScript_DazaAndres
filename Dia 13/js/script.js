document.body.onload = function() {
    const camposEntrada = document.querySelectorAll('.datoInput');
    const registroDiv = document.querySelector('.registro');
    const tablaHeroes = document.querySelector('table');
    camposEntrada.forEach(function(elemento) {
        elemento.disabled = true;
    });
    registroDiv.style.display = 'none';
    tablaHeroes.style.display = 'none';
    addButton.disabled = true;
    saveHeroButton.disabled = true;
}

document.addEventListener("DOMContentLoaded", function() {
    const N_personaje = document.getElementById('N_personaje');
    const N_actor = document.getElementById('N_actor');
    const Edad_a = document.getElementById('Edad_a');
    const Ubicacion = document.getElementById('Ubicacion');
    const Poster = document.getElementById('Poster');
    const Ubicacion2 = document.getElementById('Ubicacion2');
    const Productora = document.getElementById('Productora');
    const addButton = document.getElementById('addButton');
    const newHeroButton = document.getElementById('newHeroButton');
    const saveHeroButton = document.getElementById('saveHeroButton');
    const cancelButton = document.getElementById('cancelButton');
    const showHeroButton = document.getElementById('showHero');
    const deleteHero = document.getElementById('deleteHero');
    const updateHero = document.getElementById('updateHero');
    const heroTableBody = document.getElementById('heroTableBody');
    const registroDiv = document.querySelector('.registro');
    const tablaHeroes = document.querySelector('table');

    let Heroes = [];

    function activarCampos() {
        const camposEntrada = document.querySelectorAll('.datoInput');
        camposEntrada.forEach(function(elemento) {
            elemento.disabled = false;
        });
        addButton.disabled = false;
        saveHeroButton.disabled = false;
        registroDiv.style.display = 'block';
    }

    function desactivarCampos() {
        const camposEntrada = document.querySelectorAll('.datoInput');
        camposEntrada.forEach(function(elemento) {
            elemento.disabled = true;
        });
        addButton.disabled = true;
        saveHeroButton.disabled = true;
        registroDiv.style.display = 'none';
        tablaHeroes.style.display = 'none';
    }

    function limpiarCampos() {
        const campos = [N_personaje, N_actor, Edad_a, Ubicacion, Poster, Ubicacion2];
        campos.forEach(function(elemento) {
            elemento.value = '';
        });
        Productora.value = 'Marvel';
        tablaHeroes.style.display = 'none';

    }

    function agregarHeroe() {
        const nuevoHeroe = {
            N_personaje: N_personaje.value,
            N_actor: N_actor.value,
            Edad_a: Edad_a.value,
            Ubicacion: Ubicacion.value,
            Poster: Poster.value,
            Ubicacion2: Ubicacion2.value,
            Productora: Productora.value
        };
        Heroes.push(nuevoHeroe);
        limpiarCampos();
        desactivarCampos();
    }

    function mostrarHeroeEncontrado(heroe) {
        tablaHeroes.style.display = 'block';
        heroTableBody.innerHTML = '';
        const row = `
            <tr>
                <td>${heroe.N_personaje}</td>
                <td>${heroe.N_actor}</td>
                <td>${heroe.Edad_a}</td>
                <td>${heroe.Ubicacion}</td>
                <td>${heroe.Poster}</td>
                <td>${heroe.Ubicacion2}</td>
                <td>${heroe.Productora}</td>
            </tr>
        `;
        heroTableBody.innerHTML = row;
        tablaHeroes.style.display = 'block';

    }
    
    function buscarHeroe(criterio) {
        let heroeEncontrado = null;
        heroeEncontrado = Heroes.find(hero => hero.N_personaje.toLowerCase() === criterio.toLowerCase());
    
        if (heroeEncontrado) {
            alert("Se encontró un Heroe con ese nombre");
            mostrarHeroeEncontrado(heroeEncontrado);
        } else {
            alert("No se encontró un Heroe con ese nombre");
        }
    }

    function eliminarHeroe(nombreHeroe) {
        Heroes = Heroes.filter(heroe => heroe.N_personaje !== nombreHeroe);
        tablaHeroes.style.display = 'none';
    }

    function BuscarEliminar(criterio) {
        let EliminarH = Heroes.find(hero => hero.N_personaje.toLowerCase() === criterio.toLowerCase());

        if (EliminarH) {
            const confirmacion = confirm(`¿Estás seguro de que quieres eliminar a ${EliminarH.N_personaje}?`);
            if (confirmacion) {
                eliminarHeroe(EliminarH.N_personaje);
            }
        } else {
            alert("No se encontró un Héroe con ese nombre");
        }
    }

    function actualizarHeroe(nombreHeroe) {
        let heroeEncontrado = null;
        heroeEncontrado = Heroes.find(hero => hero.N_personaje.toLowerCase() === nombreHeroe.toLowerCase());
        if (heroeEncontrado) {
            const nuevoNombre = prompt("Ingrese el nombre del héroe:");
            const nuevoActor = prompt("Ingrese el nombre del actor:");
            const nuevaEdad = prompt("Ingrese la edad del actor:");
            const nuevaUbicacion = prompt("Ingrese la nueva ubicación:");
            const nuevoPoster = prompt("Ingrese el nuevo poster:");
    
            if (nuevoNombre && nuevoActor && nuevaEdad && nuevaUbicacion && nuevoPoster) {
                heroeEncontrado.N_personaje = nuevoNombre;
                heroeEncontrado.N_actor = nuevoActor;
                heroeEncontrado.Edad_a = nuevaEdad;
                heroeEncontrado.Ubicacion = nuevaUbicacion;
                heroeEncontrado.Poster = nuevoPoster;
                alert(`El héroe ${nombreHeroe} ha sido actualizado correctamente.`);
            } else {
                alert("Por favor, complete todos los campos.");
            }
        } else {
            alert(`No se encontró un héroe con el nombre ${nombreHeroe}.`);
        }
    }
    

    showHeroButton.addEventListener('click', function() {
        desactivarCampos();
        const criterio = prompt("Ingrese el nombre del héroe:");
        if (criterio) {
            buscarHeroe(criterio);
        }
    });

    newHeroButton.addEventListener('click', activarCampos);
    cancelButton.addEventListener('click', function() {
        desactivarCampos();
        limpiarCampos();
    });
    saveHeroButton.addEventListener('click', agregarHeroe, desactivarCampos);
    deleteHero.addEventListener('click', function() {
        const criterio = prompt("Ingrese el nombre del héroe que desea eliminar:");
        if (criterio) {
            BuscarEliminar(criterio);
        }
        desactivarCampos();
        limpiarCampos();
    });
    updateHero.addEventListener('click', function() {
        const nombreHeroe = prompt("Ingrese el nombre del héroe que desea actualizar:");
        if (nombreHeroe) {
            actualizarHeroe(nombreHeroe);
        }
        desactivarCampos();
        limpiarCampos();
    });
});