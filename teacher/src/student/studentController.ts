import { Request, Response } from "express";
import client from "../database/connection";
import queries from "./queries";

class StudentController {
    async createAndUpdate (req: Request, res: Response) {
        const { name, n1, n2, n3, n4, id: idAluno } = req.body;

        if (idAluno) { 

            if (!n1 || !n2 || !n3 || !n4) { 
                return res.status(400).send('Set all the notes to update');
            }   
            
            const media = ((n1 + n2 + n3 + n4) / 4).toFixed(2);

            client.query(queries.updateNotas, [idAluno, n1, n2, n3, n4, media], err => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Sorry, Internal Server Error');
                }
            });

            return res.status(204).send();

        } else { 

            if (!name || !n1 || !n2 || !n3 || !n4) { 
                return res.status(400).send('Set all infos');
            } 

            try {
                await client.query(queries.insertStudent, [name]);

                const newStudentId = (await client.query(queries.getNewStudentId)).rows[0].max;

                const media = ((n1 + n2 + n3 + n4) / 4).toFixed(2);

                await client.query(queries.insertNotas, [newStudentId, n1, n2, n3, n4, media]);
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