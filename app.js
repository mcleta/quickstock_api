const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routeItems = require('./routes/items');
const routeOrders = require('./routes/orders');

// Ferramentas para monitoramento e restrição de emvio de dades
app.use(morgan("dev")); // monitoramento
app.use(bodyParser.urlencoded({ extends: false })); // restrição de envio: dados simples
app.use(bodyParser.json()); // tipo de restrição: json

app.use(( rep, res, next ) => {
    // permissão de origem de controle de acesso, restringe qual a url base para ter acesso a api
    res.header('Access-Control-Allow-Origin', '*');
    // restições de cabeçalho
    res.header(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE');
        return res.status(200).send({});
    }
    next();
});

app.use('/items', routeItems);
app.use('/orders', routeOrders);

// Tratativa para quando nenhuma rota é encontrada
app.use(( rep, res, next ) => {
    const erro = new Error('Not Found');
    erro.status = 404;
    next(erro);
});

app.use(( error, rep, res, next ) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensage: error.mensage
        }
    });
});

module.exports = app;