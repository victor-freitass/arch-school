import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config(); 

import routes from './routes';
import client from './database/connection';

import swaggerUi from 'swagger-ui-express';
import swaggetJson from '../config/api-doc/swagger.json';
import termsJson from '../config/api-doc/terms.json';

class App { 
    express: Express;

    constructor () {
        this.express = express();
        this.middlewares();
        this.routes();
        this.connection();
    }

    middlewares () {
        this.express.use(express.json());
        this.express.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggetJson));
        this.express.use('/api-doc-terms', (req, res) => {
            return res.json(termsJson)
        })
    }

    routes () { 
        this.express.use(routes);
    }

    connection () {
        client.connect().then(_ => {
            this.express.listen(3000, () => console.log('Teacher API on...'));
        }).catch(e => console.log(e));
    }
}

new App();