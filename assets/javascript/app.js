
   var questions = [
       {
	question: "Who started their first day at Dunder Mifflin Scranton?",
	choices: ["Jim", "Michael", "Ryan", "Pam"],
	correctAnswer: "Ryan",
}, {
	question: "What is Andys nickname for Jim?",
	choices: ["Fish", "Big Tuna", "Salami", "Jimbo"],
	correctAnswer: "Big Tuna",
}, {
	question: "What 90s movie does Michael show for Movie Monday?",
	choices: ["Never Been Kissed", "Cant Hardly Wait", "Shrek", "Varsity Blues"],
	correctAnswer: "Varsity Blues",
}, {
	question: "What office supply chain has Dwight begun working for??",
	choices: ["Staples", "OfficeMax", "Comp USA", "Office Depot"],
	correctAnswer: "taples",
}, {
	question: "Who gets flashed in the parking lot?",
	choices: ["Meredith","Pam", "Phyllis","Creed"],
	correctAnswer: "Meredith",
}, {
	question: "What is the security guards name?",
	choices: ["Eddie","Hank","Elliot","Michael"],
	correctAnswer: "Eddie",
}, {
	question: "What is Holly's new boyfriend's name?",
	choices: ["Tom", "Hank", "A.J","Chandler"],
	correctAnswer: "A.J",
}];


var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;


    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
    $(document).ready(function () {


// current question, the choices
 displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements 
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }

}

 resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

 displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
}];  
}];  