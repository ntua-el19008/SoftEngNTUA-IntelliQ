const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const pool = require('../../db_connect');
const promisePool = pool.promise();

function showqueries(jsonstr) {
    var qq = JSON.parse(jsonstr);

    var qq_query = "INSERT INTO Questionnaire (QQID, Title, Mask) VALUES ('" + qq.questionnaireID + "', '" + qq.questionnaireTitle + "', '" + qq.qqmask + "');";

    var keywords_queries = [];
    for (var i = 0; i < qq.keywords.length; i++) {
        var query = "INSERT INTO Keyword (QQID, Keyword) VALUES ('" + qq.questionnaireID + "', '" + qq.keywords[i] + "');";
        keywords_queries.push(query);
    }

    var question_queries = [];
    var option_queries = [];
    for (var i = 0; i < qq.questions.length; i++) {
        var mandatory = "false";
        var profile = "false";

        if (qq.questions[i].required === "TRUE") mandatory = "true";
        if (qq.questions[i].type === "profile") profile = "true";

        var q_query = "INSERT INTO Question (QID, QQID, Qtext, Mandatory, Personal) VALUES ('" + qq.questions[i].qID + "', '" + qq.questionnaireID + "', '" + qq.questions[i].qtext + "', " + mandatory + ", " + profile + ");";
        question_queries.push(q_query);

        for (var j = 0; j < qq.questions[i].options.length; j++) {
            var opt_query = "INSERT INTO Choice (ChoiceID, QQID, QID, ChoiceText, NextQID) VALUES ('" + qq.questions[i].options[j].optID + "', '" + qq.questionnaireID + "', '" + qq.questions[i].qID + "', '" + qq.questions[i].options[j].opttxt + "', '" + qq.questions[i].options[j].nextqID + "');";
            option_queries.push(opt_query);
        }
    }

    query_arr = [];
    query_arr.push(qq_query);
    query_arr.push(keywords_queries);
    query_arr.push(question_queries);
    query_arr.push(option_queries);
    return query_arr;
}

router
    .route("/")
    .post(upload.single('jsonFile'), async (req, res) => {
        try {
            if (req.file) {
                var jsonstr = req.file.buffer.toString();
                var query_arr = showqueries(jsonstr).flat();;

                for (var i = 0; i < query_arr.length; i++) {
                    try {
                        query = query_arr[i];
                        const [result, _fields] = await promisePool.query(query);
                        console.log(result);
                    } catch (error) {
                        res.status(400).json({ error: error.message });
                        console.log("Bad request/MySQL error");
                        return;
                    }
                }
                res.status(200).json({ message: 'Answer added successfully' });
                return;
            }
            else {
                res.status(400).json({ error: "No file was given!" });
                console.log("Bad request/No file");
                return;
            }
        }
        catch (err) {
            res.status(500).json({ error: "Internal error" });
            console.log(err);
            return;
        }
    });

module.exports = router;