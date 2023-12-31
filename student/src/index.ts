import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config(); 

import routes from './routes';
import client from './database/connection';

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
    }

    routes () { 
        this.express.use(routes);

        this.express.get('/abc', (req, res) => {
            res.send('Hello World!')
        })

    }

    connection () {
        client.connect().then(_ => {
            this.express.listen(process.env.PORT, () => console.log('Student API on...'))
        }).catch(e => console.log(e));
    }
}

new App();