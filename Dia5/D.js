//bien implementadao

class Servicio {
  constructor(baseDatos) {
    this.db = baseDatos; // Inyectamos la dependencia
  }
}

class MySQL {}
class MongoDB {}

const servicio1 = new Servicio(new MySQL());
const servicio2 = new Servicio(new MongoDB());

//mal implementado

class Servicio {
  constructor() {
    this.db = new MySQL(); // Dependencia fija
  }
}
