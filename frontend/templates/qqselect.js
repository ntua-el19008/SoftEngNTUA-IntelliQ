const firstButton = document.getElementById("firstButton");
const secondButton = document.getElementById("secondButton");

var questionnaire_result = {};

function fetchQuestionnaire(){
    const questionnaireID = document.getElementById("questionnaireID").value;
    
    fetch(`/intelliq_api/questionnaire/${questionnaireID}`)
        .then(response => response.json())
       // .then(response => console.log(response))
        .then(data => {
            var questionContainer = document.getElementById("card");
            if (data.hasOwnProperty("error")) {
               alert("The Questionnaire is empty, or doesn't exist. Please give a valid Questionnaire ID.");
               secondButton.style.display = "none";
               var question = document.createElement("div");
                question.innerHTML = `<div></div>`;
               questionContainer.replaceChildren(question);
            }
            else {
                secondButton.style.display = "block";
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
                //questionContainer.appendChild(question);
                questionContainer.replaceChildren(question);
                questionnaire_result = {
                    "questionnaireID": questionnaireID,
                    "questionnaireTitle": title,
                    "mask": data["mask"],
                    "keywords": data["keywords"],
                    "questions": data["questions"]
                }
            }
        })
        .catch(error => console.error(error));

}

//change page and pass questionnaire data
function answer() {
    var json = JSON.stringify(questionnaire_result);
    sessionStorage.setItem("questionnaireData", json);
    window.location.href = "/answer";
}