function activar(){
    document.getElementById('N_personaje').disabled = false
    document.getElementById('N_actor').disabled = false
    document.getElementById('Edad_a').disabled = false
    document.getElementById('Ubicacion').disabled = false
    document.getElementById('Poster').disabled = false
    document.getElementById('Ubicacion2').disabled = false
    document.getElementById('Productora').disabled = false
    document.getElementById('Guardar').disabled = false
    document.getElementById('+').disabled = false
}
function desactivar(){
    document.getElementById('N_personaje').disabled = true
    document.getElementById('N_actor').disabled = true
    document.getElementById('Edad_a').disabled = true
    document.getElementById('Ubicacion').disabled = true
    document.getElementById('Poster').disabled = true
    document.getElementById('Ubicacion2').disabled = true
    document.getElementById('Productora').disabled = true
    document.getElementById('Guardar').disabled = true
    document.getElementById('+').disabled = true
}
document.body.onload = function() {
    document.getElementById('N_personaje').disabled = true
    document.getElementById('N_actor').disabled = true
    document.getElementById('Edad_a').disabled = true
    document.getElementById('Ubicacion').disabled = true
    document.getElementById('Poster').disabled = true
    document.getElementById('Ubicacion2').disabled = true
    document.getElementById('Productora').disabled = true
    document.getElementById('Guardar').disabled = true
    document.getElementById('+').disabled = true
}

let Heroes = [];

function crearA(){
    let datos = document.querySelectorAll('.datoInput');
    Heroes.push(datos.value);
    console.log([Heroes[0]])
    }
;

function llenatabla(){
    var body = '';
    for(var i = 0; i < Heroes.length ; i++){
        body += '<tr><td>'+(i+1)+'<tr><td>'+Heroes[i]+'<tr><td>';
    }
    document.getElementById('caja1').innerHTML = body;
}