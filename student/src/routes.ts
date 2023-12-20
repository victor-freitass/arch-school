import { Router } from "express";
import StudentController from "./student/studentController";

class Routes {
    router: Router

    constructor () {
        this.router = Router();
        this.routes();
    }

    routes () {
        this.router.get('/student/:id', StudentController.getStudent);
    }
}

export default new Routes().router