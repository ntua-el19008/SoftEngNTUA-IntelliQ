const express = require('express');
const router = express.Router();

router.use("/admin", require('./admin/admin.js'));
router.use("/doanswer/:questionnaireID/:questionID/:session/:optionID",require("./DoAnswer"))
router.use("/questionnaire/:questionnaireID",require("./Questionnaire"))
router.use("/question/:questionnaireID/:questionID", require("./Question"))
router.use("/getsessionanswers/:questionnaireID/:session",require("./GetSessionAnswers"))
router.use("/getquestionanswers/:questionnaireID/:questionID",require("./GetQuestionAnswers"))

module.exports = router