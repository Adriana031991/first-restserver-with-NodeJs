const { response } = require('express');
const path = require('path');
const fs = require('fs');
const subirArchivo = require('../helpers/uploadFile');
const { User, Product } = require('../models');
// Require the Cloudinary library
const cloudinary = require('cloudinary')
cloudinary.config(process.env.CLOUDINARY_URL);



const cargarArchivo = async (req, res = response) => {

    try {
        const nombre = await subirArchivo(req.files);
        res.json({ nombre })

    } catch (e) {
        res.status(400).json({ msg: e + 'jj' })
    }

}


const actualizarArchivo = async (req, res = response) => {


    const { id, collection } = req.params
    try {
        let modelo;

        switch (collection) {
            case 'users':
                modelo = await User.findById(id)
                if (!modelo) {
                    return res.status(400).json({ msg: `no existe el usuario con el id ${id}` })
                }
                break;

            case 'products':
                modelo = await Product.findById(id)
                if (!modelo) {
                    return res.status(400).json({ msg: `no existe un producto con el id ${id}` })
                }
                break;

            default:
                return res.status(500).json({ msg: 'validaciones pendientes' })
        }

console.log('modelo.image', modelo.image)
        if (modelo.image) {
            const pathImg = path.join(__dirname, '../uploads', collection, modelo.image);
            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg);
            }
        }
        const nombre = await subirArchivo(req.files, undefined, collection);
        modelo.image = nombre

        await modelo.save();

        res.json(modelo);
    } catch (error) {
        res.status(400).json({ msg: error })
    }


}

const mostrarArchivo = async (req, res = response) => {

    const { id, collection } = req.params

    try {
        let modelo;

        switch (collection) {
            case 'users':
                modelo = await User.findById(id)
                if (!modelo) {
                    return res.status(400).json({ msg: `no existe el usuario con el id ${id}` })
                }
                break;

            case 'products':
                modelo = await Product.findById(id)
                if (!modelo) {
                    return res.status(400).json({ msg: `no existe un producto con el id ${id}` })
                }
                break;

            default:
                return res.status(400).json({ msg: 'validaciones pendientes' })
        }


        if (modelo.image) {
            const pathImg = path.join(__dirname,'../uploads', collection, modelo.image);

            if (fs.existsSync(pathImg)) {
                return res.sendFile(pathImg)
            }
        }
       
        const pathImagen = path.join( __dirname, '../assets/img/no-image.jpg');
        
        res.sendFile( pathImagen );

    } catch (error) {
        res.status(400).json({ msg: error })
    }

}

const actualizarArchivoCloudinary = async (req, res = response) => {


    const { id, collection } = req.params
    try {
        let modelo;

        switch (collection) {
            case 'users':
                modelo = await User.findById(id)
                if (!modelo) {
                    return res.status(400).json({ msg: `no existe el usuario con el id ${id}` })
                }
                break;

            case 'products':
                modelo = await Product.findById(id)
                if (!modelo) {
                    return res.status(400).json({ msg: `no existe un producto con el id ${id}` })
                }
                break;

            default:
                return res.status(500).json({ msg: 'validaciones pendientes' })
        }

    // Limpiar imágenes previas
    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }


        const  tempFilePath  = req.files.archivo.tempFilePath;
        if ( !tempFilePath) {
            return res.status(400).json({ msg: 'el tempFilePath esta vacio :(' })
        }
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        modelo.img = secure_url;
    
        await modelo.save();
    
    
        res.json( modelo );
    
    } catch (error) {
        res.status(400).json({ msg: error })
    }


}




module.exports = {
    cargarArchivo, actualizarArchivo, mostrarArchivo, actualizarArchivoCloudinary
}