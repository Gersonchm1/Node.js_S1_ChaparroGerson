//bien implementadao
class Impresora {
  imprimir() {}
}

class Escaner {
  escanear() {}
}



//mal implementado
class MultiFunciones {
  imprimir() {}
  escanear() {}
  enviarFax() {}
}

class ImpresoraBasica extends MultiFunciones {
  enviarFax() { throw new Error("No tengo fax"); }
}
