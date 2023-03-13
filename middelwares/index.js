const fieldsValidator1 = require('../middelwares/fieldValidators');
const jwtValidator1 = require('../middelwares/jwtValidator');
const roleValidator1 = require('../middelwares/rolValidate');
const fileValidate = require('../middelwares/fileValidate');

module.exports = {
    ...fieldsValidator1,
    ...jwtValidator1,
    ...roleValidator1,
    ...fileValidate
}