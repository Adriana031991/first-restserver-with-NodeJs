
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const { validateRole, validateEmail, validateUserById } = require('../helpers/db-validators');

const { fieldsValidator,
    jwtValidator,
    roleValidator, } = require('../middelwares')

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validateUserById),
    check('role').custom(validateRole),

    fieldsValidator
], usuariosPut);

router.post('/', [
    check('name', 'El nombre no puede estar vacio').not().isEmpty(),

    check('password',
        'La contraseña es obligatoria y debe ser tener 6 caracteres').isLength({ min: 6 }).not().isEmpty(),

    check('email').custom(validateEmail),

    check('role').custom(validateRole),
    // check('role', 'No es un rol permitido').isIn(['Admin_Role', 'User_Role']),
    fieldsValidator
], usuariosPost);

router.delete('/:id', [
    jwtValidator,
    roleValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validateUserById),
    fieldsValidator
], usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;