//Imports
const express = require('express');
const { emitWarning } = require('process');
const app = express();
app.use(express.json());

//Autores
let autores = [];
let idAutores = 1;

app.get('/autores', (req, res) => {
    res.json(autores);
});

app.post('/autores', (req, res) => {
    const idAutor = idAutores;
    const nomeAutor = req.body.nome;
    const sobreNomeAutor = req.body.sobreNome;

    //Validações
    if(nomeAutor.length < 3 || nomeAutor > 100){
        res.status(400).json({message: "Nome deve conter entre 3 e 100 caracteres"});
        return;
    }

    let novoAutor = {
        id: idAutor,
        nome: nomeAutor,
        sobreNome: sobreNomeAutor
    };
    autores.push(novoAutor);
    idAutores++;
    res.status(201).json({message: "Autor cadastrado com sucesso"});

});

//Livros
let livros = [];

app.get('/autores/:id/livros', (req, res) => {
    const index = livros.findIndex((autor) => autor.autor == req.params.id);
    if(index == -1){
        res.status(404).json({message: "Nenhum livro encontrado para esse autor"});
    }
    else{
        res.status(200).json(livros[index]);
    }
});

app.post('/autores/:id/livros', (req, res) => {
    const idAutor = req.params.id;
    const tituloLivro = req.body.titulo;
    const anoPublicacao = req.body.publicacao;

    //Validações
    if(tituloLivro.length < 3 || tituloLivro > 150){
        res.status(400).json({message: "Título deve conter entre 3 e 150 caracteres"});
        return;
    }

    let novoLivro = {
        autor: idAutor,
        titulo: tituloLivro,
        ano: anoPublicacao
    };

    const index = autores.findIndex((autor) => autor.id == req.params.id);
    if(index == -1){
        res.status(404).json({message: "Autor não encontrado"});
    }
    else{
        livros.push(novoLivro);
        res.status(201).json({message: "Livro cadastrado com sucesso"});
    }
});

//Porta do serviço
app.listen('3000', () => {
    console.log('servidor rodando na porta 3000');
});