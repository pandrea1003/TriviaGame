
//Set up a varible where the quiz will be placed
var mainBox = $('#quiz');
var End = $('#endBox');

//Array to hold the quiz(questions/answeres)
var quiz = [{
    question: "1 . What is the degree of a triangle?",
    answers: ["180", "360", "190", "90"],
    rightAnswer: "180"
}, {
    question: "2 . How many sides does a dodecahedron have?",
    answers: ["20", "200", "12", "22"],
    rightAnswer: "12"
}, {
    question: "3 . The total number of squares on a chessboard?",
    answers: ["176", "120", "212", "204"],
    rightAnswer: "204"
}, {
    question: "4 . Which Greek letter is used for summation in mathematics??",
    answers: ["Delta", "Sigma", "Phi", "Zeta"],
    rightAnswer: "Sigma"
}, {
    question: "5 . How many faces does an icosahedron have?",
    answers: ["30", "15", "20", "40"],
    rightAnswer: "20"
}, {
    question:  "6 . Which of the following is not a branch of mathematics?",
    answers: ["Calculus", "Geodesy", "Topology", "Numerology"],
    rightAnswer: "Numerology"
}, {
    question: "7 . What is the meaning of 'crore?",
    answers: ["10 million ", "10 billion ", "100 million ", "10 trillion "],
    rightAnswer: "10 million "
}, {
    question: "8 . What is the number called located on the bottom part of a fraction??",
    answers: ["numerator ", "divisor", "denominator ", "multiple"],
    rightAnswer: "denominator "
}, {
    question: "9. Which of the following figures has no line symmetry?",
    answers: ["Rhombus", "Kite", "Semicircle", "Parallelogram"],
    rightAnswer: "Parallelogram"
}, {
    question: "10. XVXII as a number?",
    answers: ["19", "17", "27", "77"],
    rightAnswer: "27"
}];

//creating variable to the game

var game = {
correct:0,
wrong:0,
timer:60,
// create countdown function 

countdown: function(){
    game.timer--;
    $('#TimerClock').html(game.timer);

    if (game.timer === 0){
    game.end();
	}
},

//Game start function and adding countdown function
start: function() {
    timer = setInterval(game.countdown, 1000);
    //Removes game start screen and displays the timer on the page
	$('#start').remove();

    //Loops through the quiz array and displays each question and its answer choices
    for (var i = 0; i < quiz.length; i++) {
        mainBox.append(' <p>' + quiz[i].question + '</p>');
        for (var j = 0; j < quiz[i].answers.length; j++) {
		mainBox.append('<input type="checkbox" name="question' + '<br>' + i + quiz[i].answers[j] + '">' + quiz[i].answers[j] + '<br>');
    }
}

    //Displays a submit button at the bottom of the quiz 
    mainBox.append('<br> <button id="submit">Submit</button>');
},

//Game end function
end: function() {
    //Checks each of the answers and determinates if they are the correct or wrong 
    $.each($("<br> input[name='question-0']:checked"), function() {
    if ($(this).val() == quiz[0].rightAnswer) {
        game.correct++;
    } else {
        game.wrong++;
    }
    });
    $.each($("input[name='question-1']:checked"), function() {
        if ($(this).val() == quiz[1].rightAnswer) {
        game.correct++;
    } else {
        game.wrong++;
    }
    });
    $.each($("input[name='question-2']:checked"), function() {
    if ($(this).val() == quiz[2].rightAnswer) {
        game.correct++;
    } else {
        game.wrong++;
    }
    });
    $.each($("input[name='question-3']:checked"), function() {
    if ($(this).val() == quiz[3].rightAnswer) {
        game.correct++;
    } else {
        game.wrong++;
    }
    });
    $.each($("input[name='question-4']:checked"), function() {
    if ($(this).val() == quiz[4].rightAnswer) {
        game.correct++;
    } else {
        game.wrong++;
    }
    });
    $.each($("input[name='question-5']:checked"), function() {
    if ($(this).val() == quiz[5].rightAnswer) {
        game.correct++;
    } else {
        game.wrong++;
    }
    });
    $.each($("input[name='question-6']:checked"), function() {
    if ($(this).val() == quiz[6].rightAnswer) {
        game.correct++;
    } else {
        game.wrong++;
    }
    });
    $.each($("input[name='question-7']:checked"), function() {
    if ($(this).val() == quiz[7].rightAnswer) {
        game.correct++;
    } else {
        game.wrong++;
    }
    });
    $.each($("input[name='question-8']:checked"), function() {
        if ($(this).val() == quiz[8].rightAnswer) {
        game.correct++;
        } else {
        game.wrong++;
        }
    });
    $.each($("input[name='question-9']:checked"), function() {
        if ($(this).val() == quiz[9].rightAnswer) {
        game.correct++;
        } else {
        game.wrong++;
        }
    });

    this.result();
},
    
//Clears the quiz and shows the results
result: function() {

    clearInterval(timer);
    $('a').remove();
    mainBox.html('<h1>How did you do?</h1>');
    mainBox.append('<h3>Right Answers: ' + this.correct + '</h3>' );
    mainBox.append('<h3>Wrong Answers: ' + this.wrong + '</h3>');
    mainBox.append('<h3>Unanswered: ' + (quiz.length - (this.wrong + this.correct)) + '</h3>');
}
};


//On click, the game starts (call function)
$(document).on('click', '#start' , function() {
	game.start();
    });
    
//f submit button is clicked the game is over (call function)
$(document).on('click', '#submit', function() {
    game.end();
    });