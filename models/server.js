const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config.db');
const fileUpload = require('express-fileUpload')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:'/api/auth',
            usuarios: '/api/usuarios',
            category: '/api/category',
            product: '/api/product',
            buscar: '/api/buscar',
            uploads: '/api/upload',

        }
        

        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }


    async dbConnection() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempfiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))

    }

    routes() {
        this.app.use(this.path.usuarios, require('../routes/usuarios'));
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.category, require('../routes/categories'));
        this.app.use(this.path.product, require('../routes/product'));
        this.app.use(this.path.buscar, require('../routes/buscar'));
        this.app.use(this.path.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
