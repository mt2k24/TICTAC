let boxes = document.querySelector(".box");
let resetbtn = document.querySelector("#reset-btn");

// Player turn(chance)
let turnO = true; // Assuming it starts with player O

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 5],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

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
        box.disabled = true;
    });
});

