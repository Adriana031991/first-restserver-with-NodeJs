
const {Role, User, Category, Product} = require('../models');


const validateRole = async (role = '') => {

    const existRol = await Role.findOne({ role });
    if (!existRol) {
        throw new Error(`el role ${role} no esta registrado en la base de datos`);
    }
}


const validateEmail = async (email = '') => {
    
    const emailExist = await User.findOne({ email })
    if (emailExist) {
        throw new Error(`el correo ${email} ya esta registrado`);

    }

}

const validateUserById = async (id ) => {
    
    const idExist = await User.findById(id);
    if (!idExist) {
        throw new Error(`el ID ${id} no existe`);

    }

}

const validateUserState = async (id ) => {
    
    const userExist = await User.findById(id);
    if (!userExist.state) {
        throw new Error(`el usuario ${userExist.name} no esta activo`);

    }

}

const validateCategory = async (id ) => {
    
    const idExist = await Category.findById(id);
    if (!idExist) {
        throw new Error(`el ID ${id} no existe`);

    }

}
const validateProduct = async (id ) => {
    
    const idExist = await Product.findById(id);
    if (!idExist) {
        throw new Error(`el ID ${id} no existe`);

    }

}


const validateCollections =  (collection = '', collections = [] ) => {

    const include = collections.includes(collection);
    if (!include) {
        throw new Error(`la coleccion ${collection} no es permitida, las permitidas son: ${collections}`);
    }
    return true;

}


module.exports ={
    validateRole,
    validateEmail,
    validateUserById,
    validateUserState,
    validateCategory,
    validateProduct,
    validateCollections
}