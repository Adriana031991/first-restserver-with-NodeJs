const { Router } = require('express');
const {check} = require('express-validator');
const { listProduct, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { validateCategory, validateProduct } = require('../helpers/db-validators');
const { roleValidator } = require('../middelwares');
const { fieldsValidator } = require('../middelwares/fieldValidators');
const { jwtValidator } = require('../middelwares/jwtValidator');

const router = Router();


router.get('/', [
    jwtValidator,

],listProduct); 


router.get('/:id', [
    jwtValidator,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(validateCategory),
    fieldsValidator
], getProductById );


router.post('/',[
    jwtValidator,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('category', 'No es un id de mongo').isMongoId(),
    check('category').custom(validateCategory),
    fieldsValidator
], createProduct); //privado. usuario con token

router.put('/:id', [
    jwtValidator,
    check('id').custom(validateProduct),
    check('category', 'No es un id de mongo').isMongoId(),
    
    fieldsValidator
] , updateProduct); 

//privado. usuario con token
router.delete('/:id', [
    jwtValidator,
    roleValidator,
    check('id', 'No es un ID valido').isMongoId(),
    fieldsValidator,
    check('id').custom(validateCategory),
    fieldsValidator

], deleteProduct); //privado. usuario admin

module.exports = router