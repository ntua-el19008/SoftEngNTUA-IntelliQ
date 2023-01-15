const express = require('express');
const router = express.Router();
const pool = require('../db_connect');
const promisePool = pool.promise();
const { parse } = require('json2csv');


router.get("/", (req, res) => { 
    // Return 400 (Bad Request) if no questionnaireID is provided
    res.status(400).json({error: "Missing required parameter: questionnaireID"});
        return;
  });

router.get("/:questionnaireID", async (req, res) => {
    try {
        const { questionnaireID } = req.params;      
        // Get questionnaire id, title
        const questionnaire_query = `SELECT QQID AS questionnaireID, Title AS questionnaireTitle FROM Questionnaire WHERE QQID = '${questionnaireID}';`;
        const [questionnaire_result, _fields] = await promisePool.query(questionnaire_query, [questionnaireID]);
        if (questionnaire_result.length === 0) {
            res.status(402).json({ error: "No data" });
            console.log("No Questionnaire with that QQID was found.");
            return;
        }
        // Get keywords
        const keyword_query = `SELECT Keyword FROM keyword WHERE QQID = '${questionnaireID}';`;
        const [keyword_result, _keyword_fields] = await promisePool.query(keyword_query, [questionnaireID]);
        let keyword_array = [];
        for (let i = 0; i < keyword_result.length; i++) {
            keyword_array.push(keyword_result[i].Keyword);
        }

        // Get questions and parse query results
        const question_query = `SELECT QID as qid, Qtext as qtext, Mandatory as required, Personal as type FROM Question WHERE QQID = '${questionnaireID}';`;
        const [question_result, _question_fields] = await promisePool.query(question_query, [questionnaireID]);
        let question_array = [];
        for (let i = 0; i < question_result.length; i++) {
            question_array.push(question_result[i]);
            console.log(question_result[i]['required'].toString(start = 1, end = 1));
            if (question_result[i]['required']) {
                question_result[i]['required'] = "true";
            } else {
                question_result[i]['required'] = "false";
            }

            if (question_result[i]['type']) {
                question_result[i]['type'] = "profile";
            } else {
                question_result[i]['type'] = "question";
            }
        }

        // Create result JSON object
        const result = {
            "questionnaireID": questionnaire_result[0].questionnaireID,
            "questionnaireTitle": questionnaire_result[0].questionnaireTitle,
            "keywords": keyword_array,
            "questions": question_array
        }

        if (req.query.format === "csv") {
            const data_fields = ['questionnaireID', 'questionnaireTitle', 'keywords', 'questions'];
            const data_opts = { data_fields };
            var result_csv = parse(result, data_opts);
            res.status(200).send(result_csv);
            console.log("Questionnaire query successful! (CSV)");
        }
        else {
            // Send result
            res.status(200).send(result);
            console.log("Questionnaire query successful!");
        }

    } catch (err) {
        res.status(500).json({ error: "Internal error" });
        console.log(err);
        return;
    }
})
module.exports = router