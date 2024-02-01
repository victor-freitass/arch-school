import { Request, Response } from "express";
import client from "../database/connection";
import queries from "./queries";

class StudentController {
    async createAndUpdate (req: Request, res: Response) {
        const { name, n1, n2, n3, n4, studentId } = req.body;

        if (
            !(name && 
            (n1 || n1 === 0) && 
            (n2 || n2 === 0) && 
            (n3 || n3 === 0) && 
            (n4 || n4 === 0)) 
        )  return ('Set all Infos');

        if (studentId) {
             
            const media = ((n1 + n2 + n3 + n4) / 4).toFixed(2);

            const student = (await client.query(queries.getStudentById, [studentId])).rows[0];
            if (!student) return res.status(400).send('Student not exists');

            client.query(queries.updateNotas, [studentId, n1, n2, n3, n4, media], err => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Sorry, Internal Server Error');
                }
            });

            return res.status(204).send();
        } else {

            try {
                const studentId = (await client.query(queries.insertStudent,
                    [name])).rows[0].id;

                const media = ((n1 + n2 + n3 + n4) / 4).toFixed(2);

                await client.query(queries.insertNotas, [studentId, n1, n2, n3, n4, media]);
            } catch (error) {
                console.log(error);
                return res.status(500).send('Sorry, Internal Server Error');
            }

            return res.status(201).send();
        };
    };

    async getAll (req: Request, res: Response) {
        const allInfos = (await client.query(queries.getAll)).rows; 
        return res.json(allInfos);
    }
};

export default new StudentController();