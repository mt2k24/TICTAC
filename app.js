let boxes = document.querySelector(".box");
let resetbtn = document.querySelector("#reset-btn");

// Player turn(chance)
let turnO = true; //playerX , playerO

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
            // playerO
            box.innerTeaxt = "O";
        } else {
            //playerX
            box.innerTeaxt = "X";
            turnO = true;
        }
        box.disabled = true;
    });
});
