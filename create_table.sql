CREATE TABLE Loja(
	loja_id int PRIMARY KEY auto_increment,
    nome varchar(100) NOT NULL,
    endereco varchar(255),
    melhor_hora varchar(20),
    logotipo varchar(255),
    atend_especial varchar(50)
);
CREATE TABLE Pessoa (
	pessoa_id int PRIMARY KEY auto_increment,
    nome varchar(100) NOT NULL,
    tipo varchar(20),
    telefone varchar(50),
    endereco varchar(255),
    foto varchar(255),
    senha varchar(30)
);
CREATE TABLE Fila(
	fila_id int PRIMARY KEY auto_increment,
    posicao int NOT NULL,
    avaliacao varchar(255),
    loja int REFERENCES Loja(loja_id),
    pessoa int REFERENCES Pessoa(pessoa_id)
);
INSERT INTO Pessoa (nome,tipo,senha,foto)VALUES('adm','Admin','123','assets/img/pessoas/foto_masc_3.png')