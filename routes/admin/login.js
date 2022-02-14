var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');


router.get('/', function(req, res, next){
    res.render('admin/login', {
        layout: 'admin/login'
    });
});

router.post('/', async(req, res, next)=>{
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;
        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

        if (data !== undefined) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;
            res.redirect('/admin/articulos');
        } else {
            res.render('admin/login', {
                layout: 'admin/login',
                error: true,
            })
        }
    } catch (error) {
        console.error(error);
    }
})

router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.render('admin/login',{
        layout: 'admin/login',
    });
});
module.exports = router;