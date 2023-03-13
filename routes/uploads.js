const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarArchivo, actualizarArchivoCloudinary } = require('../controllers/uploads');
const { validateCollections } = require('../helpers/db-validators');
const { fieldsValidator, jwtValidator, fileValidate } = require('../middelwares');


const router = Router();

const coleccionesPermitidas = [
    'users', 'products'
]

router.get('/:collection/:id', [
    jwtValidator,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('collection').custom(c =>

        validateCollections(c, coleccionesPermitidas)
    ),
    fieldsValidator
], mostrarArchivo);

router.post('/', [
    jwtValidator,
    fileValidate
], cargarArchivo);

router.put('/:collection/:id', [
    jwtValidator,
    fileValidate,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('collection').custom(c =>

        validateCollections(c, coleccionesPermitidas)
    ),
    fieldsValidator
], actualizarArchivoCloudinary);
// ], actualizarArchivo);



module.exports = router