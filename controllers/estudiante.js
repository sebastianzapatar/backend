'use strict'
var validator1=require('validator');
var Estudiante=require('../models/estudiante');
const { default: validator } = require('validator');
const estudiante = require('../models/estudiante');
var fs =require('fs');
var path=require('path');
var controller={
    datosestudiante:(req,res)=>{
        console.log('Cualquier cosa');
        return res.status(200).send({
            nombre:'Karlimar Piza',
            curso:'FS',
            nota:'0',
        })  
    },
    save:(req,res)=>{
        //Recoger los parametros
        var params=req.body;
        console.log(params);
        //Validar los datos 
        try{
            var validar_nombre=!validator1.isEmpty(params.nombre);
            var validar_apellido=!validator1.isEmpty(params.apellido);
            var validar_cedula=!validator1.isEmpty(params.cedula);
            
        }
        catch(err){
            return res.status(404).send({
                status:'Error pana',
                message:"Escriba bien gonorrea",
            })
        }
        //Guardamos
        var estudiante=new Estudiante;
        estudiante.nombre=params.nombre;
        estudiante.apellido=params.apellido;
        estudiante.cedula=params.cedula;
        estudiante.save((err,EstudianteStored)=>{
            if(err || !EstudianteStored){
                return res.status(404).send({
                    status:'error',
                    message:"No se pudo niño",
                })
            }
            //Devolvemos el valor
            return res.status(200).send({
                status:'Operación exitosa',
                message:EstudianteStored,
            })
        })
        
    },
    get_estudiantes:(req,res)=>{
        var query=Estudiante.find({});
        var variable=req.params.parametro;
        if(variable || !variable==undefined){
            query.limit(1);
        }
        console.log(variable);
        query.sort('nombre').exec((err,estudiantes)=>{
            if(err){
                return res.status(404).send({
                    status:'error',
                    message:"Error papi",
                })
            }
            return res.status(200).send({
                status:'Operación exitosa',
                estudiantes,
            })
        })
    },
    get_estudiantebyid:(req,res)=>{
        var id=req.params.id;
        if(!id || id==null){
            return res.status(404).send({
                status:'error',
                message:"No hay id",
            })
        }
        //Buscar el id
        Estudiante.findById(id,(err,Estudiante)=>{
            if(err){
                return res.status(404).send({
                    status:'error',
                    message:"No se pudo procesar",
                }) 
            }
            if(!Estudiante){
                return res.status(500).send({
                    status:'error',
                    message:"No existe el estudiante ingrese una id válida",
                })
            }
            return res.status(200).send({
                status:'Éxito mi niño',
                message:Estudiante,
            })
        })
    },
    update:(req,res)=>{
        //RECOGER EL ID QUE VAMOS A USAR
        var id=req.params.id;//Para recoger de la url
        //Recogemos los datos que lleguen
        var parametros=req.body; //para recoger del body
        try {
            var validar_nombre=parametros.nombre;
            var validar_apellido=parametros.apellido;
            var validar_cedula=parametros.cedula;
        } catch (error) {
            return res.status(404).send({
                status:"error",
                message:"Llene todos los datos por amor de Dios"
            })
        }
        //validar
        if(validar_apellido && validar_cedula && validar_nombre){
            Estudiante.findOneAndUpdate({_id:id},parametros,{new:true},(err,EstudianteActualizado)=>{
                if(err){
                    return res.status(500).send({
                        status:"error",
                        message:"Error mono no se pudo actualizar"
                    })
                }
                if(!EstudianteActualizado){
                    return res.status(500).send({
                        status:"error",
                        message:"Id erroneo mi niño, verifique"
                    })
                }
                else{
                    return res.status(200).send({
                        status:'Éxito mi niño',
                        message:EstudianteActualizado,
                    })
                }
            })
        }
        //Mensaje de error
        else{
            return res.status(500).send({
                status:"error",
                message:"Validación no es correcta"
            })
        }
    },
    delete:(req,res)=>{
        //Recoger el id
        var id=req.params.cosa;
        //find and delete
        Estudiante.findOneAndDelete({_id:id},(err,EstudianteRemove)=>{
            if(err){
                return res.status(500).send({
                    status:"error",
                    message:"Error mono no se que pasa"
                })
            }
            if(!EstudianteRemove){
                return res.status(500).send({
                    status:"error",
                    message:"Id equivocado"
                })
            }
            return res.status(200).send({
                status:'Éxito mi niño estudiante eliminado',
                message:EstudianteRemove,
            })
        })
    },
    search:(req,res)=>{
        var parametro=req.params.parametro;
        Estudiante.find({"$or":[
            {"nombre":{"$regex":parametro,"$options":"i"}},
            {"apellido":{"$regex":parametro,"$options":"i"}},
            ]})
        .exec((err,estudiantes)=>{
           
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:"error en la petición",
                })
            }
            else if(!estudiantes){
                return res.status(404).send({
                    status:'error',
                    message:"No hayproductos",
                })
            }
            else{
                return res.status(200).send({
                    status:'Success',
                    estudiantes,
                })
            }
        })
        
    },
    upload:(req,res)=>{
        //Coger el archivo de la petición
        var file_name='Imagen no subida';
        if(!req.files){
            return res.status(404).send({
                status:'Error',
                message:file_name,
                })
        }
        //Coger el nombre y la extensión
        var file_path=req.files.file0.path;
        var file_split=file_path.split('\\');//En el servidor / porque el servidor es linux
        //Comprobamos la extensión
        var file_name=file_split[2];
        var file_extension=file_name.split('.')[1];
        /*
        En linux o mac
        var file_split=file_path.spilt('/');
        */
       //Comprobar la extensión y solo admite imagenes
       if(file_extension != 'png' && file_extension != 'jpg'
       && file_extension != 'gif' && file_extension != 'jpeg'){
           //Borrar el archivo
           fs.unlink(file_path,(err)=>{
               
                   return res.status(404).send({
                       status:'error',
                       message:'La extensión de la imagen no es váida',
                   }) 

           });
       }
       else{
        var id=req.params.id;
        console.log(file_name);
        Estudiante.findOneAndUpdate({_id:id},{image:file_name},
            {new:true},(err,EstudianteUpdate)=>{
                if(err || !EstudianteUpdate){
                    return res.status(404).send({
                        status:'error',
                        message:'Error al guardar la imagen del artículo',
                    }) 
                }
                return res.status(200).send({
                    status:'success',
                    EstudianteUpdate,
                    })  
            })
        }
    },
   /* obtener_imagen:(req,res)=>{
        var file=req.params.nombreimagen;
        var file_path='./upload/estudiante/'+file;
        fs.exists(file_path,(exist)=>{
            if(exist){
                return res.sendFile(path.resolve(file_path));
            }
            else{
                return res.status(404).send({
                    status:'error',
                    message:'La imagen no existe',
                })  
            }
        })
    },*/
    
     obtener_imagen:(req,res)=>{
        var file=req.params.imagen;
        var file_path='./upload/estudiante/'+file;
        console.log(file_path)
        fs.exists(file_path,(exist)=>{
            if(exist){
                return res.sendFile(path.resolve(file_path));
            }
            else{
                return res.status(404).send({
                    status:'error',
                    message:'La imagen no existe',
                })
            }
        })
    }
    
};
module.exports=controller;