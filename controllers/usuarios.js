const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const user = require('../models/user');

const usuariosGet = async (req = request, res = response) => {

    const { since = 1, limit = 5 } = req.query;
    const query = { state: true }
    // const total = await User.countDocuments(query);

    // const users = await User.find(query)
    //     .skip(Number(since))
    //     .limit(Number(limit));


    const [total, users] = await Promise.all([
        await User.countDocuments(query),
        await User.find(query)
            .skip(Number(since))
            .limit(Number(limit))

    ])
    res.json({

        total,
        users
    });

}

const usuariosPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role })


    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        msg: 'post API - usuariosPost',
        user
    });

}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data)

    res.json({
        user
    });

}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    // borrar fisicamente
    // const user = await User.findByIdAndDelete(id);

    // cambiar el estado del usuario para no borrar los datos de ese usuario
    const user = await User.findByIdAndUpdate(id, {state:false})

    // const userAuthenticated = req.user; 

    res.json({user});
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}