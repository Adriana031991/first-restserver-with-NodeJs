const { Router } = require('express');
const {check} = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateEmail } = require('../helpers/db-validators');
const { fieldsValidator } = require('../middelwares/fieldValidators');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password').isLength({min:6}).not().isEmpty(),
    fieldsValidator
] ,login );

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    fieldsValidator
] ,googleSignIn )

module.exports = router