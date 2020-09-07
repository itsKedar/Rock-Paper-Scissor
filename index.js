const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const compScore = document.querySelector('[data-computer]');
const playerScore = document.querySelector('[data-player]');
const res = document.querySelector(".Option");
const possibleAnswers = [{
        name: "rock",
        emoji: "👊",
        beats: "Scissors"
    },
    {
        name: "Paper",
        emoji: "🖐",
        beats: "rock"
    },
    {
        name: "Scissors",
        emoji: "✌",
        beats: "Paper"
    }
]


selectionButtons.forEach(selectionButton => {

    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = possibleAnswers.find(selection => selection.name === selectionName);
        makeSelection(selection);
        e.preventDefault;

    })
})


function makeSelection(selectionName) {
    const comselection = comChoice();
    const Winner = isWinner(selectionName, comselection);
    const comWinner = isWinner(comselection, selectionName);
    addSelection(comselection, comWinner);
    addSelection(selectionName, Winner);
    if (Winner == true && comWinner == false) {
        res.innerHTML = "Computer choice " + comselection.emoji + "<br><span style='color:green'>Player Wins</span>";
        playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
    } else if (Winner == false && comWinner == true) {
        res.innerHTML = "Computer choice " + comselection.emoji + "<br><span style='color:red'>Computer Wins</span>";
        compScore.innerHTML = parseInt(compScore.innerHTML) + 1;
    } else {
        res.innerHTML = "Computer choice " + comselection.emoji + "<br><span style='color:grey'>Draw Try Again...</span>";
    }
}

function addSelection(selection, winner) {
    const div = document.createElement('div');
    div.innerHTML = selection.emoji;
    div.classList.add('result-select');
    if (winner) {
        div.classList.add('winner');
    }
    finalColumn.after(div);
}

function isWinner(selection, comselection) {
    return selection.beats === comselection.name;
}

function comChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return possibleAnswers[randomIndex];
}