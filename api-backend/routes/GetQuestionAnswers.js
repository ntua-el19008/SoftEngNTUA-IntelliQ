const express = require('express');
const router = express.Router();

router
    .route("/getquestionanswers/:questionnaireID/:questionID")
    .get((req,res) => {

    })

    module.exports = router