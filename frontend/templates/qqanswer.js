var questionnaireData = JSON.parse(sessionStorage.getItem('questionnaireData'));
var qindex = 0;
var question_result = {};
var answers = [];

//function that checks the optional mask given
function checkMask() {
    if (questionnaireData["mask"] === "") {
        get();
    }
    else {
        var input = document.getElementById("mail");
        if (!input.value.includes(questionnaireData["mask"])) {
           alert("You are not allowed to answer");
           window.location.href = "/";
        }
        else {
            get();
        }
    }
}

//fetching first question when page loads
function display() {  
    var title = questionnaireData["questionnaireTitle"];
    var question = document.createElement("div");
    question.innerHTML = `
    <div>
    <form id="questionnaireIntro" style="text-align: center; padding: 10px 20px;">
    <h1>${title}
    <h1/>
    </form>
    </div>
    `;
    var questionContainer = document.getElementById("header");
    questionContainer.appendChild(question);
    if (questionnaireData["mask"] !== "") {
        var mailspace = document.getElementById("mask");
        mailspace.style.display = "block";
    }
    var butt = document.getElementById("beginButton");
       butt.style.display = "block";
}

//this function pulls the options for every question and displays them
function get() {
    var question = questionnaireData["questions"][qindex];
    var showq = document.createElement("div");
    showq.innerHTML = `
    <div>
    <form id="questionnaireIntro" style="text-align: center; padding: 10px 20px;">
    <h2>${question["qtext"]}
    <h2/>
    </form>
    </div>
    `;
    var questionContainer = document.getElementById("card");
    questionContainer.replaceChildren(showq);
    const questionID =  question["qid"];
    const questionnaireID = questionnaireData["questionnaireID"];
    fetch(`/intelliq_api/question/${questionnaireID}/${questionID}`)
    .then(response => response.json())
    .then(data => {
        if (data.hasOwnProperty("error")) {
        }
        else {
            question_result = {
                "questionnaireID": data["questionnaireID"],
                "qID": data["qID"],
                "qtext": data["qtext"],
                "required": data["required"],
                "type": data["type"],
                "options": data["options"]
            }

            for (var i = 0; i < question_result["options"].length; i++) {
                var option = document.createElement("div");
                option.innerHTML = `
                
                <div class="table-responsive" > 
                   
                        <div class="form-check" >
                            <input class="form-check-input"  type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
                            <label class="form-check-label" for="exampleRadios1">
                            ${ question_result["options"][i]["opttxt"]}
                            </label>
                        </div> 
                </div>
                `;
                questionContainer.appendChild(option);
            }
            var butt = document.createElement("div");
            butt.innerHTML = `
                <div>
                <button id="secondButton" class="btn btn-danger"  onclick=" fetchNext(question_result)"
                        style="margin: 0 auto; display: block;">Next</button>
                </div>`;
            questionContainer.appendChild(butt);
        }    
    })
    .catch(error => console.error(error));
}

//this function defines the next question depending on the type of question
function fetchNext(question_result) {
    //take the chosen option and append it to answers
    var optindex = -1;
    var ele = document.getElementsByName('exampleRadios'); 
    for(i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            optindex = i;
        }
    }
    //if not answered check whether mandatory
    if (optindex === -1) {
        //if question is mandatory request answer
        if (question_result["required"] === "true") {
            alert("This question is required!");
            get();
            return
        }
        else {
            qindex = qindex + 1;
            if (qindex == questionnaireData["questions"].length) {
                getAnswers();
                return;
            }
            else {
                get();
                return;
            }
        }
    }
    else {

        //if answered
        var temp = {
            "questionnaireID": question_result["questionnaireID"],
            "qID": question_result["qID"],
            "qtext": question_result["qtext"],
            "type": question_result["type"],
            "optID": question_result["options"][optindex]["optID"],
            "optiontxt": question_result["options"][optindex]["opttxt"],
            "nextq": question_result["options"][optindex]["nextqID"]
        };
        
        answers.push(temp);
        
        if (temp["nextq"] === "NULLQ") {
            getAnswers();
        }
        else {
            for (var i = 0; i < questionnaireData["questions"].length; i++) {
                if  (questionnaireData["questions"][i]["qid"] === temp["nextq"]) {
                    qindex = i;
                    break;
                }
            }
            get();
        }
        
    }
}
    
//
function getAnswers() {
    var butt2 = document.getElementById("secondButton");
    butt2.style.display = "none"; 
    var card2 = document.getElementById("card");
    var answer = document.createElement("div");
    answer.innerHTML = `
    <div>
    <form id="answers" style="text-align: center; padding: 10px 20px;">
    <h1>Your answers
    <h1/>
    </form>
    </div>
    `;
    card2.replaceChildren(answer);
    
    for (var i = 0; i < answers.length; i++) {
        var answer2 = document.createElement("div");
        answer2.innerHTML = `
        <div>
        <form id="answers" style="text-align: center; padding: 10px 20px;">
        <h2>Question ${i + 1} : ${answers[i]["qtext"]}
        <h2/>
        <h3>You answered : ${answers[i]["optiontxt"]}
        <h3/>
        </form>
        </div>
        `;
        card2.appendChild(answer2);
        
    }
    
    var butt = document.getElementById("submitButton");
    butt.style.display = "block"; 
}

//this function actually submits the aswers
function submit(sessionID) {
    const questionnaireID = questionnaireData["questionnaireID"];
    for (var i = 0; i < answers.length; i++) {
        var qid = answers[i]["qID"];
        var opt = answers[i]["optID"];
        fetch(`/intelliq_api/doanswer/${questionnaireID}/${qid}/${sessionID}/${opt}`, {method: 'POST'})
        .then(response => response.json())
        .catch(error => console.error(error));
    }
    answers = [];
    window.location.href = "/";
}

//decides next session id 
function getSession() {
    var new_session = [];
    fetch(`/intelliq_api/getlastsessid/`)
    .then(response => response.json())
    .then(data => {
        if (data.hasOwnProperty("error")) {
        }
        else {
            session = data["sessionID"];
            var count = session.match(/\d*$/);
            ++count[0];
            new_session.push(session.substr(0, count.index) + (++count[0]));
            submit(new_session[0]);
        }
    }
    )
    .catch(error => console.error(error));
}