function checkForError() {
    var qqid = document.getElementById("qqid").value;
    var qqtitle = document.getElementById("qqtitle").value;
    if (qqid === "" || qqtitle === "") {
        document.getElementById("error-box").style.display = "flex";
        return true;
    }
    return false;
}

var keywordCount = 1;

function addKeyword() {
    keywordCount++;

    var newKeyword = document.createElement("div");
    newKeyword.innerHTML = `
        <div id="keyword${keywordCount}">
            <br><input type="text" class="keyword"/><br><br>
            <input type="button" value="Remove Keyword" class="btn btn-danger" onclick="removeKeyword(${keywordCount})" style="margin: 0 auto; display: block;" />
        </div>
        `;
    var keywordContainer = document.getElementById("keywordContainer");
    keywordContainer.insertBefore(newKeyword, keywordContainer.lastChild);
}

function removeKeyword(keywordIndex) {
    var keywordDiv = document.getElementById(`keyword${keywordIndex}`);
    keywordDiv.parentNode.removeChild(keywordDiv);

    // adjust the questionCount
    keywordCount--;
}

function parseQQdata() {
    if (checkForError()) return;
    var questionnaireID = document.getElementById("qqid").value;
    var questionnaireTitle = document.getElementById("qqtitle").value;
    var keywords = [];
    var keywordElements = document.getElementsByClassName("keyword");
    for (var i = 0; i < keywordElements.length; i++) {
        if (keywordElements[i].value !== "") {
            keywords.push(keywordElements[i].value);
        }
    }

    var data = {
        "questionnaireID": questionnaireID,
        "questionnaireTitle": questionnaireTitle,
        "keywords": keywords
    };

    var jsonData = JSON.stringify(data);
    sessionStorage.setItem("qqgenData", jsonData);
    window.location.href = "/createqs";
}
