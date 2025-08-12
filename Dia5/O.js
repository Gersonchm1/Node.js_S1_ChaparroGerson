//bien implementadao
class Descuento {
  aplicar(precio) {
    return precio;
  }
}
class DescuentoNavidad extends Descuento {
  aplicar(precio) {
    return precio * 0.9;
  }
}

class DescuentoBlackFriday extends Descuento {
  aplicar(precio) {
    return precio * 0.8;
  }
}

class CalculadoraDescuento {
  constructor(descuento) {
    this.descuento = descuento;
  }
  calcular(precio) {
    return this.descuento.aplicar(precio);
  }
}


const navidad = new CalculadoraDescuento(new DescuentoNavidad());
const blackFriday = new CalculadoraDescuento(new DescuentoBlackFriday());

console.log(navidad.calcular(100));     
console.log(blackFriday.calcular(100));  

//mal implementado

class CalculadoraDescuento {
  calcular(tipo, precio) {
    if (tipo === "navidad") {
      return precio * 0.9; 
    }
    if (tipo === "blackfriday") {
      return precio * 0.8; 
    }
  }
}

const calc = new CalculadoraDescuento();
console.log(calc.calcular("navidad", 100));
console.log(calc.calcular("blackfriday", 100));