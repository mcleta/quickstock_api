const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna lista de itens no banco
router.get('/', ( req, res, next ) => {
    mysql.getConnection(( error, connection ) => {
        if ( error ) { return res.status( 500 ).send({ error: error }) };
        connection.query(
            'SELECT * FROM items',
            ( error, result, field ) => {
                connection.release();
                if ( error ) { return res.status( 500 ).send({ error: error }) };
                
                const response = {
                    length: result.length,
                    items: result.map(item => {
                        return {
                            itemId: item.id_item,
                            name_item: item.name_item,
                            quantity: item.quantity,
                            location: item.location,
                            request: {
                                type: 'GET',
                                description: 'Retorna os detalhes de um item específico',
                                url: 'localhost:3000/items/' + item.id_item
                                // url: process.env.URL_API + 'items/' + prod.itemId
                            }
                        }
                    })
                }

                return res.status( 200 ).send({ response }); 
            }
        );
    });
});

// Retorna um produto com base no id
router.get('/:id_item', ( req, res, next ) => {
    let id_item = req.params.id_item;
    mysql.getConnection(( error, connection ) => {
        if ( error ) { return res.status( 500 ).send({ error: error }) };
        connection.query(
            'SELECT * FROM items WHERE id_item = ?',
            [ id_item ],
            ( error, result, field ) => {
                connection.release();
                if ( error ) { return res.status( 500 ).send({ error: error, message: "Name not found" }) };
                return res.status( 200 ).send({ response: result }); 
            }
        );
    });
});

// Retorna um produto com base no nome
router.get('/name=:name_item', ( req, res, next ) => {
    let name_item = req.params.name_item;
    mysql.getConnection(( error, connection ) => {
        if ( error ) { return res.status( 500 ).send({ error: error }) };
        connection.query(
            'SELECT * FROM items WHERE name_item = ?',
            [ name_item ],
            ( error, result, field ) => {
                connection.release();
                if ( error ) { return res.status( 500 ).send({ error: error, message: "Name not found" }) };
                return res.status( 200 ).send({ response: result }); 
            }
        );
    });
});

// Insere um item no banco
router.post('/', ( req, res, next ) => {
    // let item = {
    //     name_item: req.body.name_item,
    //     quantity: req.body.quantity,
    //     location: req.body.location
    // };
    mysql.getConnection(( error, connection ) => {
        if ( error ) { return res.status( 500 ).send({ error: error }) };
        connection.query(
            'INSERT INTO items (name_item, quantity, location) VALUES (?,?,?)',
            [ req.body.name_item, req.body.quantity, req.body.location, ],
            ( error, result, field ) => {
                connection.release();
                if ( error ) { return res.status( 500 ).send({ error: error, response: null }) };

                const response = {
                    message: 'Item inserido com sucesso',
                    createdProduct: {
                        item_id: result.insertId,
                        name_item: req.body.name_item,
                        quantity: req.body.quantity,
                        location: req.body.location,
                        request: {
                            type: 'POST',
                            description: 'Retorna todos as caracteristicas do item',
                            url: 'localhost:3000/items/'
                        }
                    }
                };

                res.status( 201 ).send({ response });
            }
        );
    });
});

// Atualiza um item no banco
router.patch('/', ( req, res, next ) => {
    let up_item = {
        name_item: req.body.name_item,
        quantity: req.body.quantity,
        location: req.body.location,
        id_item: req.body.id_item
    };
    mysql.getConnection(( error, connection ) => {
        if ( error ) { return res.status( 500 ).send({ error: error }) };
        connection.query(
            `
                UPDATE items 
                    SET name_item   = ?, 
                        quantity    = ?, 
                        location    = ?
                    WHERE id_item   = ?
            `,
            [
                up_item.name_item, 
                up_item.quantity, 
                up_item.location,
                up_item.id_item
            ],
            (error, result, field) => {
                connection.release();
                if ( error ) { return res.status( 500 ).send({ error: error, response: null }) };
                return res.status( 202 ).send({
                    mensage: 'Successfully changed item!!!',
                    id_tem: result.InsertId
                });
            }
        );
    });
});

// Deleta um item no banco
router.delete('/', ( req, res, next ) => {
    let id_exclude_item = req.body.id_item;
    mysql.getConnection(( error, connection ) => {
        if ( error ) { return res.status( 500 ).send({ error: error }) };
        connection.query(
            'DELETE FROM items WHERE id_item = ?',
            [ id_exclude_item ],
            ( error, result, field ) => {
                connection.release();
                if ( error ) { return res.status( 500 ).send({ error: error, message: "Item not found" }) };
                return res.status( 202 ).send({ message: "Successfully deleted item!!!"}); 
            }
        );
    });
});

module.exports = router;