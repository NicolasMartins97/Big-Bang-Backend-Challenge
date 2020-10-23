// Vars
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3080;

// Links
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// Templates EJS
app.use(express.static(`${__dirname}/`));
app.set('views', 'src/');
app.set('view engine', 'ejs');

// Iniciar o Servidor
app.listen(port, function runServer() {
  console.log(`Servidor rodando na Porta: ${port}`);
});
