const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config.db');

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

    }

    routes() {
        this.app.use(this.path.usuarios, require('../routes/usuarios'));
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.category, require('../routes/categories'));
        this.app.use(this.path.product, require('../routes/product'));
        this.app.use(this.path.buscar, require('../routes/buscar'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
