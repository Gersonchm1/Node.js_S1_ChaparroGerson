class ItemController{
    constructor({model,view,prompt}){
        this.model=model;
        this.view=view;
        this.prompt = prompt
    }
    crear(){
        const datos = this.view.pedirDatosCreacion(this.prompt);
        if(!datos.nombre){
            this.view.mostrarMensaje("El nombre es obligatorio.");
            return;
        }
        if(!datos.descripcion){
            this.view.mostrarMensaje("La descripcion es obligatoria.");
            return;
        }
        const creado = this.model.crear(datos);
        this.view.mostrarMensaje(`Creado con ID ${creado.id}.`);
    }
    listar(){
        const items = this.model.listar();
        if(items.length === 0){
            this.view.mostrarMensaje("No hay items registrados.");
            return;
        }
        this.view.mostrarMensaje("Lista ");
        for(const item of items){
            console.log(`ID: ${item.id}  Nombre: ${item.nombre}  Descripción: ${item.descripcion}`);
        }
    }
    verPorId(){
        const id = this.prompt("Ingrese el id: ").trim();
        const item = this.model.buscarPorId(id);
        if(!item){
            this.view.mostrarMensaje("No se encontró un item con ese id.");
            return;
        }
        this.view.mostrarMensaje(" Item encontrado ");
        console.log(`ID: ${item.id}`);
        console.log(`Nombre: ${item.nombre}`);
        console.log(`Descripción: ${item.descripcion}`);
        console.log(`Creado en: ${item.creadoEn}`);
        console.log(`Actualizado en: ${item.actualizadoEn}`);
    }
    actualizar(){
        const id = this.prompt("Ingrese el id del item a actualizar: ").trim();
        const item = this.model.buscarPorId(id);
        if(!item){
            this.view.mostrarMensaje("No se encontró un item con ese id.");
            return;
        }

        const nombre = this.prompt(`nombre (${item.nombre}): `).trim();
        const descripcion = this.prompt(`descripción (${item.descripcion}): `).trim();

        const actualizado = this.model.actualizar(id, {
            nombre: nombre || item.nombre,
            descripcion: descripcion || item.descripcion
        });

        this.view.mostrarMensaje(`Item con id ${actualizado.id} actualizado.`);
    }
    eliminar(){
        const id = this.prompt("Ingrese el id del item a eliminar: ").trim();
        const exito = this.model.eliminar(id);
        if(exito){
            this.view.mostrarMensaje(`Item con id ${id} eliminado correctamente.`);
        } else {
            this.view.mostrarMensaje("No se encontró un item con ese id.");
        }
    }
    
}
module.exports={ItemController};

