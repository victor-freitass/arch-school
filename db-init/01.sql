CREATE TABLE aluno (
	id SERIAL primary key,
	name varchar(80)
);

CREATE TABLE notas (
    id SERIAL PRIMARY KEY,
    idaluno integer references aluno (id),
    n1 real,
    n2 real,
    n3 real,
    n4 real,
    media real
);