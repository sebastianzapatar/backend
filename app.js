'use strict'
//Cargar modulos de node.js para crear un servidor
var express=require('express');
var bodyparser=require('body-parser');
//Ejecutar el express servidor http
var app=express();

//Cargar archivos rutas
var estudianteroutes=require('./routes/estudiante')
var productosroutes=require('./routes/producto')
//Middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//CORS para permitir peticiones del frontend
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin,X-Requeste-with, Content-Type, Accept,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
});
// Configurar cabeceras y cors

//Añadir prefijos
app.use('/',estudianteroutes);
app.use('/',productosroutes);


//Exportar los modulos
module.exports=app;