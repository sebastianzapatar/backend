'use strict'
var express=require('express');//El express hace la magia de crear la ruta
var PersonaController=require('../controllers/estudiante'); //Importamos la ruta
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./upload/estudiante'});
var router=express.Router();//Creamos la variabla para las rutas
//Decir las funciones de las rutas
router.get('/brindarporelausente',PersonaController.datosestudiante);
router.post('/guardar',PersonaController.save);
router.get('/listarestudiante/:parametro?',PersonaController.get_estudiantes);
router.put('/editarestudiante/:id',PersonaController.update);//siempre cambiar la función 
router.get('/buscar/:id',PersonaController.get_estudiantebyid);
router.delete('/eliminarestudiante/:cosa',PersonaController.delete);
router.get('/buscarestudiantes/:parametro',PersonaController.search);
router.get('/obtenerimagen/:nombreimagen',PersonaController.obtener_imagen);
router.get('/imagen/:imagen',PersonaController.obtener_imagen);
router.post('/subir-imagenestudiante/:id',md_upload,PersonaController.upload);
module.exports=router;
/*
Editar con put
guardar con post
borrar con delete
listar con get
*/