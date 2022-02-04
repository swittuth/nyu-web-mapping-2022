const positive_answer_list = ["It is certain", "It is decidedly so", "Without a doubt", "As I see it, yes!", "Outlook good", "Signs point to yes"];
const neutral_answer_list = ["Ask again later", "Better not tell you now", "Can't see anything right now", "Concentrate and ask again"];
const negative_answer_list = ["Don't count on it", "Definite no", "Very doutful", "My sources say no", "Outlook not so good"];
const answer_list = [positive_answer_list, neutral_answer_list, negative_answer_list];

const submitted_question = document.getElementById("submitted-question");
const eight_ball_answer = document.getElementById("eight-ball-answer");
const notify = document.getElementById("notify");
const submit_button = document.getElementById("submit-button");
const input = document.getElementById("input_area");

// setting initital conditions
submitted_question.hidden = true;
eight_ball_answer.hidden = true;
notify.hidden = true;
let question_asked = false;
let gave_fortune = false;

input.onkeypress = function(event) {

  let keyEntered = event.keyCode;

  if (keyEntered === 13){
  	submitted_question.innerHTML = `Question: ${input.value}`;
  	submitted_question.hidden = false;
    input.style.display = 'none';
    question_asked = true;
    notify.hidden = true;
  }


}

function changeColor() {
	submit_button.style.color = "maroon";
	submit_button.style.backgroundColor = "gold";
}
function reverseColor() {
	submit_button.style.color = "blue";
	submit_button.style.backgroundColor = "white";
}

submit_button.addEventListener("mousedown", changeColor);
submit_button.addEventListener("mouseup", reverseColor);

submit_button.onclick = function() {
	if (question_asked && !gave_fortune){
  	const type_answer = Math.floor(Math.random() * answer_list.length);
  let color;

  switch(type_answer){
  	case 0:
    	color = "green";
      break;
    case 1:
    	color = "yellow";
      break;
    case 2:
    	color = "red";
      break;
  }

  const ball_answer = answer_list[type_answer][Math.floor(Math.random() * answer_list[type_answer].length)];
  eight_ball_answer.innerHTML = ball_answer;
  eight_ball_answer.style.color = color;
  notify.hidden = true;
  eight_ball_answer.hidden = false;
  gave_fortune = true;
  submit_button.innerHTML = "Ask another fortune";
  }
  else if (!question_asked){
  	notify.hidden = false;
  }
  else if (gave_fortune){
  	reset();
  }
}

function reset() {
	submitted_question.hidden = true;
  eight_ball_answer.hidden = true;
  notify.hidden = true;
  question_asked = false;
  gave_fortune = false;
  input.style.display = 'block';
  input.value = '';
  submit_button.innerHTML = "Click to find Your Fortune";
}
