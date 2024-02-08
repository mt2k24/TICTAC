let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Player turn(chance)
let turnO = true; // Assuming it starts with player O

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Convert NodeList to Array
boxes = Array.from(boxes);

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            // player O's turn
            box.innerText = "O";
        } else {
            // player X's turn
            box.innerText = "X";
        }
        turnO = !turnO; // Toggle turn after each move
        box.disabled = true; // Disable the box after being clicked
        checkWinner(); // Check for winner after each move
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    setTimeout(resetGame, 10000); // Reset the game after 10 seconds
};

const checkDraw = () => {
    // Check if all boxes are filled
    return boxes.every(box => box.innerText !== "");
};

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // There's a winner
                console.log("Winner:", pos1Val);
                // You can display the winner message or perform other actions here
                showWinner(pos1Val);
                winnerFound = true;
                break; // Exit the loop if there's a winner
            }
        }
    }

    // If no winner is found, check for a draw
    if (!winnerFound && checkDraw()) {
        console.log("It's a draw!");
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        setTimeout(resetGame, 10000); // Reset the game after 10 seconds
    }
};

// Event listener for reset button
resetbtn.addEventListener("click", resetGame);

// Event listener for new game button
newGameBtn.addEventListener("click", resetGame);
