const { response } = require('express');
const { Category } = require('../models/index');

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `la categoria ${categoryDB.name} ya existe`,

        });
    }

    // genera data a guardar
    const data = {
        name, user: req.user._id,
    }

    const category = new Category(data);

    await category.save();

    res.json({
        category
    });


}

const listCategories = async (req, res = response) => {
    const { since = 0, limit = 5 } = req.query;
    const query = { state: true }

    const [total, category] = await Promise.all([
        await Category.countDocuments(query),
        await Category.find(query)
        .populate('user', 'name')
            .skip(Number(since))
            .limit(Number(limit))

    ])
    res.json({
        total,
        category
    });
}
const getCategoryById = async (req, res = response) => {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.json(category);

}

const updateCategory = async (req, res = response) => {
    const {id} = req.params;
    const {state, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    res.json(category);

}

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    const user = await Category.findByIdAndUpdate(id, {state:false}, {new:true})

    res.json({user});
}


module.exports = {
    listCategories, createCategory, getCategoryById, updateCategory, deleteCategory
}