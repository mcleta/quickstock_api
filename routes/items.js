const express = require('express');
const router = express.Router();

// Retorna lista de itens no banco
router.get('/', ( rep, res, next ) => {
    res.status(200).send({
        mensage: 'ok orrrrrk'
    });
});

// Retorna um produto com base no nome
router.get('/name=:name_item', ( rep, res, next ) => {
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
router.post('/', ( rep, res, next ) => {
    res.status(201).send({
        mensage: 'ok odddk'
    });
});

// Atualiza um item no banco
router.patch('/', ( rep, res, next ) => {
    res.status(200).send({
        mensage: 'ok offffk'
    });
});

// Deleta um item no banco
router.delete('/', ( rep, res, next ) => {
    res.status(204).send({
        mensage: 'Item excluido com sucesso'
    });
});

module.exports = router;