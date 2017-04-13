function randomColor() {
		var r=Math.floor(Math.random()*256);
		var g=Math.floor(Math.random()*256);
		var b=Math.floor(Math.random()*256);
		return "rgb("+r+", "+g+", "+b+")";
};

function generateRandomColors(num) {
	var arr=[];
	for (i=0;i<num;i++) {
		arr.push(randomColor());
	}
	return arr;
};

var numSquare=6;
var colors=[];
var pickedColor;
var squares=document.querySelectorAll(".square");
var colorDisplay=document.getElementById("colorDisplay");
var messageDisplay=document.getElementById("message");
var h1=document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtns=document.querySelectorAll(".mode");


init();

function init(){
	modeBtnListeners();
	setSquares();
	resetButton.addEventListener("click",reset);
	reset();
};

function modeBtnListeners() {
	for (var i=0;i<modeBtns.length;i++) {
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			//One line if
			this.textContent=="EASY" ? numSquare=3: numSquare=6;
			reset();
		})
	}
}

function setSquares() {
	for(i=0; i<squares.length; i++) {
		// add events to squares
		squares[i].addEventListener("click", function(){
			if (this.style.background===pickedColor) {
				messageDisplay.textContent="Correct";
				changeColors(pickedColor);
			} else {
				this.style.background=document.body.style.background;
				messageDisplay.textContent="Try again!"
			}
			resetButton.innerText="NEW GAME?";
		})
	}
}

function reset() {
	//generate new colors
	colors=generateRandomColors(numSquare);
	//select a color
	pickedColor=pickColor();
	//Display the selected color name
	colorDisplay.textContent=pickedColor;
	resetButton.innerText="NEW COLORS";
	messageDisplay.textContent="";
	//Change the squares' colors
	for(i=0; i<squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display="block";
			squares[i].style.background=colors[i];
		} else {
			squares[i].style.display="none";
		}
	};
	h1.style.background=document.body.style.background;
};

function changeColors(color) {
	for(i=0; i<squares.length; i++) {
			squares[i].style.background=color;
	}
	h1.style.background=color;
}

function pickColor() {
	var random=Math.floor(Math.random()*colors.length);
	return colors[random];
}
