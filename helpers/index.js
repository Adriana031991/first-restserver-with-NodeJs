const DbValidator = require('./db-validators');
const GoogleVerify = require('./googleVerify');
const JwtGenerate = require('./jwtGenerate');
const subirArchivo = require('./uploadFile');

module.exports = {
    ...DbValidator,
    ...GoogleVerify,
    ...JwtGenerate,
    ...subirArchivo,
}