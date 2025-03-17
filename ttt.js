//selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

// Define win conditions for 9x9 grid (5 in a row required to win)
const winSize = 3; // Number of symbols needed in a row to win
const boardSize = 9; // 9x9 grid

window.onload = ()=>{ //once window loaded
    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all available span
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
    // Player X goes first by default, no need to change anything
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
    players.setAttribute("class", "players active player"); //set class attribute in players with players active player values
}

let playerXIcon = "fas fa-times"; //class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; //class name of fontawesome circle icon
let playerSign = "X"; //this is a global variable because we've used this variable inside multiple functions

// user click function
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O"; //if it's O's turn
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element/box
        players.classList.remove("active"); //toggle active class in players to switch turns
        players.classList.remove("player"); //remove player class to switch to X's turn
        element.setAttribute("id", playerSign); //set id attribute in span/box with player chosen sign
    }else{
        playerSign = "X"; //if it's X's turn
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element/box
        players.classList.add("active"); //toggle active class in players to switch turns
        players.classList.add("player"); //add player class to switch to O's turn
        element.setAttribute("id", playerSign); //set id attribute in span/box with player chosen sign
    }
    selectWinner(); //calling selectWinner function
    element.style.pointerEvents = "none"; //once user selects any box, that box can't be clicked again
}

function getIdVal(row, col){
    let index = (row * boardSize) + col + 1;
    return document.querySelector(".box" + index).id; //return id value
}

// Check if there's a win condition
function selectWinner(){
    // Get board state as 2D array for easier checking
    let board = [];
    for(let i = 0; i < boardSize; i++) {
        let row = [];
        for(let j = 0; j < boardSize; j++) {
            let index = i * boardSize + j + 1;
            let box = document.querySelector(".box" + index);
            row.push(box.id || "");
        }
        board.push(row);
    }
    
    // Check for winner
    if(checkForWin(board, playerSign)) {
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
        
        // Disable all boxes after win
        for (let i = 0; i < allBox.length; i++) {
            allBox[i].style.pointerEvents = "none";
        }
    } else {
        // Check for draw
        let isDraw = true;
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].id === "") {
                isDraw = false;
                break;
            }
        }
        
        if(isDraw) {
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

// Check for win in any direction
function checkForWin(board, sign) {
    // Check horizontal wins
    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j <= boardSize - winSize; j++) {
            let win = true;
            for(let k = 0; k < winSize; k++) {
                if(board[i][j+k] !== sign) {
                    win = false;
                    break;
                }
            }
            if(win) return true;
        }
    }
    
    // Check vertical wins
    for(let i = 0; i <= boardSize - winSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            let win = true;
            for(let k = 0; k < winSize; k++) {
                if(board[i+k][j] !== sign) {
                    win = false;
                    break;
                }
            }
            if(win) return true;
        }
    }
    
    // Check diagonal wins (top-left to bottom-right)
    for(let i = 0; i <= boardSize - winSize; i++) {
        for(let j = 0; j <= boardSize - winSize; j++) {
            let win = true;
            for(let k = 0; k < winSize; k++) {
                if(board[i+k][j+k] !== sign) {
                    win = false;
                    break;
                }
            }
            if(win) return true;
        }
    }
    
    // Check diagonal wins (top-right to bottom-left)
    for(let i = 0; i <= boardSize - winSize; i++) {
        for(let j = winSize - 1; j < boardSize; j++) {
            let win = true;
            for(let k = 0; k < winSize; k++) {
                if(board[i+k][j-k] !== sign) {
                    win = false;
                    break;
                }
            }
            if(win) return true;
        }
    }
    
    return false;
}

replayBtn.onclick = ()=>{
    window.location.reload(); //reload the current page on replay button click
}