// app.js
const view = require('./views/menuView');
const controller = require('./controllers/itemController');

let running = true;

while (running) {
    const opcion = view.showMenu();

    switch (opcion) {
        case "1":
            controller.createItem();
            break;
        case "2":
            controller.listItems();
            break;
        case "3":
            controller.updateItem();
            break;
        case "4":
            controller.deleteItem();
            break;
        case "5":
            running = false;
            break;
        default:
            view.showMessage("Opción inválida.");
    }
}
