const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routeItems = require('./routes/items');
const routeOrders = require('./routes/orders');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

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