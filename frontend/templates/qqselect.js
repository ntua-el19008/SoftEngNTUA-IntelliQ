function fetchQuestionnaire(){
    const questionnaireID = document.getElementById("questionnaireID").value;
    fetch(`/intelliq_api/questionnaire/${questionnaireID}`)
        .then(response => response.json())
       // .then(response => console.log(response))
        .then(data => {
            var title = data["questionnaireTitle"];
            var question = document.createElement("div");
            question.innerHTML = `
            <div>
            <form id="questionnaireIntro" style="text-align: center; padding: 10px 20px;">
            <h1>Give answerws for questionnaire with title :<h1/>
            <h2>${title}<h2/>
            </form>
            </div>
            `;
            
            if (data.hasOwnProperty("error")) {
               alert("The Questionnaire is empty, or doesn't exist. Please give a valid Questionnaire ID.");
            }
            else {
                var questionContainer = document.getElementById("card");
                questionContainer.appendChild(question);
                window.location.href = "/answer";
            }
        })

}     
