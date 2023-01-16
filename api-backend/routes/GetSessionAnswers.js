const express = require('express');
const router = express.Router();
const pool = require('../db_connect');
const promisePool = pool.promise();
const { parse } = require('json2csv');

router.get("/", (req, res) => {
    // Return 400 (Bad Request) if no sessionID or questionnaireID is provided
    res.status(400).json({ error: "Missing required parameters: questionnaireID, questionID" });
    return;
});

router.get("/:questionnaireID", (req, res) => {
    // Return 400 (Bad Request) if no sessionID or questionnaireID is provided
    res.status(400).json({ error: "Missing required parameter: sessionID" });
    return;
});

router.get("/:questionnaireID/:session", async (req, res) => {
    try {
        const { questionnaireID, session } = req.params;
        // Get questionnaire id, title
        const session_query =
        `SELECT QID as qID, ChoiceID AS ans 
        FROM answer 
        WHERE SessionID = '${session}' AND QQID = '${questionnaireID}';`;

        const [session_result, _fields] = await promisePool.query(session_query, [questionnaireID]);
        if (session_result.length === 0) {
            res.status(402).json({ error: "No data" });
            console.log("No Session with that QQID and sessionID was found.");
            return;
        }

        // Create result JSON object
        const result = {
            "questionnaireID": questionnaireID,
            "session": session,
            "answers": session_result
        }

        // Return result as JSON or CSV
        if (req.query.format === "csv") {
            const data_fields = ['questionnaireID', 'session', 'answers'];
            const data_opts = { data_fields };
            var result_csv = parse(result, data_opts);
            res.status(200).send(result_csv);
            console.log("Get session query successful! (CSV)");
        } else {
            res.status(200).send(result);
            console.log("Get session query successful! (JSON)");
        }
        
    } catch (err) {
        res.status(500).json({ error: "Internal error" });
        console.log(err);
        return;
    }
});
module.exports = router