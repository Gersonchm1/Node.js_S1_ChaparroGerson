//bien implementadao

class Ave {}
class AveVoladora extends Ave {
  volar() { console.log("Volando"); }
}

class Pinguino extends Ave {
  nadar() { console.log("Nadando"); }
}

new AveVoladora().volar();
new Pinguino().nadar();

//mal implementado
class Ave {
  volar() { console.log("Volando"); }
}

class Pinguino extends Ave {
  volar() { throw new Error("no estoy echo para volar pipipi"); }
}
