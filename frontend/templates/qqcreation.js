var questionCount = 1;
var optionCount = { 1: 1 };

function addQuestion() {
    questionCount++;
    optionCount[questionCount] = 1;

    var newQuestion = document.createElement("div");
    newQuestion.innerHTML = `
        <br><div id="question${questionCount}" style="text-align: center;">
            <h1 style="font-size: 1.7em;">Question ${questionCount}</h1>
            <input type="button" value="Remove Question" class="btn btn-danger" onclick="removeQuestion(${questionCount})"
			style="margin: 0 auto; display: block;" /><br>
            <label style="font-size: 1.2em;">Question ID</label><br>
            <input type="text" name="qid" placeholder="Max length 10 characters"/><br>
            <label style="font-size: 1.2em;">Question text</label><br>
            <input type="text" name="qtext" placeholder="Max length 255 characters"/><br> <br>
            <label style="font-size: 1.2em;">Is the question mandatory?</label><br>
            <form id="type">
                <label for="TRUE">TRUE</label>
                <input type="radio" id="TRUE" name="mandatory" value="TRUE">
                <br>
                <label for="FALSE">FALSE</label>
                <input type="radio" id="FALSE" name="mandatory" value="FALSE">
                <br><br>
            </form>
            <label style="font-size: 1.2em;">Type of question</label><br>
            <form id="type">
                <label for="profile">Profile</label>
                <input type="radio" id="profile" name="type" value="profile">
                <br>
                <label for="question">Question</label>
                <input type="radio" id="question" name="type" value="question">
                <br><br>
            </form>
            <input type="button" value="+" class="btn btn-danger" onclick="addOption(${questionCount})"
			style="margin: 0 auto; display: block;" /><br>
            <div id="optionsContainer${questionCount}">
            <div id="option1">
                <label style="font-size: 1.2em;">Option ID</label><br>
                <input type="text" name="opt" placeholder="Max length 10 characters"/><br>
                <label style="font-size: 1.2em;">Option Text</label><br>
                <input type="text" name="opttxt" placeholder="Max length 255 characters"/><br>
            </div><br>
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
    delete optionCount[questionIndex];
}

function addOption(questionNum) {
    optionCount[questionNum]++;
    var newOption = document.createElement("div");
    newOption.innerHTML = `
        <div id="option${optionCount[questionNum]}" class="option" idx="${optionCount[questionNum]}">
            <br><label style="font-size: 1.2em;">Option ID</label><br>
            <input type="text" name="opt" placeholder="Max length 10 characters"/><br>
            <label style="font-size: 1.2em;">Option Text</label><br>
            <input type="text" name="opttxt" placeholder="Max length 255 characters"/><br><br>
            <input type="button" value="Remove Option" class="btn btn-danger" onclick="removeOption(this, ${questionNum})"
			style="margin: 0 auto; display: block;" />
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

            for (var j = 0; j < typeButtons.length; j++) {
                if (typeButtons[j].checked) {
                    selectedValuetype = typeButtons[j].value;
                    break;
                }
            }

            var mandatoryButtons = document.getElementsByName("mandatory");
            var selectedValuemand;
            for (var j = 0; j < mandatoryButtons.length; j++) {
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
                        if (qid !== "" && inputs[j].value !== "" && selectedValuemand !== undefined && selectedValuetype !== undefined) {
                            questionData.push({ "qID": qid, "qtext": inputs[j].value, "required": selectedValuemand, "type": selectedValuetype });
                            questionAdded = true;
                        } else {
                            document.getElementById("error-box").style.display = "flex";
                            return;
                        }
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
                            if (opt === "") {
                                document.getElementById("error-box").style.display = "flex";
                                return;
                            }
                        }
                        if (optionInputs[l].name === "opttxt") {
                            opttxt = optionInputs[l].value;
                            if (opttxt === "") {
                                document.getElementById("error-box").style.display = "flex";
                                return;
                            }
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
    window.location.href = "/createflow";
}