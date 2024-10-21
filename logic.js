let button = document.getElementsByTagName("button")[0]; // Select the first button
let boxes = document.querySelectorAll(".box");
let count;
const start = () => {
    let bottom = document.querySelector(".k");
   
    button.style.display="none";
    const arr = [[0, 4, 8], [2, 4, 6], [0, 1, 2], [0, 3, 6], [3, 4, 5], [1, 4, 7], [6, 7, 8], [2, 5, 8]];
     count= 0; // Start count at 0 for the first turn

    // Reset the game state
    bottom.innerText = "Player-1 turn";
    bottom.style.fontSize="1.5rem";
    // Clear the boxes and reset styles
    boxes.forEach(box => {
        box.innerText = ""; // Clear box content
        box.style.backgroundColor = ""; // Reset background color
 
    });

    const checkWinner = () => {
        for (let combination of arr) {
            const [a, b, c] = combination;
            if (
                boxes[a].innerText === boxes[b].innerText &&
                boxes[b].innerText === boxes[c].innerText &&
                boxes[a].innerText !== ""
            ) {
                // Determine winner and highlight boxes
                bottom.innerText = count % 2 === 1 ? "Congratulations! Player-1 Won" : "Congratulations! Player-2 Won";
                bottom.style.fontSize = "2.5rem";
                button.innerText="Start Again"
                boxes[a].style.backgroundColor = "lightpink";
                boxes[b].style.backgroundColor = "lightpink";
                boxes[c].style.backgroundColor = "lightpink";
                boxes.forEach(box => box.removeEventListener("click", handleClick)); // Remove all listeners
                return true; // Winner found
            }
        }
        return false; // No winner
    };

    const handleClick = (e) => {
        if (e.target.innerText === "") { // Prevent overwriting
            if (count % 2 === 0) {
                e.target.innerText = 'X'; // Player 1
                e.target.style.color = "#4494ef";
                bottom.innerText = "Player-2 turn";
                if(button.style.display==="none")
                {
                    button.style.display="inline-block";
                    button.innerText="Restart";
                }
            } else {
                e.target.innerText = 'O'; // Player 2
                e.target.style.color = "#40B5AD";
                bottom.innerText = "Player-1 turn";
            }
            count++;
            if (count >= 5) { // Check for a winner after 5 moves
                checkWinner(); 
            }

            if (count === 9 && !checkWinner()) { // Check for a draw
                bottom.innerText = "It's a draw!";
                button.innerText="Start Again"
                bottom.style.fontSize = "2.5rem";
            }
        }
    };

    // Attach event listeners
    boxes.forEach(box => {
        box.addEventListener("click", handleClick);
    });
};

// Attach the button click event
button.addEventListener("click", start);
