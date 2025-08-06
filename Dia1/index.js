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
const prompt = require('prompt-sync')();
// ##########################################################################################################################################33

async function connectToDb() {
    try {
        await client.connect();
        console.log(" Conectado a MongoDB Atlas.");
        db = client.db("Campus");
    } catch (error) { console.error(" Error al conectar a MongoDB:", error) }
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
        "Coordinador:\n1. ver campers\n2. Añadir camper\n3. ver trainer\n4. añadir trainer\n5. ver salones\n6. añadir salones\n7. ver grupos\n8. Añadir grupo\n9. ver ruta\n10. añadir ruta\n11. editar estudiante\n12. editar trainer\n13. editar salon\n14. editar grupo\n15. editar ruta\n0. Volver al menú\n> ",
        async (opcion) => {
            if (opcion === '0') {
                await mostrarMenuPrincipal();
                return;
            }



            switch (opcion) {
                case '1':
                    const buscar_camper = db.collection("camper").find();
                    const campers = await buscar_camper.toArray();
                    console.log(campers);
                    break;

                case '2':

                    const añadir_camper = await db.collection("camper")
                    const id_camper = await ask("Ingresa el ID del nuevo estudiante: ");
                    const nombre_camper = await ask("Ingresa el nombre del nuevo estudiante: ");
                    const apellido_camper = await ask("Ingresa el apellido del nuevo estudiante: ");
                    const edad = await ask("Ingresa la edad del nuevo estudiante: ");
                    const email = await ask("Ingresa el email del nuevo estudiante: ");
                    const grupo = await ask("Ingresa el grupo del nuevo estudiante: ");
                    const estado = await ask("Ingresa el estado del camper: ");
                    const calificacion = await ask("Ingresa la calificación del nuevo estudiante: ");


                    await añadir_camper.insertOne({
                        "id_camper": Number(id_camper),
                        "nombre": nombre_camper,
                        "apellido": apellido_camper,
                        "edad": Number(edad),
                        "email": email,
                        "grupo": grupo,
                        "estado": estado,
                        "calificacion": Number(calificacion)
                    });
                    break;
                case '3':
                    const buscar_trainers = db.collection("trainers").find();
                    const trainers = await buscar_trainers.toArray();
                    console.log(trainers);
                    break;


                case '4':
                    const añadir_trainer = await db.collection("trainers")
                    const id_trainer = await ask("Ingresa el ID del nuevo Trainer: ");
                    const nombre_trainer = await ask("Ingresa el nombre del nuevo trainer: ");
                    const apellido_trainer = await ask("Ingresa el apellido del nuevo trainer: ");
                    const grupoInput = await ask("👥 Ingresa los grupos del trainer (separados por comas, ejemplo: S1,S2): ");
                    const grupos = grupoInput.split(",").map(g => Number(g.trim()));


                    await añadir_trainer.insertOne({
                        "id_trainer": Number(id_trainer),
                        "nombre": nombre_trainer,
                        "apellido": apellido_trainer,
                        "grupos": grupos
                    });


                    break
                case '5':
                    const buscar_trainer = db.collection("salones").find();
                    const trainers_encontrados = await buscar_trainer.toArray();
                    console.log(trainers_encontrados);
                    break;

                    return;
                case '6':
                    const añadir_salon = await db.collection("salones")
                    const id_salon = await ask("Ingresa el ID del nuevo salon: ");
                    const salon_nombre = await ask("Ingresa el nombre del salon: ");



                    await añadir_salon.insertOne({
                        "id_salon": Number(id_salon),
                        "nombre_salon": salon_nombre

                    });


                    break;


                case '7':
                    const buscar_grupos = db.collection("rutas").find();
                    const grupos_encontrados = await buscar_grupos.toArray();
                    console.log(grupos_encontrados);
                    break;
                case '8':

                    const añadir_grupo = await db.collection("grupos")
                    const id_grupo = await ask("Ingresa el ID del nuevo grupo: ");
                    const nombre_grupo = await ask("Ingresa el nombre del nuevo grupo: ");
                    const campers_grupo = await ask("👥 Ingresa los campers del grupo (separados por comas, ejemplo: 1,2,3): ");
                    const campers_grupo_listo = campers_grupo.split(",").map(g => Number(g.trim()));
                    const trainer = await ask("Ingresa el traner del grupo: ");
                    const horario_grupo = await ask("Ingresa el horario: ");
                    const salon = await ask("Ingresa el salon: ");



                    await añadir_grupo.insertOne({
                        "id_grupo": Number(id_grupo),
                        "nombre_grupo": nombre_grupo,
                        "campers": campers_grupo_listo,
                        "trainer": Number(trainer),
                        "horario": Number(horario_grupo),
                        "salon": Number(salon)
                    });


                    break;
                case '9':
                    const buscar_rutas = db.collection("rutas").find();
                    const rutas = await buscar_rutas.toArray();
                    console.log(rutas);
                    break;
                case '10':
                    const añadir_ruta = await db.collection("rutas")
                    const id_ruta = await ask("Ingresa el ID de la nueva ruta: ");
                    const ruta_nombre = await ask("Ingresa el nombre de la ruta: ");



                    await añadir_ruta.insertOne({
                        "id_ruta": id_ruta,
                        "ruta": ruta_nombre

                    });
                    break;
                case '11':
                    const id = await ask("Ingresa el ID del estudiante: ");
                    const student = await buscarEstudiante(id);
                    const camper_actualizar = db.collection("camper");
                    if (!student) {
                        console.log(" Estudiante no encontrado.");
                    } else {
                        const nombre_camper_cambio = await ask("Ingresa el nombre del nuevo estudiante: ");
                        const apellido_camper_cambio = await ask("Ingresa el apellido del nuevo estudiante: ");
                        const edad_cambio = await (ask("Ingresa la edad del nuevo estudiante: "));
                        const email_cambio = await ask("Ingresa el email del nuevo estudiante: ");
                        const grupo_cambio = await ask("Ingresa el grupo del nuevo estudiante: ");
                        const estado_cambio = await ask("Ingresa el estado del camper: ");
                        const calificacion_cambio = await ask("Ingresa la calificación del nuevo estudiante: ");
                        await camper_actualizar.updateOne(
                            { id_camper: student.id_camper },
                            {
                                $set: {
                                    "nombre": nombre_camper_cambio,
                                    "apellido": apellido_camper_cambio,
                                    "edad": Number(edad_cambio),
                                    "email": email_cambio,
                                    "grupo": Number(grupo_cambio),
                                    "estado": estado_cambio,
                                    "calificacion": Number(calificacion_cambio)
                                }
                            }
                        )
                    };



                    await console.log(` Camper ${id} actualizado a nombre:${nombre_camper_cambio}, apellido:${apellido_camper_cambio}, edad:${edad_cambio}, email:${email_cambio}, grupo:${grupo_cambio}, estado:${estado_cambio},calificacion:${calificacion_cambio}`);
                    break;

                case '12':
                    const id_trainer1 = await ask("Ingresa el ID del trainer: ");
                    const trainer1 = await db.collection("trainers").findOne({ id_trainer: id_trainer1 });
                    const trainerCollection = db.collection("trainers");
                    if (!trainer1) {
                        console.log("Trainer no encontrado.");
                    } else {
                        const nombre_cambio = await ask("Ingresa el nuevo nombre del trainer: ");
                        const apellido_cambio = await ask("Ingresa el nuevo apellido del trainer: ");
                        const grupos_cambio = await ask("Ingresa los nuevos grupos separados por comas: ");

                        await trainerCollection.updateOne(
                            { id_trainer: trainer1.id_trainer },
                            {
                                $set: {
                                    nombre: nombre_cambio,
                                    apellido: apellido_cambio,
                                    grupos: grupos_cambio.split(",").map(g => Number(g.trim()))
                                }
                            }
                        );

                        console.log(`Trainer ${id_trainer1} actualizado a nombre: ${nombre_cambio}, apellido: ${apellido_cambio}, grupos: ${grupos_cambio}`);
                    }
                    break;
                    case '13':
                    const salonCollection = db.collection("salones");

                    const id_salon_editar = await ask("Ingresa el ID del salón a editar: ");
                     const salon1 = await salonCollection.findOne({ id_salon: id_salon_editar });

                      if (!salon1) {
                            console.log(`No se encontró un salón con ID ${id_salon_editar}.`);
                    } else {
                    const nuevo_nombre = await ask("Ingresa el nuevo nombre del salón: ");

                     await salonCollection.updateOne(
                        { id_salon: id_salon_editar },
                        { $set: { nombre_salon: nuevo_nombre } }
                  );

                 console.log(`Salón con ID ${id_salon_editar} actualizado a nombre: ${nuevo_nombre}.`);
             }
             break;




                    await mostrarSubMenuCoordinador();
                    return;
            }
            await mostrarSubMenuCoordinador();

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