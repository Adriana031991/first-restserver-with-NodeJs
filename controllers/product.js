const { response } = require('express');
const { Product } = require('../models/index');



const listProduct = async (req, res = response) => {
    const { since = 0, limit = 5 } = req.query;
    const query = { state: true }

    const [total, products] = await Promise.all([
        await Product.countDocuments(query),
        await Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
            .skip(Number(since))
            .limit(Number(limit))

    ])
    res.json({
        total,
        products
    });
}


const getProductById = async (req, res = response) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');
    res.json(product);

}

const createProduct = async (req, res = response) => {

    const name = req.body.name.toUpperCase();
    const {state, user, ...body} = req.body;

    const productDB = await Product.findOne({ name });

    if (productDB) {
        return res.status(400).json({
            msg: `el producto  ${productDB.name} ya existe`,

        });
    }

    // genera data a guardar
    const data = {
        ...body,
        name, 
        user: req.user._id,
    }

    const product = new Product(data);

    await product.save();

    res.json({
        product
    });


}

const updateProduct = async (req, res = response) => {
    const {id} = req.params;
    const {state, user, ...data} = req.body;

    
    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    
    res.json(product);

}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {state:false}, {new:true})

    res.json({product});
}


module.exports = {
    listProduct, createProduct, getProductById, updateProduct, deleteProduct
}