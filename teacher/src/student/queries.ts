class Queries {
    insertStudent = 'INSERT INTO aluno (name) VALUES ($1) RETURNING *';
    insertNotas = 'INSERT INTO notas (idaluno, n1, n2, n3, n4, media) VALUES ($1, $2, $3, $4, $5, $6)';
    updateNotas = 'UPDATE notas SET n1 = $2, n2 = $3, n3 = $4, n4 = $5, media = $6 WHERE idaluno = $1';

    getAll = "SELECT a.*, n.n1, n.n2, n.n3, n.n4, n.media, CASE WHEN n.media < 4 THEN 'REPROVADO' when n.media < 6 THEN 'RECUPERAÇÃO' ELSE 'APROVADO' END AS Avaliacao FROM aluno a, notas n WHERE a.id  = n.idaluno";
    getStudentById = 'SELECT * FROM  aluno WHERE id = $1';
}

export default new Queries();