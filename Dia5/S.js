//bien implementadao
class Usuario {
  crear(nombre) {
    console.log(`Usuario ${nombre} creado`);
  }
}

class Correo {
  enviar(nombre) {
    console.log(`Enviando correo a ${nombre}`);
  }
}

const usuario = new Usuario();
const correo = new Correo();

usuario.crear("Ana");
correo.enviar("Ana");

//mal implementado
class Usuario {
  crear(nombre) {
    console.log(`Usuario ${nombre} creado`);
    console.log(`Enviando correo a ${nombre}`);
  }
}

new Usuario().crear("Ana");
