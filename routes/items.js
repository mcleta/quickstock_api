const express = require('express');
const router = express.Router();

// Retorna lista de itens no banco
router.get('/', ( req, res, next ) => {
    res.status(200).send({
        mensage: 'ok orrrrrk'
    });
});

// Retorna um produto com base no nome
router.get('/name=:name_item', ( req, res, next ) => {
    const name_item = req.params.name_item;
    if (name_item != null) {
        res.status(200).send({
            mensage: 'ok orrrrrk'
        });
    } else {
        res.status(404).send({
            mensage: 'Item não encontrado'
        });
    }
});

// Insere um item no banco
router.post('/', ( req, res, next ) => {
    const item = {
        name_item: req.body.name_item,
        quantity: req.body.quantity,
        location: req.body.location
    };

    res.status(201).send({
        mensage: 'item insert',
        iItem: item
    });
});

// Atualiza um item no banco
router.patch('/', ( req, res, next ) => {
    res.status(200).send({
        mensage: 'ok offffk'
    });
});

// Deleta um item no banco
router.delete('/', ( req, res, next ) => {
    res.status(204).send({
        mensage: 'Item excluido com sucesso'
    });
});

module.exports = router;