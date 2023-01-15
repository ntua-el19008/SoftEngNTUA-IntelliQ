const express = require('express');
const router = express.Router();
const pool = require('../db_connect');
const promisePool = pool.promise();

router
    .get("/:questionnaireID", async (req,res) => {
        try {
            const { questionnaireID } = req.params;
            const query = `SELECT * FROM Questionnaire WHERE QQID = '${questionnaireID}';`;	
            console.log(query);
            const [[result], _fields] = await promisePool.query(query, [questionnaireID]);
            //console.log(result);
            //q: how do I convert result to JSON format?
            //a: https://stackoverflow.com/questions/20081136/convert-mysql-query-result-to-json
            
            res.status(200).send(result);         
            console.log("Questionnaire query successful!");
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching questionnaire data' });
        }
    })

    module.exports = router