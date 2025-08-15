// controllers/itemController.js
const { loadData, saveData } = require('../models/itemModel');
const view = require('../views/menuView');

function createItem() {
    const nombre = view.askForName();
    const id = Date.now();
    const data = loadData();
    data.push({ id, nombre });
    saveData(data);
    view.showMessage("Elemento agregado correctamente.");
}

function listItems() {
    const data = loadData();
    view.showItems(data);
}

function updateItem() {
    const data = loadData();
    const id = view.askForId("Ingresa el ID del elemento a actualizar: ");
    const item = data.find(i => i.id === id);

    if (!item) {
        view.showMessage("Elemento no encontrado.");
        return;
    }

    const nuevoNombre = view.askForName();
    item.nombre = nuevoNombre;
    saveData(data);
    view.showMessage("Elemento actualizado.");
}

function deleteItem() {
    let data = loadData();
    const idEliminar = view.askForId("Ingresa el ID del elemento a eliminar: ");
    const nuevaData = data.filter(item => item.id !== idEliminar);

    if (nuevaData.length === data.length) {
        view.showMessage("Elemento no encontrado.");
        return;
    }

    saveData(nuevaData);
    view.showMessage("Elemento eliminado.");
}

module.exports = { createItem, listItems, updateItem, deleteItem };
