const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const connection = require("./database/database.js");
const Pergunta = require("./database/models/Pergunta.js");
const Resposta = require('./database/models/Resposta')

//Database
connection
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!')
  })
  .catch((err) => {
    console.log(err)
  })

//Instânciando o EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Linhas de configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  //raw:true traz somente os registros da tabela, sem informações adicionais.
  Pergunta.findAll({ raw: true, order: [
    ['id','DESC'] //fazendo um order by desc
  ]}).then((perguntas) => {
    res.render("index", {
      //exportando variáveis perguntas pro index.ejs
      perguntas: perguntas
    });
  });
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar.ejs')
});

app.post('/salvarPergunta', (req, res) => {
  const { titulo, descricao } = req.body;
  Pergunta.create({
    titulo,
    descricao
  }).then(() => {
    res.redirect('/')
  })
});

app.get('/pergunta/:id', (req, res) => {
  const { id }  = req.params;
  Pergunta.findOne({ 
    where: {
      id: id
    },
  }).then((pergunta) => {
    if(pergunta != undefined) {
      Resposta.findAll({
        where: {
          perguntaId: pergunta.id
        },
        order: [
          ['id', 'DESC']
        ]
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas      
        });

      });
    } else {
      res.redirect("/");
    }
  })
});

app.post("/responder", (req, res) => {
  const corpo = req.body.corpo;
  const perguntaId = req.body.pergunta;

  Resposta.create({
    corpo: corpo,
    perguntaId : perguntaId
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`)
  })
});
  
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

