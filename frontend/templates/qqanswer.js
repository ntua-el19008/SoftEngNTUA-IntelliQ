var questionnaireData = JSON.parse(sessionStorage.getItem('questionnaireData'));
var qindex = 0;
var question_result = {};

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
    // .then(response => console.log(response))
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
                //alert(question["qtext"]);
                var option = document.createElement("div");
                option.innerHTML = `
                
                <div class="table-responsive" style="text-align: center; "> 
                   
                        <div class="form-check" >
                            <input class="form-check-input"  type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${ question_result["options"][i]["opttxt"]}
                            </label>
                        </div>
                    
                </div>
                `;
                questionContainer.appendChild(option);}
        }
    })
    .catch(error => console.error(error));
    qindex += 1;
    
    }

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
   // alert(questionnaireData["questionnaireTitle"]);
}