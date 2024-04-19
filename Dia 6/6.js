class A {
    constructor(arg) {
      this.arg = arg;
      console.log(`Constructor de A con argumento: ${arg}`);
    }
  }
  
  class B extends A {
    constructor(arg) {
      const tempArg = arg; // Almacenar el argumento temporalmente
      super(tempArg);
      console.log(`Constructor de B con argumento: ${tempArg}`);
    }
  }
  
  class C extends B {
    constructor(arg) {
      const tempArg = arg; // Almacenar el argumento temporalmente
      super(tempArg);
      console.log(`Constructor de C con argumento: ${tempArg}`);
    }
  }
  
  // Crear una instancia de la clase C
  const instanciaA = new C("qhubo");
  