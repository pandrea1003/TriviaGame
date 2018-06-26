var arrayOfQuestionObjects = [{
    "Question": "Who started the fire in the break romm in seasson 2?",
"ChoiceOne": "Jim",
 "ChoiceTwo": "Dwight", 
 "ChoiceThree": "Ryan", 
"ChoiceFour": "Michael", 
"Answer": "Ryan"}, 

{"Question": "What did Phyllis as Michael to do in her Weding?", 
"ChoiceOne": "Push her father down the aisle", 
"ChoiceTwo": "Be a groomsman", 
"ChoiceThree": "Give a speech",
 "ChoiceFour": "Hand out programs",
  "Answer": "Push her father down the aisle"}, 

{"Question": "What is Karen's last name", 
"ChoiceOne": "DiSalvo", 
"ChoiceTwo": "Filippello", 
"ChoiceThree": "Esposito", 
"ChoiceFour": "Moretti", 
"Answer": "Filippello"}, 

{"Question": "What movie do Michael and Holly do a parody of at the picnic?",
"ChoiceOne": "Forrest Gump",
 "ChoiceTwo": "The Devil Wears Prada", 
 "ChoiceThree": "Terminator 2", 
 "ChoiceFour": "Slumdog Millionaire", 
"Answer": "Slumdog Millionaire"},

 {"Question": "What city does Michael move to with Holly?",
"ChoiceOne": "Aspen,Colodado",
 "ChoiceTwo": "Littleton,Colorado", 
 "ChoiceThree": "Bolder,Colorado", 
 "ChoiceFour": "Denver,Colorado", 
"Answer": "Littleton,Colorado"},

{"Question": "What is Erin's real first name",
"ChoiceOne": "Kelly", 
"ChoiceTwo": "Ben", 
"ChoiceThree": "Jessica",
 "ChoiceFour": "Sarah", 
 "Answer": "Kelly"}, 

{"Question": "Who competes against Michael as Santa?",
"ChoiceOne": "Phylis", 
"ChoiceTwo": "Oscar",
 "ChoiceThree": "Kevin", 
 "ChoiceFour": "Jim", 
"Answer": "Phylis"},

{"Question": "In the season 3 episode Grief Counseling Michael organizes a funeral for which animal?",
"ChoiceOne": "Dog",
 "ChoiceTwo": "Bird", 
 "ChoiceThree": "Cat", 
 "ChoiceFour": "Rat", 
"Answer": "Bird"},

 {"Question": "What is the name of Dwight's brother?",
"ChoiceOne": "Moes", 
"ChoiceTwo": "Jeb", 
"ChoiceThree": "Jack", 
"ChoiceFour": "Bob", 
"Answer": "Jeb"}, 

 {"Question": "Who attends anger management in the season 3?",
"ChoiceOne": "Dwight",
 "ChoiceTwo": "Andy",
  "ChoiceThree": "Ryan",
   "ChoiceFour": "Michael", 
"Answer": "Andy"}];



var correct = 0;
var wrong = 0;
var unanswered = 0;
var questionsAsked = 0;
var questionsToAnswer = 10;
var timeToAnswer = 25;
//var gifLimit = 5;
var resultScreenShow = 7;
var tickerLock = 1;



function replaceOpeningScreen(){
	$("#opening-screen").addClass("hidden");
	$("#question-screen").removeClass("hidden");
}

function shuffleArray(arr){
	for(var i = 1; i < arr.length; i++) {
		var random = Math.floor(Math.random() * (i + 1));
		if(random !== i) {
			var dummy = arr[random];
			arr[random] = arr[i];
			arr[i] = dummy;
		}
	}
	return arr;
}

function populateQA(){
	questionsAsked++;
	if(questionsAsked <= questionsToAnswer) {
		$("#time").text(timeToAnswer);
		tickerLock = 0;
		var arrayOfChoices = [arrayOfQuestionObjects[questionsAsked].ChoiceOne, 
		arrayOfQuestionObjects[questionsAsked].ChoiceTwo, arrayOfQuestionObjects[questionsAsked].ChoiceThree,
		arrayOfQuestionObjects[questionsAsked].ChoiceFour];
		arrayOfChoices = shuffleArray(arrayOfChoices);
		$("#question").text(arrayOfQuestionObjects[questionsAsked].Question);
		$("#choice-a").text(arrayOfChoices[0]);
		$("#choice-b").text(arrayOfChoices[1]);
		$("#choice-c").text(arrayOfChoices[2]);
		$("#choice-d").text(arrayOfChoices[3]);
		parseAnswer();
	}
	else {
		$("#result-screen").addClass("hidden");
		$("#final-statistics").removeClass("hidden");
		if(correct >= questionsToAnswer*.7)
			$("#verdict").text("You are a bona fide comic book nerd!");
		else if(correct <= questionsToAnswer*.3)
			$("#verdict").text("Well, at least you have a life.")
		else
			$("#verdict").text("You have a healthy knowledge of comics.");
		$("#correct-tally").text(correct);
		$("#wrong-tally").text(wrong);
		$("#unanswered-tally").text(unanswered);
		$(document).on("click", function(){
			$(document).unbind("click");
			correct = 0;
			wrong = 0;
			unanswered = 0;
			questionsAsked = 0;
			arrayOfQuestionObjects = shuffleArray(arrayOfQuestionObjects);
			arrayOfQuotes = shuffleArray(arrayOfQuotes);
			$("#final-statistics").addClass("hidden");
			$("#question-screen").removeClass("hidden");
			populateQA();
		});
	}
}

function countdown(){
	if(tickerLock != 1) {
		timeToAnswer--;
		$("#time").text(timeToAnswer);
		if(timeToAnswer === 0) {
			timeToAnswer = 25;
			tickerLock = 1;
			openTimeUpScreen();
		}
	}
}

function parseAnswer(){
	$(".answer-container").on("click", function() {
		$(".answer-container").unbind("click");
		tickerLock = 1;
		timeToAnswer = 25;
		var userChoice = $(this).attr("choice");
		$("#question-screen").addClass("hidden");
		$("#result-screen").removeClass("hidden")
		if($("#choice-" + userChoice).text() === arrayOfQuestionObjects[questionsAsked].Answer) {
			$("#result").text("Correct!");
			$("#correct-answer").text(questionsAsked);
			correct++;
		}
		else {
			$("#result").text("Wrong!");
			$("#correct-answer").text("Correct answer: " + arrayOfQuestionObjects[questionsAsked].Answer);
			wrong++;
		}
		
		setTimeout(function(){
			if(questionsAsked < questionsToAnswer) {
				$("#result-screen").addClass("hidden");
				$("#question-screen").removeClass("hidden");
			}
			populateQA();}, 1000*resultScreenShow);
	});
}


function openTimeUpScreen(){
	$(".answer-container").unbind("click");
	$("#question-screen").addClass("hidden");
	$("#result-screen").removeClass("hidden");
	$("#result").text("Time's Up!");
	$("#correct-answer").text("Correct answer: " + arrayOfQuestionObjects[questionsAsked].Answer);
	unanswered++;
	setTimeout(function(){
		if(questionsAsked < questionsToAnswer) {
			$("#result-screen").addClass("hidden");
			$("#question-screen").removeClass("hidden");
		}
		populateQA();
	}, 1000*resultScreenShow);
}

$(document).ready(function(){
	//renderOpeningScreen();
	$(document).on("click", function(){
		//$(document).unbind("click");
		arrayOfQuestionObjects = shuffleArray(arrayOfQuestionObjects);
		replaceOpeningScreen();
		setInterval(countdown, 1000);
		populateQA();
	});
});