const express = require('express');
const router = express.Router();

router 
    .route("/healthcheck")
    .get((req,res) =>{

    })

router  
    .route("/questionnaire_upd")
    .post((req,res) => {

    })

router
    .route("/resetall")
    .post((req,res) => {

    })

router
    .route("/resetq/:questionnaireID")
    .post((req,res) => {

    })

router  .route("")

module.exports = router;