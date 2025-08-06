use Campus;

db.campers.insertMany(
    [
  {
    "id_camper": 1,
    "nombre": "Lucía",
    "apellido": "Gómez",
    "edad": 19,
    "email": "lucia.gomez@example.com",
    "horario": 2,
    "ruta": "Java",
    "calificacion": 85,
    "estado": "Inscrito"
  },
  {
    "id_camper": 2,
    "nombre": "Carlos",
    "apellido": "Martínez",
    "edad": 22,
    "email": "carlos.martinez@example.com",
    "horario": 3,
    "ruta": "NodeJs",
    "calificacion": 58,
    "estado": "No Inscrito"
  },
  {
    "id_camper": 3,
    "nombre": "Valentina",
    "apellido": "Ruiz",
    "edad": 20,
    "email": "valentina.ruiz@example.com",
    "horario": 1,
    "ruta": "NetCore",
    "calificacion": 74,
    "estado": "Inscrito"
  },
  {
    "id_camper": 4,
    "nombre": "Santiago",
    "apellido": "Torres",
    "edad": 23,
    "email": "santiago.torres@example.com",
    "horario": 4,
    "ruta": "Java",
    "calificacion": 67,
    "estado": "Inscrito"
  },
  {
    "id_camper": 5,
    "nombre": "Isabella",
    "apellido": "Pérez",
    "edad": 18,
    "email": "isabella.perez@example.com",
    "horario": 1,
    "ruta": "NodeJs",
    "calificacion": 91,
    "estado": "Inscrito"
  },
  {
    "id_camper": 6,
    "nombre": "Mateo",
    "apellido": "López",
    "edad": 21,
    "email": "mateo.lopez@example.com",
    "horario": 2,
    "ruta": "NetCore",
    "calificacion": 46,
    "estado": "No Inscrito"
  },
  {
    "id_camper": 7,
    "nombre": "Camila",
    "apellido": "Ramírez",
    "edad": 24,
    "email": "camila.ramirez@example.com",
    "horario": 3,
    "ruta": "Java",
    "calificacion": 88,
    "estado": "Inscrito"
  },
  {
    "id_camper": 8,
    "nombre": "Andrés",
    "apellido": "Vargas",
    "edad": 20,
    "email": "andres.vargas@example.com",
    "horario": 4,
    "ruta": "NetCore",
    "calificacion": 61,
    "estado": "Inscrito"
  },
  {
    "id_camper": 9,
    "nombre": "Mariana",
    "apellido": "Castro",
    "edad": 25,
    "email": "mariana.castro@example.com",
    "horario": 2,
    "ruta": "NodeJs",
    "calificacion": 37,
    "estado": "No Inscrito"
  },
  {
    "id_camper": 10,
    "nombre": "David",
    "apellido": "Ortega",
    "edad": 19,
    "email": "david.ortega@example.com",
    "horario": 1,
    "ruta": "Java",
    "calificacion": 79,
    "estado": "Inscrito"
  }
]
)

db.trainers.insertMany([
    {
  "id_trainer": 0,
  "Nombre": "Pedro",
  "apellido": "Gomez ",
  "grupos": [3,4]
},
{
 
  "id_trainer": 1,
  "Nombre": "Jolver",
  "apellido": "Pardo",
  "grupos": [1,2]
},
{
  "id_trainer": 2,
  "Nombre": "Miguel",
  "apellido": [],
  "grupos": [2.4]
},
{
  "id_trainer": 3,
  "Nombre": "Juan Carlos",
  "apellido": "Mariño",
  "grupos": [1,3]
},
{

  "id_trainer": 4,
  "Nombre": "Carlos",
  "apellidos": "Rueda",
  "grupos": [1,2]
}
    
])

db.rutas.insertMany(
    [  
        {
            "id_ruta":1,
            "ruta":"NodeJS"
        },
        {
            "id_ruta":2,
            "ruta":"Netcore"
        },
        {
            "id_ruta":3,
            "ruta":"Java"
        },
        {
            "id_ruta":4,
            "ruta":"Express"
        }
    ]
)

db.salones.insertMany(
    [
        {
            "id_salon":1,
            "nombre":"Atermis"
        },
        {
            "id_ruta":2,
             "nombre":"Apolo"
        },
        {
            "id_ruta":3,
             "nombre":"Voyager"
        },
        {
            "id_ruta":4,
             "nombre":"Guaritis"
        }
    ]
)

db.grupos.insertMany(
    [
        {
            "id_grupo":1,
            "nombre":"S1",
            "campers":[1,2,3,4,5],
            "trainer":1,
            "horario":1,
            "salon":1

        }
    ]
)