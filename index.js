// Importamos express y lo asignamos a una variable con el misno nombre. Hay dos formas: ;
// const express = require('express'); //Forma commom
import express from 'express'; //Forma import
// Importamos el archivo con todas las rutas para no tenerlas en el mismo archivo de inicilizacion (usar a la ahuvo la extension .js)
import router from './routes/index.js';
import db from './config/db.js';



// Instancianos la funcion que ejecuta express.
const app = express();

// Conectar la base de datos
db.authenticate()
  .then( () => console.log('Base de datos conectada'))
  .catch( error => console.log(error))

// Definir puerto. Nota: "process.env.PORT" solo va a existir hasta que despleguemos el servidor de mientras siempre usara el puerto 4000 local
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set("view engine", "pug");

// Obtener el año actual
app.use((req, res, next)=>{
  const year = new Date();
  res.locals.actualYear = year.getFullYear(); //Primer varaible 

  res.locals.nombreSitio = "Agencia de viajes"; //Segunda variable
  return next();
});

// Agregar body parse para leer los datos del formulario (testimoniales.pug)
app.use(express.urlencoded({extended : true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router (app.use nos permite usar tadas las rutas al soportar todos los verbos http)
app.use("/", router);

// Arrancamos el servidor con el metodo "listen" y pasamos el puerto sobre el cual queremos ejecutar (variable "port"). Si arranca correctamente
// se ejeucta un callback que confirma el funcionamiento del port y en que port se esta ejecutando.
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
