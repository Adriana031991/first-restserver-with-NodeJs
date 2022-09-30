const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Product, Category } = require('../models/index');

const coleccionesPermitidas = [
    'usuarios', 'category', 'product'
]



const buscarUser = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); // si el id del temino es valido dentro de mongodb devuelve true

    if (esMongoId) {
        const user = await User.findById(termino);
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regEx = new RegExp(termino, 'i'); //busqueda termino sin key sensitive
    const users = await User.find({ $or: [{ name: regEx }, { email: regEx }], $and: [{ state: true }] });

    res.json({
        results: users
    })

}
const buscarCategory = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); // si el id del temino es valido dentro de mongodb devuelve true

    if (esMongoId) {
        const category = await Category.findById(termino);
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regEx = new RegExp(termino, 'i'); //busqueda termino sin key sensitive
    const categories = await Category.find({ name: regEx , state: true });

    res.json({
        results: categories
    })

}
const buscarProduct = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); // si el id del temino es valido dentro de mongodb devuelve true

    if (esMongoId) {
        const product = await Product.findById(termino).populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regEx = new RegExp(termino, 'i'); //busqueda termino sin key sensitive
    const products = await Product.find({ name: regEx , state: true }).populate('category', 'name');

    res.json({
        results: products
    })

}


const buscar = async (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        console.log('coleccion', coleccion)
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }


    switch (coleccion) {
        case coleccionesPermitidas[0]:
            buscarUser(termino, res)
            break;
        case coleccionesPermitidas[1]:
            buscarCategory(termino, res)

            break;
        case coleccionesPermitidas[2]:
            buscarProduct(termino, res)

            break;

        default:
            return res.status(500).json({
                msg: `Las colecciones permitidas son: ${coleccionesPermitidas} - 2do mensaje`
            })
    }


}


module.exports = {
    buscar,
}