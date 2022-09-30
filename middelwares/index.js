const fieldsValidator1 = require('../middelwares/fieldValidators');
const jwtValidator1 = require('../middelwares/jwtValidator');
const roleValidator1 = require('../middelwares/rolValidate');

module.exports = {
    ...fieldsValidator1,
    ...jwtValidator1,
    ...roleValidator1,
}