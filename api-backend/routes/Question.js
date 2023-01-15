const express = require('express');
const router = express.Router();
const pool = require('../db_connect');
const promisePool = pool.promise();
const { parse } = require('json2csv');

router.get("/", (req, res) => { 
    // Return 400 (Bad Request) if no questionID or questionnaireID is provided
    res.status(400).json({error: "Missing required parameters: questionnaireID, questionID"});
        return;
  });

  router.get("/:questionnaireID", (req, res) => { 
    // Return 400 (Bad Request) if no questionID or questionnaireID is provided
    res.status(400).json({error: "Missing required parameter: questionID"});
        return;
  });

router.get("/:questionnaireID/:questionID", async (req, res) => {
    try {
        const { questionnaireID, questionID } = req.params;      
        // Get questionnaire id, title
        const question_query = 
        `SELECT QID as qID, QQID AS questionnaireID, Qtext AS questionnaireTitle, Mandatory AS required, Personal AS type 
        FROM Question 
        WHERE QQID = '${questionnaireID}' AND QID = '${questionID}';`;

        const [question_result, _fields] = await promisePool.query(question_query, [questionnaireID]);
        if (question_result.length === 0) {
            res.status(402).json({ error: "No data" });
            console.log("No Question with that QID and QQID was found.");
            return;
        }

        if (question_result[0]['required']) {
            question_result[0]['required'] = "true";
        } else {
            question_result[0]['required'] = "false";
        }

        if (question_result[0]['type']) {
            question_result[0]['type'] = "profile";
        } else {
            question_result[0]['type'] = "question";
        }

        // Get options of question
        const option_query = `SELECT ChoiceID AS optID, ChoiceText AS opttxt, NextQID AS nextqID 
        FROM Choice 
        WHERE QQID = '${questionnaireID}' AND QID = '${questionID}';`;
        const [option_result, _option_fields] = await promisePool.query(option_query, [questionnaireID]);
        let option_array = [];
        for (let i = 0; i < option_result.length; i++) {
            option_array.push(option_result[i]);
        }

        // Create result JSON object
        const result = {
            "questionnaireID": question_result[0].questionnaireID,
            "qID": question_result[0].questionnaireTitle,
            "qtext": question_result[0].qtext,
            "required": question_result[0].required,
            "type": question_result[0].type,
            "options": option_array
        }

        if (req.query.format === "csv") {
            const data_fields = ["questionnaireID", "qID", "qtext", "required", "type", "options"];
            const data_opts = { data_fields };
            var result_csv = parse(result, data_opts);
            res.status(200).send(result_csv);
            console.log("Question query successful! (CSV)");
        }
        else {
            // Send result
            res.status(200).send(result);
            console.log("Question query successful! (JSON)");
        }

    } catch (err) {
        res.status(500).json({ error: "Internal error" });
        console.log(err);
        return;
    }
})
module.exports = router