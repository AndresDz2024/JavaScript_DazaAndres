let campers = [];
let trainers = [];
let notas = [];

const ingresarNumero = mensaje => {
    let intentos = 3; // Limitamos a 3 intentos
    while (intentos > 0) {
        const valor = parseInt(prompt(mensaje));
        if (!isNaN(valor)) {
            return valor;
        } else {
            alert("Por favor, ingrese un valor numérico.");
            intentos--; // Disminuir el número de intentos
        }
    }
    alert("Has excedido el número de intentos. Saliendo del programa.");
    throw new Error("Exceso de intentos"); // Terminar la ejecución del programa
};

const agregarCamper = () => {
    let nuevoCamper = {
        ID: campers.length + 1,
        N_documento: 0,
        nombre: "",
        apellido: "",
        ciudad: "",
        Direccion: "",
        Acudiente: "",
        N_celular: 0,
        N_fijo: 0,
        Estado: "Inscrito",
        Riesgo: "Sin riesgo"
    };

    nuevoCamper.N_documento = ingresarNumero("Ingrese el número de documento del nuevo camper: ");
    nuevoCamper.nombre = prompt("Ingrese el primer nombre del nuevo camper: ");
    nuevoCamper.apellido = prompt("Ingrese el primer apellido del nuevo camper: ");
    nuevoCamper.ciudad = prompt("Ingrese la ciudad del nuevo camper: ");
    nuevoCamper.Direccion = prompt("Ingrese la Dirección del nuevo camper: ");
    nuevoCamper.Acudiente = prompt("Ingrese El nombre del acudiente del nuevo camper: ");
    nuevoCamper.N_celular = ingresarNumero("Ingrese el número de celular del nuevo camper: ");
    nuevoCamper.N_fijo = ingresarNumero("Ingrese el número de teléfono fijo del nuevo camper: ");

    campers.push(nuevoCamper);
};

const mostrarInfoCampers = () => {
    const ID_camper = parseInt(prompt("Ingrese el ID del Camper que desea ver: "));
    const camperEncontrado = campers.find(camper => camper.ID === ID_camper);
    if (camperEncontrado) {
        const infoMensaje = `Información del Camper con ID ${ID_camper}:\n\nNombre: ${camperEncontrado.nombre} ${camperEncontrado.apellido}\nNúmero de documento: ${camperEncontrado.N_documento}\nCiudad: ${camperEncontrado.ciudad}\nDirección: ${camperEncontrado.Direccion}\nAcudiente: ${camperEncontrado.Acudiente}\nNúmero de celular: ${camperEncontrado.N_celular}\nNúmero de teléfono fijo: ${camperEncontrado.N_fijo}\nEstado: ${camperEncontrado.Estado}\nRiesgo: ${camperEncontrado.Riesgo}`;
        alert(infoMensaje);
    } else {
        alert("No se encontró ningún Camper con ese ID.");
    }
};

const actualizarTrainer = () => {
    const ID_trainer = parseInt(prompt("Ingrese el ID del Trainer que desea actualizar: "));
    const indice = trainers.findIndex(trainer => trainer.ID === ID_trainer);
    if (indice !== -1) {
        const trainer = trainers[indice];
        trainer.N_documento = ingresarNumero("Ingrese el nuevo número de documento: ");
        trainer.nombre = prompt("Ingrese el nuevo primer nombre: ");
        trainer.apellido = prompt("Ingrese el nuevo primer apellido: ");
        trainer.N_celular = ingresarNumero("Ingrese el nuevo número de celular: ");
        trainer.Jornada = prompt("Ingrese la nueva jornada: ");
        alert("Trainer actualizado correctamente.");
    } else {
        alert("No se encontró ningún Trainer con ese ID.");
    }
};

const eliminarTrainer = () => {
    const ID_trainer = parseInt(prompt("Ingrese el ID del Trainer que desea eliminar: "));
    const indice = trainers.findIndex(trainer => trainer.ID === ID_trainer);
    if (indice !== -1) {
        const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al Trainer con ID ${ID_trainer}?`);
        if (confirmacion) {
            trainers.splice(indice, 1);
            alert(`El Trainer con ID ${ID_trainer} ha sido eliminado correctamente.`);
        } else {
            alert("Eliminación cancelada.");
        }
    } else {
        alert("No se encontró ningún Trainer con ese ID.");
    }
};


const actualizarCampers = () => {
    const ID_camper = parseInt(prompt("Ingresa el ID del Camper que quieras actualizar: "));
    const camperIndex = campers.findIndex(camper => camper.ID === ID_camper);

    if (camperIndex !== -1) {
        const camper = campers[camperIndex];
        camper.N_documento = ingresarNumero("Ingresa el nuevo número de documento: ");
        camper.nombre = prompt("Ingresa el nuevo primer nombre: ");
        camper.apellido = prompt("Ingresa el nuevo apellido: ");
        camper.ciudad = prompt("Ingresa la nueva ciudad: ");
        camper.Direccion = prompt("Ingrese la nueva dirección: ");
        camper.Acudiente = prompt("Ingresa el nuevo nombre del acudiente: ");
        camper.N_celular = ingresarNumero("Ingresa el nuevo número de celular: ");
        camper.N_fijo = ingresarNumero("Ingresa el nuevo número de teléfono fijo: ");
        alert("Camper actualizado correctamente:");
    } else {
        alert("No se encontró un camper con ese ID.");
    }
};

const eliminarCamper = () => {
    const ID_camper = parseInt(prompt("Ingrese el ID del Camper que desea eliminar: "));
    const indice = campers.findIndex(camper => camper.ID === ID_camper);
    if (indice !== -1) {
        const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al Camper con ID ${ID_camper}?`);
        if (confirmacion) {
            campers.splice(indice, 1);
            alert(`El Camper con ID ${ID_camper} ha sido eliminado correctamente.`);
        } else {
            alert("Eliminación cancelada.");
        }
    } else {
        alert("No se encontró ningún Camper con ese ID.");
    }
};

const registrarTrainer = () => {
    let nuevoTrainer = {};
    let ultimoId = Math.max(...trainers.map(trainer => trainer.ID), 0);
    let nuevoId = ultimoId + 1;
    nuevoTrainer.ID = nuevoId;
    nuevoTrainer.N_documento = ingresarNumero("Ingrese el número de documento del nuevo trainer: ");
    nuevoTrainer.nombre = prompt("Ingrese el primer nombre del nuevo trainer: ");
    nuevoTrainer.apellido = prompt("Ingrese el primer apellido del nuevo trainer: ");
    nuevoTrainer.N_celular = ingresarNumero("Ingrese el número de celular del nuevo trainer: ");
    nuevoTrainer.Jornada = "No asignado";

    trainers.push(nuevoTrainer);
};

const mostrarInfoTrainers = () => {
    const ID_trainer = parseInt(prompt("Ingrese el ID del trainer que desea ver: "));
    const trainerEncontrado = trainers.find(trainer => trainer.ID === ID_trainer);
    if (trainerEncontrado) {
        const infoMensaje = `Información del trainer con ID ${ID_trainer}:\n\nNombre: ${trainerEncontrado.nombre} \nApellido ${trainerEncontrado.apellido}\nNúmero de documento: ${trainerEncontrado.N_documento}\nNúmero de celular: ${trainerEncontrado.N_celular}\nJornada: ${trainerEncontrado.Jornada}`;
        alert(infoMensaje);
    } else {
        alert("No se encontró ningún trainer con ese ID.");
    }
};

const cambiarJornadaTrainer = () => {
    const ID_trainer = parseInt(prompt("Ingrese el ID del trainer al cual desea asignarle un horario: "));
    const trainer = trainers.find(trainer => trainer.ID === ID_trainer);
    if (trainer) {
        const opcion = prompt("Seleccione la jornada que desea asignar: \n 1. Mañana (6:00 a.m - 2:00 p.m) \n 2. Tarde (2:00 p.m - 10:00 p.m ");
        if (opcion === '1') {
            trainer.Jornada = "Mañana";
            alert("Se ha asignado la jornada 'Mañana' al Trainer.");
        } else if (opcion === '2') {
            trainer.Jornada = "Tarde";
            alert("Se ha asignado la jornada 'Tarde' al Trainer.");
        } else {
            alert("Ingrese una opción válida.");
        }
    } else {
        alert("No se encontró ningún Trainer con ese ID.");
    }
};

// function listarCampersAprobados() {
//     const campersAprobados = campers.filter(camper => camper.Estado === "Aprobado");
//     if (campersAprobados.length > 0) {
//         let infoCampersAprobados = "Campers que pasaron el examen inicial:\n";
//         campersAprobados.forEach(camper => {
//             infoCampersAprobados += `ID: ${camper.ID}, Nombre: ${camper.nombre} ${camper.apellido}\n`;
//         });
//         alert(infoCampersAprobados);
//     } else {
//         alert("No hay campers aprobados.");
//     }
// }

function pruebaInicial() {
    const ID_camper = parseInt(prompt("Ingresa el ID del Camper del cual deseas ingresar la nota de su prueba inicial: "));
    const camper = campers.find(c => c.ID === ID_camper);
    if (!camper) {
        alert("No se encontró ningún Camper con ese ID.");
        return;
    }
    const nota_practica = parseInt(prompt("Ingrese la nota práctica de la prueba inicial: "));
    if (isNaN(nota_practica) || nota_practica < 0 || nota_practica > 100) {
        alert("Nota no válida, ingresa un valor entre 0 y 100.");
        return;
    }
    const nota_teorica = parseInt(prompt("Ingrese la nota teórica de la prueba inicial: "));
    if (isNaN(nota_teorica) || nota_teorica < 0 || nota_teorica > 100) {
        alert("Nota no válida, ingresa un valor entre 0 y 100.");
        return;
    }
    const nota_ingreso = (nota_practica + nota_teorica) / 2;
    if (nota_ingreso >= 60) {
        camper.Estado = "Aprobado";
    } else {
        camper.Estado = "Reprobado";
    }
}

const main = () => {
    while (true) {
        var opcion = parseInt(prompt("Bienvenido usuario, ¿qué deseas hacer el día de hoy?\n 1. Acceder al menú de coordinadores\n 2. Acceder al menú de trainers\n 3. Salir\n Seleccione una opción: "));
        if (!isNaN(opcion)) {
            if (opcion === 1) {
                while (true) {
                    var opcionCoordinador = parseInt(prompt("Menú de coordinadores:\n 1. Agregar nuevo camper\n 2. Mostrar información de campers\n 3. Actualizar información de campers ya registrados\n 4. Eliminar camper\n 5. Registrar notas prueba de admisión\n 6. Volver\n Seleccione una opción:"));
                    if (!isNaN(opcionCoordinador)) {
                        if (opcionCoordinador === 1) {
                            agregarCamper();
                        } else if (opcionCoordinador === 2) {
                            mostrarInfoCampers();
                        } else if (opcionCoordinador === 3) {
                            actualizarCampers();
                        } else if (opcionCoordinador === 4) {
                            eliminarCamper();
                        } else if (opcionCoordinador === 5) {
                            pruebaInicial()
                        } else if (opcionCoordinador === 6) {
                            break;
                        } else {
                            alert("Opción no válida. Intente nuevamente.");
                        }
                    } else {
                        alert("Por favor, ingrese un número válido.");
                        break;
                    }
                }
            } else if (opcion === 2) {
                while (true) {
                    var opcionTrainer = parseInt(prompt("Menú de trainers:\n 1. Agregar nuevo trainer\n 2. Mostrar información de trainers\n 3. Asignar la jornada del trainer\n 4. Actualizar información del trainer\n 5. Eliminar trainer\n 6. Volver\n Seleccione una opción: "));
                    if (!isNaN(opcionTrainer)) {
                        if (opcionTrainer === 1) {
                            registrarTrainer();
                        } else if (opcionTrainer === 2) {
                            mostrarInfoTrainers();
                        } else if (opcionTrainer === 3) {
                            cambiarJornadaTrainer()
                        } else if (opcionTrainer === 4) {
                            actualizarTrainer();
                        } else if (opcionTrainer === 5) {
                            eliminarTrainer();
                        } else if (opcionTrainer === 6) {
                            break;
                        } else {
                            alert("Opción no válida. Intente nuevamente.");
                        }
                    } else {
                        alert("Por favor, ingrese un número válido.");
                        break;
                    }
                }
            } else if (opcion === 3) {
                alert("¡Gracias por usar el programa! ¡Hasta luego!");
                break;
            } else {
                alert("Opción no válida. Intente nuevamente.");
            }
        } else {
            alert("Por favor, ingrese un número válido.");
        }
    }
};

main();

