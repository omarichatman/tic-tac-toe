let winner;
let myTimer;
let turn = '';
let gamesPlayed = 0;
let currentTimeMins = 0;
let currentTimeSecs = 0;

function timer() { 
	currentTimeSecs++;

	if(currentTimeSecs == 60) { // if 60 seconds have passed, increment the minutes and reset seconds
		currentTimeMins++;
		document.getElementById("gameTimerMins").innerText = currentTimeMins;

		currentTimeSecs = 0;
		document.getElementById("gameTimerSecs").innerText = currentTimeSecs;
	}
	else { // else just change seconds
		document.getElementById("gameTimerSecs").innerText = currentTimeSecs;
	}
}

function setTurn() { // Alternate between X and O 

	turn == 'X' ? turn = 'O' : turn = 'X';
}

function getRand() { // If pvp get random starting value

	return (Math.floor(Math.random() * 2) == 0) ? 'X' : 'O';
}

function getWinner() { // Whoever had the last turn wins

	return turn == 'X' ? "Player X" : "Player O";
}

function threeInARow(cell1, cell2, cell3) { // Compare 3 cell values for a match

	if(cell1 == 'X') {
		return (((cell1 == cell2) && (cell1 == cell3)));
	}
	else if(cell1 == 'O') {
		return (((cell1 == cell2) && (cell1 == cell3)));
	}
}

function winnerGreen(cell1, cell2, cell3) {
	cell1.style.backgroundColor = '#4cef37';
	cell2.style.backgroundColor = '#4cef37';
	cell3.style.backgroundColor = '#4cef37'; 
}

function resetBoard() { // Clear the board for Start/Restart and Play Again

	for (let i = 0, row; row = document.getElementById("table").rows[i]; i++) {
		for (let j = 0, col; col = row.cells[j]; j++) {
			   document.getElementById("table").rows[i].cells[j].innerText = "";
			   document.getElementById("table").rows[i].cells[j].style.backgroundColor = '#009dff';
   		}  
   	}
}

function resetMenu() { // When game is not started, diable menu options

	document.getElementById("playAgainBtn").disabled = true;
	document.getElementById("restartBtn").disabled = true;
	document.getElementById('pvpRadio').checked = false;
	document.getElementById('pvcRadio').checked = false;
	document.forms["gameMode"].elements["mode"][0].disabled = false;
	document.forms["gameMode"].elements["mode"][1].disabled = false;
	document.getElementById("gameWinner").innerText = "";
	document.getElementById("gameTimerMins").innerText = "";
	document.getElementById("gameTimerSecs").innerText = "";
}

function resetTimer() {
	window.clearInterval(myTimer);
	currentTimeMins = 0;
	currentTimeSecs = 0;
}
function checkGameMode() { // Check if its pvp or pvc, then set 'X' or 'O'

	if(document.getElementById("pvpRadio").checked) {
		turn = getRand();
	}
	else if(document.getElementById("pvcRadio").checked) {
		turn = 'X';
	}
}

function checkTie() { // See if there is a tie

	let count = 0;

	for (let i = 0, row; row = document.getElementById("table").rows[i]; i++) {
		for (let j = 0, col; col = row.cells[j]; j++) {
			if(document.getElementById("table").rows[i].cells[j].innerText == 'X' || document.getElementById("table").rows[i].cells[j].innerText == 'O') {
				count++;
			}
	   	}
	}

	document.getElementById("gamesPlayed").innerText = gamesPlayed.toString();
	return count == 9 ?  true : false;
}

function gameOver() { // Check to see if someone has won(no tie)

	// Loop through the rows
	for (let i = 0; i < 3; i++) {
        if (threeInARow(document.getElementById("table").rows[i].cells[0].innerText, document.getElementById("table").rows[i].cells[1].innerText, document.getElementById("table").rows[i].cells[2].innerText)) {
			winnerGreen(document.getElementById("table").rows[i].cells[0], document.getElementById("table").rows[i].cells[1], document.getElementById("table").rows[i].cells[2]);
            return true;
        }
    }
    // Loop through the columns
    for (let i = 0; i < 3; i++) {
        if (threeInARow(document.getElementById("table").rows[0].cells[i].innerText, document.getElementById("table").rows[1].cells[i].innerText, document.getElementById("table").rows[2].cells[i].innerText)) {
			winnerGreen(document.getElementById("table").rows[0].cells[i], document.getElementById("table").rows[1].cells[i], document.getElementById("table").rows[2].cells[i]);
            return true;
        }
    }
    // Check diagonals lef to right
    if (threeInARow(document.getElementById("table").rows[0].cells[0].innerText, document.getElementById("table").rows[1].cells[1].innerText, document.getElementById("table").rows[2].cells[2].innerText)) {
		winnerGreen(document.getElementById("table").rows[0].cells[0], document.getElementById("table").rows[1].cells[1], document.getElementById("table").rows[2].cells[2]);
        return true;
    }
    // Check diagnals right to left
    if (threeInARow(document.getElementById("table").rows[0].cells[2].innerText, document.getElementById("table").rows[1].cells[1].innerText, document.getElementById("table").rows[2].cells[0].innerText)) {
		winnerGreen(document.getElementById("table").rows[0].cells[2], document.getElementById("table").rows[1].cells[1], document.getElementById("table").rows[2].cells[0]);
        return true;
    }

    return false;
}

function computerAI() {

	let randIndex1 = Math.floor(Math.random() * document.getElementById("table").rows.length);
	let randIndex2 = Math.floor(Math.random() * document.getElementById("table").rows.length);

	// Check for open space, if open then randomly select a empty cell then set it to 'O'
	if(document.getElementById("table").rows[randIndex1].cells[randIndex2].innerText != 'X' && document.getElementById("table").rows[randIndex1].cells[randIndex2].innerText != 'O') {
		document.getElementById("table").rows[randIndex1].cells[randIndex2].innerText = 'O';
		document.getElementById("table").rows[randIndex1].cells[randIndex2].removeEventListener("click", pvcClickMe);

		// if the game is over, computer wins, disable the baord and display winnrer
		if(gameOver()) {
			rmvListenerAllPvc();
			gamesPlayed++;
	        document.getElementById("gamesPlayed").innerText = gamesPlayed.toString();
	        document.getElementById("gameWinner").innerText = getWinner();
			document.getElementById("playAgainBtn").disabled = false;
			document.getElementById("restartBtn").disabled = true;
			window.clearInterval(myTimer);
		}
		// if there is a tie, display winner 
		else if(!gameOver() && checkTie()) {
			gamesPlayed++;
	        document.getElementById("gamesPlayed").innerText = gamesPlayed.toString();
	        document.getElementById("gameWinner").innerText = "No one" ;
	        document.getElementById("playAgainBtn").disabled = false;
	        document.getElementById("restartBtn").disabled = true;
	        window.clearInterval(myTimer);
		}
	}
	// keep looking for open spot on board
	else {
		computerAI();
	}
}

function rmvListenerAllPvp() { // Remove all the eventListeners for Player vs Player

	for (let i = 0, row; row = document.getElementById("table").rows[i]; i++) {
		for (let j = 0, col; col = row.cells[j]; j++) {
			document.getElementById("table").rows[i].cells[j].removeEventListener("click", pvpClickMe);
	   	}
	}
}

function rmvListenerAllPvc() { // Remove all the eventListeners for Player vs Computer

	for (let i = 0, row; row = document.getElementById("table").rows[i]; i++) {
		for (let j = 0, col; col = row.cells[j]; j++) {
			document.getElementById("table").rows[i].cells[j].removeEventListener("click", pvcClickMe);
	   	}
	}
}

function rmvListenerOnePvp(event) { // Remove specific the eventListeners for Player vs Player
	event.target.removeEventListener("click", pvpClickMe);
}

function rmvListenerOnePvc(event) { // Remove specific the eventListeners for Player vs Computer
	event.target.removeEventListener("click", pvcClickMe);
}

function pvpClickMe(event) { 

	// Place turn in cell, then disable that cell
	event.target.innerText = turn;
	rmvListenerOnePvp(event);

	if(gameOver()) { 
		rmvListenerAllPvp();
		gamesPlayed++;
        document.getElementById("gamesPlayed").innerText = gamesPlayed.toString();
        document.getElementById("gameWinner").innerText = getWinner();
		document.getElementById("playAgainBtn").disabled = false;
		document.getElementById("restartBtn").disabled = true;
		window.clearInterval(myTimer);
	}
	else if(!gameOver() && checkTie()) {
		gamesPlayed++;
        document.getElementById("gamesPlayed").innerText = gamesPlayed.toString();
        document.getElementById("gameWinner").innerText = "No one" ;
        document.getElementById("playAgainBtn").disabled = false;
        document.getElementById("restartBtn").disabled = true;
        window.clearInterval(myTimer);
	}
	else {
		setTurn();
	}
}

function pvcClickMe(event) {

	// Place 'X' in cell, then disable that cell
	event.target.innerText = 'X';
	rmvListenerOnePvc(event);

	if(gameOver()) {
		rmvListenerAllPvc();
		gamesPlayed++;
        document.getElementById("gamesPlayed").innerText = gamesPlayed.toString();
        document.getElementById("gameWinner").innerText = getWinner();
		document.getElementById("playAgainBtn").disabled = false;
		document.getElementById("restartBtn").disabled = true;
		window.clearInterval(myTimer);
	}
	else if(!gameOver() && checkTie()) {
		gamesPlayed++;
        document.getElementById("gamesPlayed").innerText = gamesPlayed.toString();
        document.getElementById("gameWinner").innerText = "No one" ;
        document.getElementById("playAgainBtn").disabled = false;
        document.getElementById("restartBtn").disabled = true;
        window.clearInterval(myTimer);
	}
	else {
		computerAI();
	}
}


window.onload = function() {

	const radios = document.forms["gameMode"].elements["mode"]; // Currently selected radio button

			radios[0].onclick = function() {

				// document.getElementById("gameTimer").innerText = "working";
				myTimer = window.setInterval(timer, 1000);

				document.getElementById("restartBtn").disabled = false;
				checkGameMode();

				for (let i = 0, row; row = document.getElementById("table").rows[i]; i++) {
			    	for (let j = 0, col; col = row.cells[j]; j++) {
				   		document.getElementById("table").rows[i].cells[j].addEventListener("click", pvpClickMe);
			   		}
				}

				// Disable both radio buttons and enable restart/start button
				radios[0].disabled = true;
				radios[1].disabled = true;
				document.getElementById("restartBtn").disabled = false;
			}

			radios[1].onclick = function() {

				// document.getElementById("gameTimer").innerText = "working";
				myTimer = window.setInterval(timer, 1000);

				document.getElementById("restartBtn").disabled = false;
				checkGameMode();

				for (let i = 0, row; row = document.getElementById("table").rows[i]; i++) {
			    	for (let j = 0, col; col = row.cells[j]; j++) {
				   		document.getElementById("table").rows[i].cells[j].addEventListener("click", pvcClickMe);
			   		}
				}

				// Randomly select who goes first for Player vs. Computer
				if(getRand() == 'O') {
					computerAI();
				}

				// Disable both radio buttons and enable restart/start button
				radios[0].disabled = true;
				radios[1].disabled = true;
				document.getElementById("restartBtn").disabled = false;
			}

	document.getElementById("restartBtn").addEventListener("click", function() {
		resetBoard();
		resetMenu();
		resetTimer();
	});

	document.getElementById("playAgainBtn").addEventListener("click", function() {
		resetBoard();
		resetMenu();
		resetTimer();
	});
}