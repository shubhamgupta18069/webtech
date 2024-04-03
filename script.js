console.log("Script loaded!");

const questions = [
    {
        question: "What is the output of the following JavaScript code: console.log(2 + '2' - 1);",
        answers: [
            { text: "3", correct: true, explanation: "The concatenation operation converts the number 2 to a string, resulting in '22'. Then, the subtraction operation tries to convert the string '22' back to a number, resulting in 2. Finally, 1 is subtracted from 2, resulting in 1." },
            { text: "21", correct: false },
            { text: "22", correct: false },
            { text: "NaN", correct: false }
        ]
    },
    {
        question: "What does the following JavaScript code return: typeof(undefined);",
        answers: [
            { text: "'undefined'", correct: false },
            { text: "'null'", correct: false },
            { text: "'object'", correct: false },
            { text: "'undefined'", correct: true, explanation: "The typeof operator returns 'undefined' when used with an undefined value." }
        ]
    },
    {
        question: "Which keyword is used to declare variables in JavaScript?",
        answers: [
            { text: "var", correct: true, explanation: "The var keyword is used to declare variables in JavaScript." },
            { text: "let", correct: false },
            { text: "const", correct: false },
            { text: "variable", correct: false }
        ]
    },
    {
        question: "What is the result of the following expression: '5' == 5?",
        answers: [
            { text: "true", correct: true, explanation: "The == operator performs type coercion, converting one of the operands to match the other's type if they are different. In this case, the string '5' is converted to a number, resulting in true." },
            { text: "false", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'break' statement in JavaScript?",
        answers: [
            { text: "To exit a loop or switch statement prematurely.", correct: true, explanation: "The break statement is used to exit a loop or switch statement prematurely." },
            { text: "To skip the current iteration of a loop and continue with the next iteration.", correct: false },
            { text: "To define a block of code that should be executed when a certain condition is true.", correct: false },
            { text: "To execute a block of code repeatedly while a specified condition is true.", correct: false }
        ]
    },
    {
        question: "Which built-in method returns the characters in a string beginning at the specified location?",
        answers: [
            { text: "slice()", correct: true, explanation: "The slice() method returns the characters in a string beginning at the specified location." },
            { text: "substr()", correct: false },
            { text: "substring()", correct: false },
            { text: "splice()", correct: false }
        ]
    },
    {
        question: "What does the following JavaScript code do: parseInt('10px')?",
        answers: [
            { text: "Returns 10", correct: true, explanation: "The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems). In this case, '10px' is parsed as '10'." },
            { text: "Returns NaN", correct: false },
            { text: "Throws an error", correct: false },
            { text: "Returns '10px'", correct: false }
        ]
    },
    {
        question: "Which operator is used to check if a specified property exists in a JavaScript object?",
        answers: [
            { text: "in", correct: true, explanation: "The 'in' operator is used to check if a specified property exists in a JavaScript object." },
            { text: "has", correct: false },
            { text: "exists", correct: false },
            { text: "contains", correct: false }
        ]
    },
    {
        question: "What is the result of the following expression: 10 / 'a'?",
        answers: [
            { text: "NaN", correct: true, explanation: "The division operation between a number and a non-numeric value results in NaN (Not a Number)." },
            { text: "0", correct: false },
            { text: "Infinity", correct: false },
            { text: "Error", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid JavaScript data type?",
        answers: [
            { text: "Number", correct: false },
            { text: "Boolean", correct: false },
            { text: "Array", correct: false },
            { text: "Date", correct: false },
            { text: "Object", correct: false },
            { text: "Integer", correct: true, explanation: "Integer is not a valid JavaScript data type. JavaScript only has Number, String, Boolean, Object, Null, and Undefined as basic data types." }
        ]
    }
];

const questionElement= document.getElementById("question");
const answerButton= document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currQuestionIndex=0;
let score=0;

function startQuiz()
{
    currQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currQuestion=questions[currQuestionIndex];
    let questionNo=currQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currQuestion.question;

    currQuestion.answers.forEach(answer=>{const button=document.createElement('button');
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=> 
        {if(button.dataset.correct==="true"){
            button.classList.add("correct");
    }
    button.disabled=true;
})
nextButton.style.display="block";
}

function showCorrectAnswers() {
    resetState();
    questionElement.innerHTML = "Correct Answers:";
    questions.forEach((question, index) => {
        const correctAnswer = question.answers.find(answer => answer.correct);
        const answerText = `${index + 1}. ${question.question} - ${correctAnswer.text}`;
        const explanationText = correctAnswer.explanation;
        const answerDiv = document.createElement('div');
        answerDiv.textContent = answerText;
        answerDiv.classList.add('correct-answer');
        questionElement.appendChild(answerDiv);
        if (explanationText) {
            const explanationDiv = document.createElement('div');
            explanationDiv.textContent = `Explanation: ${explanationText}`;
            questionElement.appendChild(explanationDiv);
        }
        // Add line gap after each correct answer
        const lineGap = document.createElement('div');
        lineGap.classList.add('line-gap');
        questionElement.appendChild(lineGap);
    });
    nextButton.style.display = "none";
}


function showScore() {
    resetState();
    const scoreText = `Your score is ${score} out of ${questions.length}!!`;
    questionElement.innerHTML = scoreText;
    const showCorrectBtn = document.createElement('button');
    showCorrectBtn.textContent = "Show Correct Answers";
    showCorrectBtn.classList.add('btn');
    showCorrectBtn.addEventListener("click", showCorrectAnswers);
    answerButton.appendChild(showCorrectBtn);
}

function handleNextButton(){
    currQuestionIndex++;
    if(currQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }

}


nextButton.addEventListener("click",()=>{
    if(currQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();