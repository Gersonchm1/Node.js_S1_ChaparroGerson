const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://gersonchaparromartinez:BDOfebjH8lDtoNYO@cluster0.hg3f88l.mongodb.net/";
const client = new MongoClient(uri);
let db; 

// #############################################################################################################################################
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// ##########################################################################################################################################33

async function connectToDb() {
    try {
        await client.connect();
        console.log(" Conectado a MongoDB Atlas.");
        db = client.db("Campus");
    } catch (error){ console.error  (" Error al conectar a MongoDB:", error)}
}

// #############################################################################################################################################
async function buscarEstudiante(id) {
    const estudiantesCollection = db.collection("camper"); // Reemplaza "estudiantes" con el nombre de tu colección
    
    return await estudiantesCollection.findOne({ id_camper: Number(id) });
}

// #############################################################################################################################################

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
// #############################################################################################################################################
async function mostrarSubMenuCamper() {
    rl.question(
        "\nCamper:\n1. Ver mi información\n2. Ver mi horario\n3. Ver mi estado\n4. Ver mis calificaciones\n5 .ver mi ruta\n0. Volver al menú\n> ",
        async (opcion) => {
            if (opcion === '0') {
                await mostrarMenuPrincipal();
                return;
            }
            rl.question("Ingresa tu ID para ver la información: ", async (id) => {
                const camper = await buscarEstudiante(id);
                if (!camper) {
                    console.log(" Camper no encontrado.");
                    await mostrarSubMenuCamper();
                    return;
                }

                switch (opcion) {
                    case '1':
                        console.log("\n--- Información del Camper ---");
                        console.log(` Id_camper: ${camper.id_camper}`);
                        console.log(` Nombre: ${camper.nombre}`);
                        console.log(` apellido: ${camper.apellido}`);
                        console.log(` Edad: ${camper.edad}`);
                        console.log(` Email: ${camper.email}`);
                        break;
                    case '2':
                        console.log(` El horario de ${camper.horario} `);
                        break;
                    case '3':
                        console.log(` ${camper.nombre} tiene estado: ${camper.estado}`);
                        break;
                    case '4':
                        console.log(` La calificación de ${camper.nombre} es: ${camper.calificacion}`);
                        break;
                    case '5':
                        console.log(` La ruta de ${camper.nombre} es: ${camper.ruta}`);
                        break;
                    
                }
                await mostrarSubMenuCamper();
            });
        }
    );
}

// #############################################################################################################################################

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer));
    });
}

async function mostrarSubMenuTrainer() {
    rl.question(
        "\nTrainer:\n1. Ver información de estudiante\n2. Asignar notas a estudiante\n3. Ver mis grupos\n4. Ver mi horario\n0. Volver al menú principal\n> ",
        async (option) => {
            const studentsCollection = db.collection("camper");
            const trainersCollection = db.collection("trainers");

            switch (option) {
                case '0':
                    await mostrarMenuPrincipal();
                    return;

                case '1': {
                    const id = await ask("Ingresa el ID del estudiante: ");
                    const student = await buscarEstudiante(id);
                    
                    if (!student) {
                        console.log(" Estudiante no encontrado.");
                    } else {
                        console.log("\n Información del estudiante:");
                        console.log(` ID: ${student.id_camper}`);
                        console.log(` Nombre: ${student.nombre} ${student.apellido}`);
                        console.log(` Edad: ${student.edad}`);
                        console.log(` Correo: ${student.email}`);
                        console.log(` Horario: ${student.horario}`);
                        console.log(`Grupo: ${student.grupo}`);
                        console.log(`Ruta: ${student.ruta}`);
                        console.log(`Calificación: ${student.calificacion}`);
                    }

                    await mostrarSubMenuTrainer();
                    return;
                }

                case '2': {
                    const id = await ask("Ingresa el ID del estudiante: ");
                    const student = await buscarEstudiante(id);

                    if (!student) {
                        console.log(" Estudiante no encontrado.");
                    } else {
                        const gradeInput = await ask(`Ingresa la nueva calificación para ${student.nombre}: `);
                        const grade = parseFloat(gradeInput);

                        await studentsCollection.updateOne(
                            { id_camper: student.id_camper },
                            { $set: { calificacion: grade, inscrito: grade > 60 } }
                        );

                        console.log(` Calificación actualizada a ${grade}. Estado: ${grade > 60 ? "Inscrito" : "No inscrito"}`);
                    }

                    await mostrarSubMenuTrainer();
                    return;
                }

                case '3': {
                    const trainerId = await ask("Ingresa tu número de identificación (trainer): ");
                    const trainer = await trainersCollection.findOne({ NumeroDeIdentificacion: parseInt(trainerId) });

                    if (!trainer) {
                        console.log(" Trainer no encontrado.");
                    } else {
                        console.log(` Tus grupos asignados: ${trainer.grupos}`);
                    }

                    await mostrarSubMenuTrainer();
                    return;
                }

                case '4': {
                    const trainerId = await ask("Ingresa tu número de identificación (trainer): ");
                    const trainer = await trainersCollection.findOne({ NumeroDeIdentificacion: parseInt(trainerId) });

                    if (!trainer) {
                        console.log(" Trainer no encontrado.");
                    } else {
                        console.log(` Tu horario de trabajo es: ${trainer.Horarios}`);
                    }

                    await mostrarSubMenuTrainer();
                    return;
                }

                default:
                    console.log("⚠️ Opción no válida. Intenta de nuevo.");
                    await mostrarSubMenuTrainer();
                    return;
            }
        }
    );
}


// #############################################################################################################################################
async function mostrarSubMenuCoordinador() {
    rl.question(
        "Coordinador:\n1. ver campers\n.2 Añadir camper. Añadir estudiante\n. Añadir estudiante\n. Añadir estudiante\n. Añadir estudiante\n0. Volver al menú\n> ",
        async (opcion) => {
            if (opcion === '0') {
                await mostrarMenuPrincipal();
                return;
            }

            const estudiantesCollection = db.collection("estudiantes");

            rl.question("Ingresa el id del estudiante: ", async (id) => {
                const estudiante = await buscarEstudiante(id);
                if (!estudiante) {
                    console.log(" Estudiante no encontrado.");
                    await mostrarSubMenuTrainer();
                    return;
                }

                switch (opcion) {
                    case '1':
                        console.log("\n--- Información del Estudiante ---");
                        console.log(` Id_camper: ${camper.id_camper}`);
                        console.log(` Nombre: ${camper.nombre}`);
                        console.log(` apellido: ${camper.apellido}`);
                        console.log(` Edad: ${camper.edad}`);
                        console.log(` Email: ${camper.email}`);
                        console.log(` horario: ${camper.horario}`);
                        console.log(` horario: ${camper.grupo}`);
                        console.log(` Ruta: ${camper.ruta}`);
                        console.log(` grupo: ${camper.calificacion}`);
                        break;
                    case '2':
                       rl.question("ingresa el id del campeer", async (nuevaCalificacion) => {
                           let nombrecito=rl.question("dame el nuevo nombre")
                           console.log(nombrecito)
                            console.log(` Calificación de actualizada a: ${nuevaCalificacion}`);
                            await mostrarSubMenuTrainer();
                        })
                        return;
                    case '3':
                        
                        return;
                    case '4':
                        
                        return;
                    case '5':
                        
                        return;                    
                }
                await mostrarSubMenuTrainer();
            });
        }
    );
}
// #############################################################################################################################################

async function main() {
    await connectToDb(); 
    await mostrarMenuPrincipal();
}

// #############################################################################################################################################
main();