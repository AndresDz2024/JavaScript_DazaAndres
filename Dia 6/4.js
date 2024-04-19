class CuentaBancaria {
    constructor(numeroCuenta, saldoInicial = 0) {
      this.numeroCuenta = numeroCuenta;
      this.saldo = saldoInicial;
    }
  
    depositar(monto) {
      this.saldo += monto;
      console.log(`Se depositaron ${monto} unidades. Saldo actual: ${this.saldo}`);
    }
  
    retirar(monto) {
      if (monto > this.saldo) {
        console.log('Fondos insuficientes.');
      } else {
        this.saldo -= monto;
        console.log(`Se retiraron ${monto} unidades. Saldo actual: ${this.saldo}`);
      }
    }
  }
  
  const cuenta1 = new CuentaBancaria('123456789');
  const cuenta2 = new CuentaBancaria('987654321', 1000);
  
  cuenta1.depositar(500);
  cuenta2.depositar(200);
  
  cuenta1.retirar(200);
  cuenta2.retirar(1500);
  