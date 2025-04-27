// --- Load scores from localStorage (feature: score saving even after refresh) ---
let scoreO = localStorage.getItem('scoreO') ? parseInt(localStorage.getItem('scoreO')) : 0;
let scoreX = localStorage.getItem('scoreX') ? parseInt(localStorage.getItem('scoreX')) : 0;

// --- Grabbing DOM elements we will need ---
const scoreOElement = document.getElementById("score-o");
const scoreXElement = document.getElementById("score-x");
const resetBtn = document.getElementById("reset-btn");
const resetScoresBtn = document.getElementById("reset-scores-btn");
const newGameBtn = document.getElementById("new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.getElementById("msg");

// --- Selecting all boxes for game moves ---
let boxes = document.querySelectorAll(".box");
boxes = Array.from(boxes); // Convert NodeList to Array for easier handling

// --- Winning patterns: these index combos mean someone has won ---
const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],
    [2,5,8],[2,4,6],[3,4,5],[6,7,8]
];

// --- Display current scores when page loads ---
scoreOElement.innerText = scoreO;
scoreXElement.innerText = scoreX;

// --- Variable to track whose turn it is (O always starts first) ---
let turnO = true;

// --- Reset just the board (without resetting scores) ---
const resetGame = () => {
    turnO = true; // Reset turn to O
    enableBoxes(); // Enable all boxes and clear text
    msgContainer.classList.add("hide"); // Hide the winner message
};

// --- Disable all boxes (used after someone wins or draw) ---
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// --- Enable all boxes (used when starting a new game) ---
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// --- Display winner and update scores ---
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show winner message
    disableBoxes(); // No more moves allowed

    // Update the correct player's score
    if (winner === "O") {
        scoreO++;
        localStorage.setItem('scoreO', scoreO);
        scoreOElement.innerText = scoreO;
    } else if (winner === "X") {
        scoreX++;
        localStorage.setItem('scoreX', scoreX);
        scoreXElement.innerText = scoreX;
    }

    // Automatically reset the board after 5 seconds
    setTimeout(resetGame, 5000);
};

// --- Check if the board is full and it's a draw ---
const checkDraw = () => {
    return boxes.every(box => box.innerText !== "");
};

// --- Check if there is a winner after every move ---
const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // Someone won
                winnerFound = true;
                break;
            }
        }
    }

    // If no winner but board is full -> draw
    if (!winnerFound && checkDraw()) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        setTimeout(resetGame, 5000);
    }
};

// --- Event listener for each box when clicked ---
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"; // Player O move
        } else {
            box.innerText = "X"; // Player X move
        }
        turnO = !turnO; // Switch turns
        box.disabled = true; // Once clicked, disable the box
        checkWinner(); // Check if the move won the game
    });
});

// --- Button event: Reset only the game board ---
resetBtn.addEventListener("click", resetGame);

// --- Button event: Start a new game from winner message ---
newGameBtn.addEventListener("click", resetGame);

// --- Button event: Reset scores completely ---
resetScoresBtn.addEventListener("click", () => {
    scoreO = 0;
    scoreX = 0;
    localStorage.removeItem('scoreO');
    localStorage.removeItem('scoreX');
    scoreOElement.innerText = scoreO;
    scoreXElement.innerText = scoreX;
});
