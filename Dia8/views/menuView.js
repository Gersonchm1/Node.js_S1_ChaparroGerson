// views/menuView.js
const prompt = require('prompt-sync')();

function showMenu() {
    console.log("\n=== CRUD en consola con Node.js ===");
    console.log("1. Crear elemento");
    console.log("2. Listar elementos");
    console.log("3. Actualizar elemento");
    console.log("4. Eliminar elemento");
    console.log("5. Salir\n");

    return prompt("Selecciona una opción: ");
}

function askForName() {
    return prompt("Ingresa un nombre: ");
}

function askForId(message) {
    return parseInt(prompt(message));
}

function showMessage(message) {
    console.log(message);
}

function showItems(items) {
    if (items.length === 0) {
        console.log("No hay elementos.");
    } else {
        console.log(" Lista de elementos ");
        items.forEach(item => console.log(`ID: ${item.id} - Nombre: ${item.nombre}`));
    }
}

module.exports = { showMenu, askForName, askForId, showMessage, showItems };
