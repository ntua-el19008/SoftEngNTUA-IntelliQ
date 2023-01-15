const express = require('express');
const router = express.Router();

router
    .route("/doanswer/:questionnaireID/:questionID/:session/:optionID")
    .post((req,res) => {

    })

    module.exports = router