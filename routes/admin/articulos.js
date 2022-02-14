var express = require('express');
var router = express.Router();
var articulosModel = require('./../../models/articulosModel')


//router.get('/', function(req, res, next){
//    res.render('admin/articulos',{
//        layout: 'admin/layout',
//        usuario: req.session.nombre,
//    });
//});

router.get('/', async function(req, res, next){
    var articulos = await articulosModel.getArticulos();
    res.render('admin/articulos',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        articulos
    })
});

module.exports = router;