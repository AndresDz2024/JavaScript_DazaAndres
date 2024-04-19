class Forma {
    calcularArea() {
      console.log("Método calcularArea() de la clase Forma: Debes implementarlo en las subclases.");
    }
  }
  
  class Círculo extends Forma {
    constructor(radio) {
      super();
      this.radio = radio;
    }
  
    calcularArea() {
      return Math.PI * (this.radio * 2);
    }
  }
  
  class Triángulo extends Forma {
    constructor(base, altura) {
      super();
      this.base = base;
      this.altura = altura;
    }
  
    calcularArea() {
      return (this.base * this.altura) / 2;
    }
  }
  
  const miCírculo = new Círculo(5);
  const áreaCírculo = miCírculo.calcularArea();
  console.log(`Área del círculo: ${áreaCírculo}`);
  
  const miTriángulo = new Triángulo(4, 6);
  const áreaTriángulo = miTriángulo.calcularArea();
  console.log(`Área del triángulo: ${áreaTriángulo}`);
  