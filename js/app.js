$(document).ready(function(){
	

	var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;

	newGame();

	/*--- Submit ---*/
	$("form").submit(function(event){
		
		event.preventDefault();
    	
    	if (!found) {
			userChoice = $('#userGuess').val();
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemparature(Math.abs(randomNumber - userChoice));
			};
		} else {
			setFeedback("You won! Press New Game to start a new game.");
		};
  	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Creat new game on click ---*/
  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

	/*--- Create a New Game! ---*/
	function newGame() {
		guessFlag = true;
		guessCount = 0;
		found = false;
		$("ul#guessList li").remove();
		setFeedback("Pick a number!");
		setCount(guessCount);
		randomNumber = generateNumber();
		setFocus();
		clearText();
	}

	/*--- Generate Random Number ---*/
	function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("No fair! You found the hidden number! Your hidden number is= "+ generatedNumber);

		return generatedNumber;
	}
	
	/*--- Set focus ---*/
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	/*--- Clear the text box ---*/
	function clearText() {
		$('#userGuess').val('');
	}

	/*--- guess count ---*/
	function setCount(count) {
		$('#count').text(guessCount);
	}

	/*--- Prompt for Guess ---*/
	function getChoice() {
		var userChoice = prompt("Guess the Number","Your Guess");a
		console.log("Your choice is : "+ userChoice);
		return userChoice;
	}

	/*--- Is guess a number between 1 and 100?---*/
	function checkChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("Sorry, please enter a number");
			return true;
		} else if (userChoice < 1 || userChoice > 100) {
			setFeedback("Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(userChoice) == '') {
			setFeedback("Enter your guess.");
			return true;
		} else {
			return false;
		};
	}

	/*--- Hot or Cold for feedback ---*/
	function checkTemparature(guessDifference) {

		if (guessDifference == 0) {
			setFeedback("You guessed it!");
			found = true;
			return false;
		} else if (guessDifference <= 5) {
			setFeedback("You're on fire!");
			return true;
		} else if (guessDifference <= 10){
			setFeedback("You're very hot!");
			return true;
		} else if (guessDifference>=10 && guessDifference <= 20) {
			setFeedback("You're getting hot!");
			return true;
		} else if (guessDifference>=20 && guessDifference <= 30) {
			setFeedback("You're getting warmer.");
			return true;
		} else if (guessDifference>=30 && guessDifference <= 40) {
			setFeedback("Your guess is cold.");
			return true;
		} else {
			setFeedback("Your guess is freezing cold!");
			return true;
		}

	}

	/*--- feedback ---*/
	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}

});


