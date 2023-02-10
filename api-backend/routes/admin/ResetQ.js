const express = require('express');
const router = express.Router();
const pool = require('../../db_connect');
const promisePool = pool.promise();

router
    .route("/:questionnaireID")
    .post(async (req,res) => {
        const qqid = req.params.questionnaireID;

        // Get a connection from the promise pool
        const connection = await promisePool.getConnection();

        const participant_query = `delete from Participant WHERE QQID = '${qqid}'`;
        const answers_query = `delete from Answer WHERE QQID = '${qqid}'`;
        try {
            await connection.query(participant_query);
            await connection.query(answers_query);

            res.status(200).send("Questionnaire reset successful!");
            console.log("Questionnaire reset successful!");
        }
        catch (err) {
            res.status(500).json({ error: err });
            console.log(err);
            return;
        }

    })

    module.exports = router;