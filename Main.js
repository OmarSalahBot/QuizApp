let quizPlacement = document.querySelector(".content .quiz-placement");
let bullets = document.querySelector(".content .bullets");
let button = document.querySelector(".content .button a");
let qCounterSpan = document.querySelector(".content .counter span");
let currentIndex = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
// Making Request To Get The Questions
function getQuestions() {
    let Request = new XMLHttpRequest();
    Request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let questionsList = JSON.parse(this.responseText);
            // Function To Add The Questions To The Page
            addBullets(questionsList.length);
            AddQuestions(questionsList[currentIndex],questionsList.length);
            button.addEventListener("click",()=>{
                checkAnswer(questionsList[currentIndex].right_answer,questionsList.length);
                currentIndex++;
                if(currentIndex < questionsList.length){
                    updateBullets();
                    quizPlacement.innerHTML ='';
                    AddQuestions(questionsList[currentIndex],questionsList.length);
                }
                else{
                    endQuiz(questionsList.length);
                }
            })
        }
    }
    Request.open("GET","Questions.json",true);
    Request.send();
}
// Building The  getQuestions Function
getQuestions();
function AddQuestions(Question,count){
    // Updating The Question Number
    qCounterSpan.innerHTML = currentIndex+1;
    // Create The Question Title
    let title = document.createElement("div");
    title.className = "title";
    title.innerText = Question.title;
    quizPlacement.appendChild(title);
    let answers = document.createElement("div");
    answers.className = "answers";
    // Creating The Answers
    for(let i = 1; i<5;i++){
        // Create Div To Make The Radio And Lable On It
        let div = document.createElement("div")
        div.className = `answer${i}`;
        let radioInput = document.createElement("input");
        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `answer${i}`;
        radioInput.dataset.answer = Question[`answer_${i}`];
        let lable = document.createElement("label");
        lable.innerText = Question[`answer_${i}`];
        lable.htmlFor = `answer${i}`;
        div.appendChild(radioInput);
        div.appendChild(lable);
        answers.appendChild(div)
    }
    quizPlacement.appendChild(answers);
}
function checkAnswer(rAnswer,count){
    let inputs = document.querySelectorAll(".content .answers input");
    let userAnswer;
    inputs.forEach(e=>{
        if(e.checked){
            userAnswer = e.dataset.answer;
        }
    })
    if(userAnswer === rAnswer){
        rightAnswers++;
    }
}
// Building The  addBullets Function
function addBullets(counter){
    for(let i =0;i<counter;i++){
        // Making The Bullets spans\
        let span =document.createElement("span");
        if(i===0){
            span.className = "on";
        }
        bullets.appendChild(span);
    }
}
function updateBullets() {
    let bulletSpan = document.querySelectorAll(".content .bullets span");
    let arrayOfSpans = Array.from(bulletSpan);
    arrayOfSpans.forEach((e)=>{
        e.classList.remove("on");
    })
    arrayOfSpans[currentIndex].classList.add("on");
}

function endQuiz(qCount){
    document.body.innerHTML = "";
    let FinalText = document.createElement("h2");
    FinalText.innerHTML = `You got <br> ${rightAnswers} / ${qCount}`;
    document.body.appendChild(FinalText);
}
