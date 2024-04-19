class Rectángulo {
    constructor(ancho, alto) {
      this.ancho = ancho;
      this.alto = alto;
    }
  
    calcularÁrea() {
      return this.ancho * this.alto;
    }
  
    calcularPerímetro() {
      return 2 * (this.ancho + this.alto);
    }
  }
  
  const rectángulo = new Rectángulo(5, 8);
  
  const área = rectángulo.calcularÁrea();
  const perímetro = rectángulo.calcularPerímetro();
  
  console.log(`Área del rectángulo: ${área}`);
  console.log(`Perímetro del rectángulo: ${perímetro}`);
  