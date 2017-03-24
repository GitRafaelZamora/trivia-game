var sessionToken = '';

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

var category = '';
var question = '';
var choices = [];
var answer = '';

function loadTrivia() {
	var client = new HttpClient();
	client.get('https://opentdb.com/api.php?amount=1&token=' + sessionToken, function(response) {
		parseData(JSON.parse(response));
		displayData();
	});
}

function displayData() {
	var htmlQuestionDiv = document.getElementById('trivia-question');
	htmlQuestionDiv.innerHTML = question;
	var htmlChoicesDiv = document.getElementById('answer-options');

			var html = '';

			for (var i = choices.length - 1; i >= 0; i--) {
				html += '<li>'+ choices[i] + '</li>';
			}

	htmlChoicesDiv.innerHTML = html;
}

function displayAnswer() {
	var htmlAnswerDiv = document.getElementById('answer');
	htmlAnswerDiv.innerHTML = answer;
}

function parseData(data) {
	category = data.results[0].category;
	console.log(category);
	question = data.results[0].question;
	console.log(question);
	type = data.results[0].type;
	console.log(type);
	


	answer = data.results[0].correct_answer;
	console.log(answer);

	if (type == "boolean") {
		choices = ["true", "false"];
		console.log(choices);
	} else {
		choices = data.results[0].incorrect_answers;
		choices.push(answer)
		console.log(choices);
	}
}



