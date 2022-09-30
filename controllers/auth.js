const { response } = require('express')
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const generarJWT = require('../helpers/jwtGenerate');
const { googleVerify } = require('../helpers/googleVerify');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }


        // generar el jwt
        const token = await generarJWT(usuario.id)

        res.json({
            usuario, token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const {name, image, email} = await googleVerify(id_token);
        
        let user = await User.findOne({ email });

        if (!user) {
            const data = { 
                name, email, password: ':P', image, google: true
            }

            user = new User(data);
            await user.save();
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            });
        }

         // generar el jwt
         const token = await generarJWT(usuario.id)

         res.json({
            user,
            token
         })

    } catch (error) {
        return res.status(500).json({
            msg: 'el token no se pudo verificar'
        })

    }

}

module.exports = {
    login, googleSignIn
}