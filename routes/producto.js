'use strict'
var express=require('express');
var ProductoController=require('../controllers/producto');
const producto = require('../models/Producto');
var router=express.Router();
//Rutas que sirven
router.post('/saveproducto',ProductoController.save); //Guardar usamos post
router.get('/listarproducto/:last?',ProductoController.get_productos); // obtener vamos a usar get
router.get('/getproducto/:id',ProductoController.get_producto);
router.put('/actualizarproducto/:id',ProductoController.update);//actualizar vamos a usar put
router.delete('/borrarproducto/:id',ProductoController.delete);
router.get('/buscarproducto/:parametro',ProductoController.search);
module.exports=router;