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
    let item = {
        name_item: req.body.name_item,
        quantity: req.body.quantity,
        location: req.body.location
    };
    mysql.getConnection(( error, connection ) => {
        if ( error ) {
            return res.status( 500 ).send({
                error: error
            });
        };
        connection.query(
            'INSERT INTO items (name_item, quantity, location) VALUES (?,?,?);',
            [
                item.name_item, 
                item.quantity, 
                item.location
            ],
            ( error, result, field ) => {
                connection.release();
                if ( error ) { return res.status( 500 ).send({ error: error, response: null }) };
                res.status( 201 ).send({
                    mensage: 'Item inserted successfully!!!',
                    id_tem: result.InsertId
                });
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