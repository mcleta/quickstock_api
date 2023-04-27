const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Retorna lista de pedidos do banco
router.get('/', ( req, res, next ) => {
    res.status(200).send({
        mensage: 'ok orrrrrk'
    });
});

// Retorna um pedido com base no numero
router.get('/num_order=:num_order', ( req, res, next ) => {
    const num_order = req.params.num_order;
    if (num_order != null) {
        res.status(200).send({
            mensage: 'ok orrrrrk'
        });
    } else {
        res.status(404).send({
            mensage: 'Pedido não encontrado'
        });
    }
});

// Insere um pedido no banco
router.post('/', ( req, res, next ) => {
    let myuuid = uuidv4();
    const order = {
        num_order: myuuid,
        client: req.body.client,
        employee: req.body.employee,
        itens: req.body.itens,
        quantity: req.body.quantity,
        status: req.body.status
    };

    res.status(201).send({
        mensage: 'order insert',
        iOrder: order
    });
});

// Atualiza um pedido no banco
router.patch('/', ( req, res, next ) => {
    res.status(200).send({
        mensage: 'ok offffk'
    });
});

// Deleta um pedido no banco
router.delete('/', ( req, res, next ) => {
    res.status(204).send({
        mensage: 'ok ohhhhhk'
    });
});

module.exports = router;