
function submitForm() {
    console.log("I'm in");
    const questionnaireID = document.getElementById("questionnaireID").value;
    const questionID = document.getElementById("questionID").value;
    fetch(`/intelliq_api/doanswer/${questionnaireID}/${questionID}`)
        .then(response => response.json())
        
        .catch(error => console.error(error));

}