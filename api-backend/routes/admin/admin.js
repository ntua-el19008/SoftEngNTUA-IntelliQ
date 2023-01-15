const express = require('express');
const router = express.Router();

router.use("/healthcheck",require("./Healthcheck"))
router.use("/questionnaire_upd",require("./QuestionnaireUpd"))
router.use("/resetall",require("./ResetAll"))
router.use("/resetq/:questionnaireID",require("./ResetQ"))

module.exports = router;