function submitForm() {
    console.log("I'm in");
    const questionnaireID = document.getElementById("questionnaireID").value;
    const questionID = document.getElementById("questionID").value;
    fetch(`/intelliq_api/getquestionanswers/${questionnaireID}/${questionID}`)
        .then(response => response.json())
        .then(data => {
            var ansList = new Set(data.answers.map(a => a.ans));
            var dataPoints = [];
            for (let ans of ansList) {
                dataPoints.push({ y: countAnswers(data, ans), label: ans });
            }
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "Answers for Question " + data.questionID
                },
                axisY: {
                    title: "Number of answers",
                },
                data: [{
                    type: "column",
                    dataPoints: dataPoints
                }]
            });
            chart.render();
        })
        .catch(error => console.error(error));
}

function countAnswers(data, ans) {
    return data.answers.filter(a => a.ans === ans).length;
}