let questionsJson = [

    {"question":"When did the public internet go online?", 
    "answersArray":["1905", "1945", "1992", "1983"],
    "correctAnswer": "1983"},
    
    {"question":"What was the first practical programming language?", 
    "answersArray":["C", "FORTRAN", "Cobol", "Java"],
    "correctAnswer": "FORTRAN"},

    {"question":"What do compilers do?", 
    "answersArray":["Translate human code to machine code", "Turn code into graphics", "Translate binary to human readable code", "Wake you up at night"],
    "correctAnswer": "Translate human code to machine code"},

    {"question":"Whats not a programming language?", 
    "answersArray":["C++", "Rust", "Swift", "Linux"],
    "correctAnswer": "Linux"},
  
]

let currentQuestionInJson = 0;
let currentScore = 0;
let currentProgress = 0;  


// Shuffle the arrayOfNumbers using the Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//////////////////////////



function renderQuestion(){
    document.getElementById('mainDynamicContainerId').innerHTML = '';
    document.getElementById('mainDynamicContainerId').innerHTML += /*html*/`
        <h5 class="card-title">Frage ${currentQuestionInJson+1} : ${questionsJson[currentQuestionInJson]["question"]}</h5>
        `;
        
//Mixing up order of answers each render: 
//Creating an array with values [0,1,2,3,4 ...,questionsJson[currentQuestionInJson]["answersArray"].length] to randomize answer order
let arrayOfNumbers = Array.from({ length: questionsJson[currentQuestionInJson]["answersArray"].length }, (v, k) => k);
shuffleArray(arrayOfNumbers);
//Use the mixed indexes to access answers in a random order each render:
//to do that i replace each i with arrayOfNumbers[i]
    for(let i = 0; i < questionsJson[currentQuestionInJson]["answersArray"].length; i++)
        {
            document.getElementById('mainDynamicContainerId').innerHTML += /*html*/`
            
                <div class="card mb-2">
                <div class="card-body" id="question${currentQuestionInJson}answer${arrayOfNumbers[i]}Id" onclick="checkAnswer(${currentQuestionInJson},${arrayOfNumbers[i]})">
                    ${questionsJson[currentQuestionInJson]["answersArray"][arrayOfNumbers[i]]}
                </div>
                </div>
            `;
        }

    document.getElementById('mainDynamicContainerId').innerHTML += /*html*/`
        <div class="question-footer">
        <span><b>${currentQuestionInJson+1}</b> von <b>${questionsJson.length}</b> Fragen</span>
        <button class="btn btn-primary"onclick="renderNextQuestion()" id="nextQuestionButtonId">Nächste Frage</button>
        </div>
        
    `;
    document.getElementById('nextQuestionButtonId').disabled = true;
    currentProgress = ((currentQuestionInJson+1) / questionsJson.length)*100;
}

function checkAnswer(currentQuestion, index){
    document.getElementById('nextQuestionButtonId').disabled = false;
    updateProgressBar();

    let clickedAnswerId = document.getElementById(`question${currentQuestion}answer${index}Id`);
    if( clickedAnswerId.innerText == questionsJson[currentQuestionInJson]["correctAnswer"]){
        clickedAnswerId.classList.add('bg-success', 'text-white' ,'animate1');
        currentScore++;
    }
    else{
        for(let j = 0; j < questionsJson[currentQuestionInJson]["answersArray"].length; j++)
            {
                if(document.getElementById(`question${currentQuestionInJson}answer${j}Id`).innerText == questionsJson[currentQuestionInJson]["correctAnswer"])
                document.getElementById(`question${currentQuestionInJson}answer${j}Id`).classList.add('bg-success', 'text-white','animate1');

                else{
                    document.getElementById(`question${currentQuestionInJson}answer${j}Id`).classList.add('bg-secondary', 'text-white' );
                    clickedAnswerId.classList.add('bg-danger');
                }
            }
    }
}

function renderNextQuestion(){
    currentQuestionInJson++;
    if(currentQuestionInJson >= questionsJson.length){
        document.getElementById('mainDynamicContainerId').innerHTML = '';
        document.getElementById('mainDynamicContainerId').innerHTML += `Correct answers <b>${currentScore}</b> out of <b>${questionsJson.length}</b> <br><br>
        <div class=""><button class="btn btn-primary"onclick="restartQuiz()">Restart quiz</button></div>` 
        return;
    }
    renderQuestion();
}

function restartQuiz(){
    currentScore =0;
    currentQuestionInJson = 0;
    currentProgress=0;
    resetProgressBar();
    renderQuestion();

}

function updateProgressBar(){
    currentProgress = ((currentQuestionInJson+1) / questionsJson.length)*100;
    document.getElementById('progressBarId').innerText = `${currentProgress}%`; 
    document.getElementById('progressBarId').style.width= `${currentProgress}%`;
}

function resetProgressBar(){
    document.getElementById('progressBarId').innerText = ''; 
    document.getElementById('progressBarId').style.width= `0%`;

}