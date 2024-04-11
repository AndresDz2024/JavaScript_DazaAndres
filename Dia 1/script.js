function convertir(Celsius) {
    F = (9*Celsius/5) + 32
    return F
}

var Celsius = prompt("Ingrese los grados celsius: ")

console.log( "los grados C son: ", convertir(Celsius), "grados F")