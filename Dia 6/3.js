class Vehículo {
    constructor(marca, modelo, año) {
      this.marca = marca;
      this.modelo = modelo;
      this.año = año;
    }
  
    mostrarDetalles() {
      console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.año}`);
    }
  }
  
  class Coche extends Vehículo {
    constructor(marca, modelo, año, numPuertas) {
      super(marca, modelo, año);
      this.numPuertas = numPuertas;
    }
  
    mostrarDetalles() {
      super.mostrarDetalles();
      console.log(`Número de puertas: ${this.numPuertas}`);
    }
  }
  
  const miCoche = new Coche('Toyota', 'Corolla', 2022, 4);
  
  miCoche.mostrarDetalles();
  