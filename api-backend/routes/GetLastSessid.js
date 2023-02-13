const express = require('express');
const router = express.Router();
const pool = require('../db_connect');
const promisePool = pool.promise();
const { parse } = require('json2csv');

/**
 * @swagger
 * /intelliq_api/getsessionanswers/{questionnaireID}/{session}:
 *   get:
 *     summary: Get last session ID
 *     description: Returns the lexicographically last session ID
 *     produces:
 *       - application/json
 *       - text/csv
 *     parameters:
 *       - name: format
 *         description: Response format (json or csv)
 *         in: query
 *         required: false
 *         type: string
 *         enum: [json, csv]
 *         default: json
 *     responses:
 *       200:
 *         description: Returns the last sessid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionID:
 *                   type: string
 *           text/csv:
 *             schema:
 *               type: string
 *       400:
 *         description: Returned if required parameters are missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       402:
 *         description: Returned if no data is found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Returned if internal error occurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

router.get("/", async (req, res) => {
    try {
        const session_query =
            `SELECT SessionID as sessID
        FROM Participant 
        ORDER BY sessID DESC
        LIMIT 1;`;

        const [session_result, _fields] = await promisePool.query(session_query);
        if (session_result.length === 0) {
            res.status(402).json({ error: "No data" });
            console.log("No sessionID was found.");
            return;
        }

        // Create result JSON object
        const result = {
            "sessionID": session_result
        }

        // Return result as JSON or CSV
        if (req.query.format === "csv") {
            const data_fields = ['questionnaireID', 'session', 'answers'];
            const data_opts = { data_fields };
            var result_csv = parse(result, data_opts);
            res.status(200).send(result_csv);
            console.log("Get sessionID query successful! (CSV)");
        } else {
            res.status(200).send(result);
            console.log("Get sessionID query successful! (JSON)");
        }

    } catch (err) {
        res.status(500).json({ error: "Internal error" });
        console.log(err);
        return;
    }
});
module.exports = router