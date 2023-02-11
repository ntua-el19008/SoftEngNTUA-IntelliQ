var questionnaireData = JSON.parse(sessionStorage.getItem('questionnaireData'));
var qindex = 0;
var question_result = {};
var answers = [];
var session;

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

function fetchNext(question_result) {
    //take the chosen option and append it to answers
    var optindex = 0;
    var ele = document.getElementsByName('exampleRadios'); 
    for(i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            optindex = i;
        }
    }

    var temp = {
        "questionnaireID": question_result["questionnaireID"],
        "qID": question_result["qID"],
        "qtext": question_result["qtext"],
        "type": question_result["type"],
        "optID": question_result["options"][optindex]["optID"],
        "optiontxt": question_result["options"][optindex]["opttxt"],
        "nextopt": question_result["options"][optindex]["nextqID"]
    };

    answers.push(temp);

    if (qindex == (questionnaireData["questions"].length - 1)) {
       
        var butt2 = document.getElementById("secondButton");
        butt2.style.display = "none"; 
        //tha apantaw epitelous


        var butt = document.getElementById("submitButton");
        butt.style.display = "block"; 
        
    }
    else {
        if (temp["nextopt"] == NULLQ) {
            qindex += 1;
        }
        else {
            for (var i = 0; i < questionnaireData.length; i++) {
                if  (questionnaireData["questions"][i]["qid"] == temp["nextopt"]) {
                    qindex = i;
                    break;
                }
            }
        }
        get();
    }
}



//this function actually submits the aswers
function submit() {
    const questionnaireID = questionnaireData["questionnaireID"];
    for (var i = 0; i < answers.length; i++) {
        var qid = answers[i]["qID"];
        var opt = answers[i]["optID"];
        fetch(`/intelliq_api/doanswer/${questionnaireID}/${qid}/${session}/${opt}`, {method: 'POST'})
        .then(response => response.json())
        .catch(error => console.error(error));
    }
}