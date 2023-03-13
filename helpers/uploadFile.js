

const path = require('path');
const { v4: uuid } = require('uuid')


const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {


        // //archivo es el nombre que le coloque en el postman
        const {archivo} = files
        const nombrecorto = archivo.name.split('.');
        const extension = nombrecorto[nombrecorto.length - 1];


        if (!extensionesValidas.includes(extension)) {
            return reject(`la extension ${extension} no es permitido; ${extensionesValidas}`);
        }

        //este renombre es para que cada archivo subido tenga un nombre diferente y no se repita si varios usuarios suben el mismo archivo
        const nombreTemp = uuid() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nombreTemp);
        });

    });

}

module.exports = subirArchivo