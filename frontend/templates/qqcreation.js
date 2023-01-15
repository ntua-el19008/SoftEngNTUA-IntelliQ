var questionCount = 1;
var optionCount = { 1: 1 };

function addQuestion() {
    questionCount++;
    optionCount[questionCount] = 1;

    var newQuestion = document.createElement("div");
    newQuestion.innerHTML = `
			<div id="question${questionCount}">
				<h1 style="font-size: 1.5em;">Question ${questionCount}</h1>
				<label style="font-size: 1.2em;">Question ID</label><br />
                <input type="text" name="qid" /><br />
                <label style="font-size: 1.2em;">Question text</label><br />
                <input type="text" name="qtext" /><br /> <br />
                <label style="font-size: 1.2em;">Is the question mandatory?</label><br />
                <form id="type">
                    <label for="TRUE">TRUE</label>
                    <input type="radio" id="TRUE" name="mandatory" value="TRUE">
                    <br>
                    <label for="FALSE">FALSE</label>
                    <input type="radio" id="FALSE" name="mandatory" value="FALSE">
                    <br><br>
                </form>
                <label style="font-size: 1.2em;">Type of question</label><br />
                <form id="type">
                    <label for="profile">PRofile</label>
                    <input type="radio" id="profile" name="type" value="profile">
                    <br>
                    <label for="question">Question</label>
                    <input type="radio" id="question" name="type" value="question">
                    <br><br>
                </form>
                <input type="button" value="Remove Question" onclick="removeQuestion(${questionCount})" /><br /><br />
                <input type="button" value="+" onclick="addOption(${questionCount})" /><br />
				<div id="optionsContainer${questionCount}">
				<div id="option1">
                    <label style="font-size: 1.2em;">Option ID</label><br />
                    <input type="text" name="opt" /><br />
                    <label style="font-size: 1.2em;">Option Text</label><br />
                    <input type="text" name="opttxt" /><br />
				</div><br />
				</div>
			</div>
			`;
    var questionContainer = document.getElementById("questionContainer");
    questionContainer.appendChild(newQuestion);
}

function removeQuestion(questionIndex) {
    var questionDiv = document.getElementById(`question${questionIndex}`);
    questionDiv.parentNode.removeChild(questionDiv);

    // adjust the questionCount and optionCount
    questionCount--;
    optionCount.splice(questionIndex, 1);
}

function addOption(questionNum) {
    optionCount[questionNum]++;
    var newOption = document.createElement("div");
    newOption.innerHTML = `
			<div id="option${optionCount[questionNum]}" class="option" idx="${optionCount[questionNum]}">
                <br /><label style="font-size: 1.2em;">Option ID</label><br />
                <input type="text" name="opt" /><br />
                <label style="font-size: 1.2em;">Option Text</label><br />
                <input type="text" name="opttxt" /><br />
                <input type="button" value="Remove Option" onclick="removeOption(this, ${questionNum})" /><br />
			</div>
			`;
    var optionsContainer = document.getElementById("optionsContainer" + questionNum);
    optionsContainer.insertBefore(newOption, optionsContainer.lastChild);
}

function removeOption(el, questionNum) {
    var optionIndex = el.parentNode.getAttribute('idx');
    var optionDiv = document.getElementById(`option${optionIndex}`);
    optionDiv.parentNode.removeChild(optionDiv);

    optionCount[questionNum]--;
}

function parseQuestions() {
    var questions = document.getElementsByTagName("div");
    var questionData = [];
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].id.startsWith("question")) {
            var typeButtons = document.getElementsByName("type");
            var selectedValuetype;
            for (var j = 0; i < typeButtons.length; j++) {
                if (typeButtons[j].checked) {
                    selectedValuetype = typeButtons[j].value;
                    break;
                }
            }

            var mandatoryButtons = document.getElementsByName("mandatory");
            var selectedValuemand;
            for (var j = 0; i < mandatoryButtons.length; j++) {
                if (mandatoryButtons[j].checked) {
                    selectedValuemand = mandatoryButtons[j].value;
                    break;
                }
            }

            var inputs = questions[i].getElementsByTagName("input");
            var qid = "";
            var questionAdded = false;
            for (var j = 0; j < inputs.length; j++) {
                if (inputs[j].name === "qid") {
                    qid = inputs[j].value;
                }
                if (inputs[j].name === "qtext") {
                    if (!questionAdded) {
                        questionData.push({ "qID": qid, "qtext": inputs[j].value, "required": selectedValuemand, "type": selectedValuetype });
                        questionAdded = true;
                    }
                }
            }
            var options = questions[i].getElementsByTagName("div");
            var optionsAdded = [];
            for (var k = 0; k < options.length; k++) {
                if (options[k].id.startsWith("option")) {
                    var optionInputs = options[k].getElementsByTagName("input");
                    var opt = "";
                    var opttxt = "";
                    for (var l = 0; l < optionInputs.length; l++) {
                        if (optionInputs[l].name === "opt") {
                            opt = optionInputs[l].value;
                        }
                        if (optionInputs[l].name === "opttxt") {
                            opttxt = optionInputs[l].value;
                        }
                        if (opt !== "" && opttxt !== "") {
                            var option = opt + opttxt;
                            if (optionsAdded.indexOf(option) === -1) {
                                questionData.push({ "qID": qid, "optID": opt, "opttxt": opttxt });
                                optionsAdded.push(option);
                            }
                            opt = "";
                            opttxt = "";
                        }
                    }
                }
            }
        }
    }
    var json = JSON.stringify(questionData);
    sessionStorage.setItem("questionData", json);
    window.location.href = "./qflow.html";
}