'use strict'
var mongoose=require('mongoose'); //para conectar con mongoDB
var Schema=mongoose.Schema;//para generar el schema de la base de datos
var UserSchema=Schema({ //creamos el archivo json
    username:String,
    password:String,
    date:{type:Date, default:Date.now},
    email:String,
});
module.exports=mongoose.model('Estudiante',UserSchema); //para exportar y poderlo usar en otros modulos
//articles--> Guardar documentos de este tipo y con esta estructura dentro de la conexión