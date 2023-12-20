import { Router } from "express";
import studentController from "./student/studentController";

class Routes {
    router: Router

    constructor () {
        this.router = Router();
        this.routes();
    }

    routes () {
        this.router.post('/student', studentController.createAndUpdate);
        this.router.get('/student', studentController.getAll);
    }   
}

export default new Routes().router;   