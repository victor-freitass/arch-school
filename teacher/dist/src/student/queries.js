"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        this.insertStudent = 'INSERT INTO aluno (name) VALUES ($1) RETURNING *';
        this.insertNotas = 'INSERT INTO notas (idaluno, n1, n2, n3, n4, media) VALUES ($1, $2, $3, $4, $5, $6)';
        this.updateNotas = 'UPDATE notas SET n1 = $2, n2 = $3, n3 = $4, n4 = $5, media = $6 WHERE idaluno = $1';
        this.getAll = "SELECT a.*, n.n1, n.n2, n.n3, n.n4, n.media, CASE WHEN n.media < 4 THEN 'REPROVADO' when n.media < 6 THEN 'RECUPERAÇÃO' ELSE 'APROVADO' END AS Avaliacao FROM aluno a, notas n WHERE a.id  = n.idaluno";
        this.getStudentById = 'SELECT * FROM  aluno WHERE id = $1';
    }
}
exports.default = new Queries();
