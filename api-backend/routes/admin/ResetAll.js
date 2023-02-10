const express = require('express');
const router = express.Router();
const fs = require('fs');
const pool = require('../../db_connect');
const promisePool = pool.promise();

router
    .route("/")
    .post(async (req, res) => {
        // Get a connection from the promise pool
        const connection = await promisePool.getConnection();

        try {
            // Read the SQL script
            const sql = await fs.promises.readFile('../data/tables.sql', 'utf8');

            // Split the script into separate statements
            let statements = sql.split(';');
            
            // Execute each statement individually
            for (let statement of statements) {
                if (statement === '\r\n') continue;
                
                await connection.query(statement);
            }

            res.status(200).send("Database reset successful!");
            console.log("Database reset successful!");
        } catch (err) {
            res.status(500).json({ error: err });
            console.log(err);
            return;
        }
    });

module.exports = router;
