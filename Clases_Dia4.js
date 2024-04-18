class Carro {
    constructor(marca, modelo, color) {
      this.marca = marca;
      this.modelo = modelo;
      this.color = color;
      this.velocidad = 0;
    }
  
    acelerar(incremento) {
      this.velocidad += incremento;
      console.log(`El ${this.marca} ${this.modelo} acelera a ${this.velocidad} km/h.`);
    }
  
    frenar(decremento) {
      this.velocidad -= decremento;
      console.log(`El ${this.marca} ${this.modelo} frena a ${this.velocidad} km/h.`);
    }
  
    obtenerInformacion() {
      return `Marca: ${this.marca}, Modelo: ${this.modelo}, Color: ${this.color}, Velocidad: ${this.velocidad} km/h`;
    }
}
  
const miCarro = new Carro("Toyota", "Corolla", "Rojo");
  miCarro.acelerar(50);
  miCarro.frenar(20);
  console.log(miCarro.obtenerInformacion());

  
class Persona {
    constructor(nombre, edad, genero) {
      this.nombre = nombre;
      this.edad = edad;
      this.genero = genero;
}
  
presentarse() {
      console.log(`Hola, soy ${this.nombre}, tengo ${this.edad} años y soy ${this.genero}.`);
}
  
cumplirAnios() {
      this.edad++;
      console.log(`¡Feliz cumpleaños! Ahora tengo ${this.edad} años.`);
}
  
cambiarNombre(nuevoNombre) {
      this.nombre = nuevoNombre;
      console.log(`Me llamo ${this.nombre} ahora.`);
}
  
obtenerInformacion() {
    return `Nombre: ${this.nombre}, Edad: ${this.edad}, Género: ${this.genero}`;
}
}
  
const persona1 = new Persona("Juan", 30, "masculino");
  persona1.presentarse();
  persona1.cumplirAnios();
  persona1.cambiarNombre("Carlos");
  console.log(persona1.obtenerInformacion());

  
class Libro {
constructor(titulo, autor, genero, numPaginas) {
      this.titulo = titulo;
      this.autor = autor;
      this.genero = genero;
      this.numPaginas = numPaginas;
      this.estadoLectura = "No leído";
}
  
empezarLectura() {
      this.estadoLectura = "Leyendo";
      console.log(`Comenzaste a leer ${this.titulo} de ${this.autor}.`);
}
  
terminarLectura() {
      this.estadoLectura = "Leído";
      console.log(`Has terminado de leer ${this.titulo}.`);
}
  
 obtenerInformacion() {
      return `Título: ${this.titulo}, Autor: ${this.autor}, Género: ${this.genero}, Páginas: ${this.numPaginas}, Estado: ${this.estadoLectura}`;
    }
}
  
const miLibro = new Libro("Cien años de soledad", "Gabriel García Márquez", "Realismo mágico", 432);
  miLibro.empezarLectura();
  miLibro.terminarLectura();
  console.log(miLibro.obtenerInformacion());

class Numero {
    constructor(valor) {
      this.valor = valor;
    }
  
    sumar(numero) {
      this.valor += numero;
      return this.valor;
    }
  
    restar(numero) {
      this.valor -= numero;
      return this.valor;
    }
  
    multiplicar(numero) {
      this.valor *= numero;
      return this.valor;
    }
  
    dividir(numero) {
      if (numero === 0) {
        return "Error: No se puede dividir por cero";
      }
      this.valor /= numero;
      return this.valor;
    }
  
    elevarPotencia(exponente) {
      this.valor **= exponente;
      return this.valor;
    }
  
    obtenerValor() {
      return this.valor;
    }
}
  
const numero = new Numero(10);
  console.log("Número actual:", numero.obtenerValor());
  console.log("Suma:", numero.sumar(5));
  console.log("Resta:", numero.restar(3));
  console.log("Multiplicación:", numero.multiplicar(4));
  console.log("División:", numero.dividir(2));
  console.log("Potencia:", numero.elevarPotencia(3));

class FuncionMatematica {
    constructor(funcion) {
      this.funcion = funcion;
    }
  
    evaluar(x) {
      return eval(this.funcion.replace("x", x));
    }
  
    calcularDerivada() {
      // Implementación básica para una derivada numérica
      const h = 0.0001;
      const funcionDerivada = `((${this.funcion.replace("x", `(x + ${h})`)} - ${this.funcion}) / ${h})`;
      return new FuncionMatematica(funcionDerivada);
    }
  
    calcularIntegral(a, b) {
      // Implementación básica para una integral numérica
      const n = 10000; // número de intervalos
      const h = (b - a) / n;
      let integral = 0;
      for (let i = 0; i < n; i++) {
        integral += eval(this.funcion.replace("x", a + (i + 0.5) * h));
      }
      return integral * h;
    }
}
  
  // Ejemplo de uso
const funcion = new FuncionMatematica("x^2 + 2*x + 1");
  
  console.log("Valor de la función en x=2:", funcion.evaluar(2));
  console.log("Derivada de la función:", funcion.calcularDerivada().funcion);
  console.log("Integral de la función de x=0 a x=2:", funcion.calcularIntegral(0, 2));
    