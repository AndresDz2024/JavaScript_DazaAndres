class Persona {
    constructor(nombre, edad, país) {
      this.nombre = nombre;
      this.edad = edad;
      this.país = país;
    }
  
    mostrarDetalles() {
      console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}, País: ${this.país}`);
    }
  }
  
  const persona1 = new Persona('Alice', 30, 'EE. UU.');
  const persona2 = new Persona('Bob', 25, 'Canadá');
  
  persona1.mostrarDetalles();
  persona2.mostrarDetalles();
  