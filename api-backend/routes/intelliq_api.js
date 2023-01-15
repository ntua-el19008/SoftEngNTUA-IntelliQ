const express = require('express');
const router = express.Router();

router.use("/admin", require('../admin/admin.js'));

router
    .route("/questionnaire/:questionnaireID")
    .get((req,res) => {

    })

router  
    .route("/question/:questionnaireID/:questionID")
    .get((req,res) => {

    })

router
    .route("/doanswer/:questionnaireID/:questionID/:session/:optionID")
    .post((req,res) => {

    })

router 
    .route("/getsessionanswers/:questionnaireID/:session")
    .get((req,res) => {

    })

router
    .route("/getquestionanswers/:questionnaireID/:questionID")
    .get((req,res) => {

    })

    module.exports = router