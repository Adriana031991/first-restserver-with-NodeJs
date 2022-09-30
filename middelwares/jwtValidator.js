
const { response, request } = require('express');
const jwt = require("jsonwebtoken");
const User = require('../models/user');

const jwtValidator = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Usuario no autenticado'
        })


    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY)

        const usuario = await User.findById(uid);
        
        if (!usuario) {
            res.status(401).json({
                msg: 'usuario no existe en DB'
            })
        }

        if (!usuario.state) {
            res.status(401).json({
                msg: 'Token no valido- estado inactivo'
            })
        }

        req.user = usuario;
        next();

    } catch (error) {
        console.log('error', error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}

module.exports = {
    jwtValidator
}