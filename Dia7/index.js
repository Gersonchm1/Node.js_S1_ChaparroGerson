const prompt= require('prompt-sync')();//Entradas por consola
const path = "./db.json";//Direccionar hacia la base de datos
const fs= require('fs');//Manejo de Archivos Locales

//Modularización de Carga de la Data
function loadData(){
    if(!fs.existsSync(path)){
        fs.writeFileSync(path,"[]");
    };// Creo el archivo con data si no existe.
    const data = fs.readFileSync(path);//Cargo y Guardo la data en una variable
    return JSON.parse(data);//Retorno la data en formato JSON
}
function saveData(data){
    fs.writeFileSync(path,JSON.stringify(data));
}
function showMenu() {
  console.log("\n=== CRUD en consola con Node.js ===");
  console.log("1. Crear elemento");
  console.log("2. Listar elementos");
  console.log("3. Actualizar elemento");
  console.log("4. Eliminar elemento");
  console.log("5. Salir\n");

  let opcionUsuario = prompt("Selecciona una opción: ");
  return opcionUsuario;
}

function handleMenu(option) {
  switch (option) {
    case "1":
      createItem();
      break;
    case "2":
      listItems();
      break;
    case "3":
      updateItem();
      break;
    case "4":
      deleteItem();
      break;
    case "5":
      booleanito = false;
    default:
      console.log("Opción inválida.");
  }
}

function createItem(){
    let nombre = prompt("Ingresa un nombre: ");
    const id = Date.now();// ID Unico (Paso de milisegundos desde el 1 de Enero de 1970)
    const data = loadData();
    data.push({
        id,nombre
    });
    console.log(data);
    saveData(data);
    console.log("El elemento fue agregado!");
    showMenu();
}
let booleanito = true;

while(booleanito){
    let opcionUsuario= showMenu();
    handleMenu(opcionUsuario);
}

function listItems() {
  const data = loadData();

  if (data.length === 0) {
      console.log("No hay elementos.");
  } else {
      console.log(" Lista de elementos ");
      data.forEach(item => console.log(`ID: ${item.id} - Nombre: ${item.nombre}`));
  }
}
function updateItem(){
  let nuevaCalificaion= prompt("ingresa el nombre  para el nuevo camper")
  const data= loadData();
}
function updateItem() {
    const data = loadData();

    const id = parseInt(prompt("Ingresa el ID del elemento a actualizar: "));

    const item = data.find(i => i.id === id);

    if (!item) {
        console.log("Elemento no encontrado.");
        return;
    }

    const nuevoNombre = prompt("Nuevo nombre: ");

    item.nombre = nuevoNombre;

    saveData(data);

    console.log("Elemento actualizado.");
}

function deleteItem() {
  let data = loadData();

  const idEliminar = parseInt(prompt("Ingresa el ID del elemento a eliminar: "));

  const nuevaData = data.filter(item => item.id !== idEliminar);

  if (nuevaData.length === data.length) {
      console.log("Elemento no encontrado.");
      return; 
  }

  saveData(nuevaData);

  console.log("Elemento eliminado.");
}
