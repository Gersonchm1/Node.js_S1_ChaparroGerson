const { MongoClient } = require('mongodb');
const readline = require('readline');

const uri = "mongodb+srv://gersonchaparromartinez:BDOfebjH8lDtoNYO@cluster0.hg3f88l.mongodb.net/";
const client = new MongoClient(uri);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let db; 

async function connectToDb() {
    try {
        await client.connect();
        console.log(" Conectado a MongoDB Atlas.");
        db = client.db("BASE");
    } catch (error){ console.error  (" Error al conectar a MongoDB:", error)}
}


async function buscarEstudiante(nombre) {
    const estudiantesCollection = db.collection("estudiantes"); // Reemplaza "estudiantes" con el nombre de tu colección
    return await estudiantesCollection.findOne({ nombre: { $regex: new RegExp(`^${nombre}$`, 'i') } });
}


async function mostrarMenuPrincipal() {
    rl.question(
        "\nSelecciona una opción:\n1. Camper\n2. Trainer\n3. Coordinador\n0. Salir\n> ",
        async (opcion) => {
            switch (opcion) {
                case '1': await mostrarSubMenuCamper(); break;
                case '2': await mostrarSubMenuTrainer(); break;
                case '3': await mostrarSubMenuCoordinador(); break;
                case '0':
                    console.log(" Saliendo del programa.");
                    await client.close(); 
                    rl.close();
                    break;
                
            }
        }
    );
}

async function mostrarSubMenuCamper() {
    rl.question(
        "\nCamper:\n1. Ver mi información\n2. Ver mi horario\n3. Ver mis grupos\n4. Ver mis calificaciones\n0. Volver al menú\n> ",
        async (opcion) => {
            if (opcion === '0') {
                await mostrarMenuPrincipal();
                return;
            }
            rl.question("Ingresa tu nombre para ver la información: ", async (nombre) => {
                const camper = await buscarEstudiante(nombre);
                if (!camper) {
                    console.log(" Camper no encontrado.");
                    await mostrarSubMenuCamper();
                    return;
                }

                switch (opcion) {
                    case '1':
                        console.log("\n--- Información del Camper ---");
                        console.log(` Nombre: ${camper.nombre}`);
                        console.log(` Edad: ${camper.edad}`);
                        console.log(` Estado: ${camper.estado}`);
                        console.log(` Skills: ${camper.skills.join(", ")}`);
                        console.log(` Teléfono: ${camper.telefono}`);
                        console.log(` Dirección: ${camper.direccion}`);
                        console.log(` Grupo: ${camper.grupo}`);
                        console.log(` Calificacion: ${camper.calificacion}`);
                        break;
                    case '2':
                        console.log(` El horario de ${camper.horario} `);
                        break;
                    case '3':
                        console.log(` ${camper.nombre} pertenece al grupo: ${camper.grupo}`);
                        break;
                    case '4':
                        console.log(` La calificación de ${camper.nombre} es: ${camper.calificacion}`);
                        break;
                    
                }
                await mostrarSubMenuCamper();
            });
        }
    );
}

async function mostrarSubMenuTrainer() {
    rl.question(
        "\nTrainer:\n1. Ver información de estudiante\n2. Asignar notas a estudiante\n3. Asignar grupo a estudiante\n0. Volver al menú\n> ",
        async (opcion) => {
            if (opcion === '0') {
                await mostrarMenuPrincipal();
                return;
            }

            const estudiantesCollection = db.collection("estudiantes");

            rl.question("Ingresa el nombre del estudiante: ", async (nombre) => {
                const estudiante = await buscarEstudiante(nombre);
                if (!estudiante) {
                    console.log(" Estudiante no encontrado.");
                    await mostrarSubMenuTrainer();
                    return;
                }

                switch (opcion) {
                    case '1':
                        console.log("\n--- Información del Estudiante ---");
                        console.log(` Nombre: ${estudiante.nombre}`);
                        console.log(` Edad: ${estudiante.edad}`);
                        console.log(` Calificación: ${estudiante.calificacion}`);
                        console.log(` Grupo: ${estudiante.grupo}`);
                        break;
                    case '2':
                        rl.question(`Ingresa la nueva calificación para ${estudiante.nombre}: `, async (nuevaCalificacion) => {
                            await estudiantesCollection.updateOne(
                                { _id: estudiante._id },
                                { $set: { calificacion: parseFloat(nuevaCalificacion) } }
                            );
                            console.log(` Calificación de ${estudiante.nombre} actualizada a: ${nuevaCalificacion}`);
                            await mostrarSubMenuTrainer();
                        });
                        return;
                    case '3':
                        rl.question(`Ingresa el nuevo grupo para ${estudiante.nombre}: `, async (nuevoGrupo) => {
                            await estudiantesCollection.updateOne(
                                { _id: estudiante._id },
                                { $set: { grupo: nuevoGrupo } }
                            );
                            console.log(` Grupo de ${estudiante.nombre} actualizado a: ${nuevoGrupo}`);
                            await mostrarSubMenuTrainer();
                        });
                        return;
                    
                }
                await mostrarSubMenuTrainer();
            });
        }
    );
}


async function mostrarSubMenuCoordinador() {
    rl.question(
        "\nCoordinador:\n1. Añadir estudiante\n0. Volver al menú\n> ",
        async (opcion) => {
            if (opcion === '0') {
                await mostrarMenuPrincipal();
                return;
            }

            
        }
    );
}


async function main() {
    await connectToDb(); 
    await mostrarMenuPrincipal();
}


main();