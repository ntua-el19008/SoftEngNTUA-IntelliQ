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
                <button class="btn btn-danger"  onclick=" answer(${questionnaireID}, ${title})"
                    style="margin: 0 auto; display: block;">Answer Selected Questionnaire</button>
                </form>
                </div>
                `;
                var questionContainer = document.getElementById("card");
                questionContainer.appendChild(question);
                //answer(questionnaireID, title)
                //window.location.href = "/answer";

              //  var json = JSON.stringify(response.json());
              //  sessionStorage.setItem("questionData", json);
            }
        })

}     


