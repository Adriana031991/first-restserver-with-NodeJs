
const { response } = require("express")

const fileValidate = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivo que subir' });

    }

    next();
}

module.exports = {fileValidate}