const express = require('express');
const router = express.Router();

//DB connection
const pool = require('../modules/pool.js')

//GET
router.get('/', (req, res) => {
    pool.query('SELECT * FROM "to-do list" ORDER BY "id";')

        .then(function (dbRes) {
            res.send(dbRes.rows);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);

        });
});//end GET

//POST
router.post('/', (req, res) => {
    console.log('req.body', req.body);
    let queryText = `
    INSERT INTO "to-do list" ("task")
    VALUES ($1);
    `;
    //query the database
    let queryArray = [
        req.body.task,
    ];
    console.log('queryText is:', queryText);
    pool.query(queryText, queryArray)
        //get back DB results
        .then(function (dbRes) {
            res.sendStatus(201);
        })
        //or handle DB errors
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);

        });

});//end POST

//PUT
router.put('/:id', (req, res) => {
    let taskId = req.params.id;
    let sqlText = `UPDATE "to-do list" SET "complete" = 'TRUE' WHERE "id" = $1`;
    pool.query(sqlText, [taskId])
        .then((resDB) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});//end PUT

//DELETE

module.exports = router;