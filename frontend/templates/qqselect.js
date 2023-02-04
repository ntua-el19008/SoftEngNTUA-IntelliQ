const firstButton = document.getElementById("firstButton");
    const secondButton = document.getElementById("secondButton");
    firstButton.addEventListener("click", function() {
        secondButton.style.display = "block";
      });

var QID;
var questionnaire_result = {};

function fetchQuestionnaire(){
    const questionnaireID = document.getElementById("questionnaireID").value;
    
    fetch(`/intelliq_api/questionnaire/${questionnaireID}`)
        .then(response => response.json())
       // .then(response => console.log(response))
        .then(data => {
            
            
            if (data.hasOwnProperty("error")) {
               alert("The Questionnaire is empty, or doesn't exist. Please give a valid Questionnaire ID.");
            }
            else {
                var title = data["questionnaireTitle"];
                var question = document.createElement("div");
                question.innerHTML = `
                <div>
                <form id="questionnaireIntro" style="text-align: center; padding: 10px 20px;">
                <h1>Give answers for questionnaire with title :<h1/>
                <h2>${title}<h2/>
                <h3>Are you sure you want to answer this questionnaire?
                <h3/>
                </form>
                </div>
                `;
                var questionContainer = document.getElementById("card");
                //questionContainer.appendChild(question);
                questionContainer.replaceChildren(question);
                QID = questionnaireID;
                questionnaire_result = {
                    "questionnaireID": questionnaireID,
                    "questionnaireTitle": title,
                    "keywords": data["keywords"],
                    "questions": data["questions"]
                }
            }
        })
        .catch(error => console.error(error));

}

function answer() {
    //const questionnaireID = document.getElementById("questionnaireID").value;
    var question = document.createElement("div");
    question.innerHTML = `
        <div>
        <form id="questionnaireIntro" style="text-align: center; padding: 10px 20px;">
        <h1>Give answers for questionnaire with title :<h1/>
        <h2>${QID}<h2/>
        <h3>Are you sure you want to answer this questionnaire?
        <h3/>
        </form>
        </div>
        `;
    var questionContainer = document.getElementById("card");
    //questionContainer.appendChild(question);
    //var json = JSON.stringify(questionnaire_result);
    //sessionStorage.setItem("questionnaire_result", json);
    alert(questionnaire_result["questionnaireTitle"]);
    var json = JSON.stringify(questionnaire_result);
    sessionStorage.setItem("questionnaireData", json);
    window.location.href = "/answer";
}


