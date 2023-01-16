var questionData = JSON.parse(sessionStorage.getItem('questionData'));

var qqgenData = JSON.parse(sessionStorage.getItem('qqgenData'));

function createQnextSelect(questionIndex) {
    var qid_arr = [];

    var select = document.createElement("select");
    select.name = "nextqID";

    var option = document.createElement("option");
    option.value = "NULLQ";
    option.innerHTML = "NULLQ";
    select.appendChild(option);

    for (var i = 0; i < questionData.length; i++) {
        if (questionData[i].qID !== questionIndex && !qid_arr.includes(questionData[i].qID)) {
            var option = document.createElement("option");
            option.value = questionData[i].qID;
            option.innerHTML = questionData[i].qID;
            select.appendChild(option);
            qid_arr.push(questionData[i].qID);
        }
    }
    return select;
}

function displayQuestions() {
    var qcount = 1;
    var optcount = 1;

    for (var i = 0; i < questionData.length; i++) {
        if (questionData[i].qtext === undefined) {
            //option
            var option = questionData[i];
            var optionDiv = document.createElement("div");
            var optionTitle = document.createElement("p");
            optionTitle.innerHTML = "Option " + optcount + ": " + option.optID + " - " + option.opttxt;
            var qnextSelect = createQnextSelect(option.qID);
            optionDiv.appendChild(optionTitle);
            optionDiv.appendChild(qnextSelect);
            document.getElementById("questionsContainer").appendChild(optionDiv);
            optcount++;
        }
        else {
            //question
            var questionDiv = document.createElement("div");
            var questionTitle = document.createElement("h1");
            questionTitle.style = "font-size: 1.2em;";
            questionTitle.innerHTML = "<br>Question " + (qcount) + "(" + questionData[i].qID + ")" + "<br />" + questionData[i].qtext;
            questionDiv.appendChild(questionTitle);
            document.getElementById("questionsContainer").appendChild(questionDiv);
            qcount++;
            optcount = 1;
        }
    }
}

function parseAll() {
    qqgenData.questions = [];

    var firstopt = 1;

    question = null;
    for (var i = 0; i < questionData.length; i++) {
        if (questionData[i].qtext === undefined) {
            //option

            delete questionData[i].qID;

            if (firstopt === 1) {
                question.options = [];
                question.options.push(questionData[i]);
                firstopt = 0;
            } else {
                question.options.push(questionData[i]);
            }
        }
        else {
            //question

            firstopt = 1;
            qqgenData.questions.push(question);
            question = questionData[i];
        }
    }
    qqgenData.questions.push(question);
    qqgenData.questions.shift();


    var json = JSON.stringify(qqgenData);
    document.getElementById("output").innerHTML = json;
}

function submitQnext() {
    let selects = document.getElementsByName("nextqID");
    let answers = [];

    for (let i = 0; i < selects.length; i++) {
        answers.push(selects[i].options[selects[i].selectedIndex].value);
    }

    var cnt = 0;
    for (var i = 0; i < questionData.length; i++) {
        if (questionData[i].qtext === undefined) {
            questionData[i].nextqID = answers[cnt];
            cnt++;
        }
    }
    parseAll();
}
