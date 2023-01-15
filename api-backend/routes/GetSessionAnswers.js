const express = require('express');
const router = express.Router();

router 
    .route("/getsessionanswers/:questionnaireID/:session")
    .get((req,res) => {

    })

    module.exports = router