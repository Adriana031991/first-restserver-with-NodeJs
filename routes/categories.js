const { Router } = require('express');
const {check} = require('express-validator');
const { createCategory, getCategoryById, listCategories, updateCategory, deleteCategory } = require('../controllers/categories');
const { validateCategory } = require('../helpers/db-validators');
const { roleValidator } = require('../middelwares');
const { fieldsValidator } = require('../middelwares/fieldValidators');
const { jwtValidator } = require('../middelwares/jwtValidator');

const router = Router();


router.get('/', listCategories); 

router.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(validateCategory),
    fieldsValidator
], getCategoryById);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    jwtValidator,
    fieldsValidator
], createCategory); //privado. usuario con token

router.put('/:id', [
    jwtValidator,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(validateCategory),

    fieldsValidator
] ,updateCategory); 

//privado. usuario con token
router.delete('/:id', [
    jwtValidator,
    roleValidator,
    check('id', 'No es un ID valido').isMongoId(),
    fieldsValidator,
    check('id').custom(validateCategory),
    fieldsValidator

], deleteCategory); //privado. usuario admin

module.exports = router