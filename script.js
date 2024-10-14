let buttons = document.querySelectorAll(".button");
let reset = document.querySelector(".reset");
let popup = document.getElementById("popup");
let winnerMessage = document.getElementById("winner-message");
let newGameButton = document.getElementById("new-game-button");
let turnO = true;

const win = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.innerText === "") {
            button.innerText = turnO ? "O" : "X";
            button.disabled = true;
            turnO = !turnO;
            wincheck();
        }
    });
});

const wincheck = () => {
    let winnerFound = false;
    for (let pattern of win) {
        let position1val = buttons[pattern[0]].innerText;
        let position2val = buttons[pattern[1]].innerText;
        let position3val = buttons[pattern[2]].innerText;

        if (position1val && position1val === position2val && position1val === position3val) {
            displayWinner(position1val);
            disableButtons();
            winnerFound = true;
            break;     
        }
    }
    
    // Check for a tie
    if (!winnerFound) {
        const isTie = [...buttons].every(button => button.innerText !== "");
        if (isTie) {
            displayTie();
        }
    }
};

const displayWinner = (winner) => {
    winnerMessage.innerText = `Winner is ${winner}`;
    popup.style.visibility = "visible";
};

const displayTie = () => {
    winnerMessage.innerText = "It's a Tie!";
    popup.style.visibility = "visible";
};

const disableButtons = () => {
    buttons.forEach(button => {
        button.disabled = true;
    });
};

const enableButtons = () => {
    buttons.forEach(button => {
        button.disabled = false;
        button.innerText = "";
    });
};

const resetGame = () => {
    turnO = true;
    enableButtons();
};

reset.addEventListener("click", resetGame);

newGameButton.addEventListener("click", () => {
    resetGame();
    popup.style.visibility = "hidden";
});
