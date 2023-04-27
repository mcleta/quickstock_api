const express = require('express');
const router = express.Router();

// Retorna lista de pedidos do banco
router.get('/', ( rep, res, next ) => {
    res.status(200).send({
        mensage: 'ok orrrrrk'
    });
});

// Retorna um pedido com base no numero
router.get('/num_order=:num_order', ( rep, res, next ) => {
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
router.post('/', ( rep, res, next ) => {
    res.status(201).send({
        mensage: 'ok odddk'
    });
});

// Atualiza um pedido no banco
router.patch('/', ( rep, res, next ) => {
    res.status(200).send({
        mensage: 'ok offffk'
    });
});

// Deleta um pedido no banco
router.delete('/', ( rep, res, next ) => {
    res.status(204).send({
        mensage: 'ok ohhhhhk'
    });
});

module.exports = router;