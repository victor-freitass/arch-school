import { Request, Response } from "express";
import client from "../database/connection";
import queries from "./queries";

class StudentController {
    async getStudent (req: Request, res: Response) {
        const { id } = req.params;

        const student = (await client.query(queries.getStudent, [id])).rows[0];
        if (!student) {
            return res.status(400).send('Student not exists');
        }

        return res.json(student)
    }
}

export default new StudentController();