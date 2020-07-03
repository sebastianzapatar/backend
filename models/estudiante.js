'use strict'
var mongoose=require('mongoose'); //para conectar con mongoDB
var Schema=mongoose.Schema;//para generar el schema de la base de datos
var EstudianteSchema=Schema({ //creamos el archivo json
    nombre:String,
    apellido:String,
    cedula:Number,
    date:{type:Date, default:Date.now},
    image:String,
});
module.exports=mongoose.model('Estudiante',EstudianteSchema); //para exportar y poderlo usar en otros modulos
//articles--> Guardar documentos de este tipo y con esta estructura dentro de la conexión