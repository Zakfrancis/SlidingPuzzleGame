//swap the className of two given td elements
function swap(c1,c2,fromShuffle) {
	var temp = document.getElementById(c1).className;
	document.getElementById(c1).className = document.getElementById(c2).className;
	document.getElementById(c2).className = temp;
	
	//simple flag to stop shuffle from calling checkComplete
	if(!fromShuffle){
		checkComplete(); //check completeness on each swap
	}
}

//For each td element, swap it with a random other td element
function shuffle(){
	for (var row=1;row<=3;row++) {
		for (var column=1;column<=3;column++) {
			var row2=Math.floor(Math.random()*3 + 1);
			var column2=Math.floor(Math.random()*3 + 1);
			swap(row+"_"+column,row2+"_"+column2,true);
		} 
	} 
}

//reset image to original layout
function reset(){
	var counter = 1; //counter used to iterate the className of td elements
	for (var row=1;row<=3;row++) {
		for (var column=1;column<=3;column++) {
			document.getElementById(row+"_"+column).className = ("t"+counter)
			counter++;
		}
	}
}

//swap the clicked tile with adjacent whitespace
function move(r,c) {
	var cell = document.getElementById(r+"_"+c);
	
	//check if clicked cell is white space and return if true
	if(cell.className == "t9"){
		return;
	}
	else{
		//if whitespace is to the right
		if(c<3){
			if(document.getElementById(r+"_"+(c+1)).className == "t9"){
				swap(r+"_"+c,r+"_"+(c+1));
				return;
			}
		}
		//if whitespace is to the left
		if(c>1){
			if(document.getElementById(r+"_"+(c-1)).className == "t9"){
				swap(r+"_"+c,r+"_"+(c-1));
				return;
			}
		}
		//if whitespace is above
		if(r>1){
			if(document.getElementById((r-1)+"_"+c).className == "t9"){
				swap(r+"_"+c,(r-1)+"_"+c);
				return;
			}
		}
		//if whitespace is below
		if(r<3){
			if(document.getElementById((r+1)+"_"+c).className == "t9"){
				swap(r+"_"+c,(r+1)+"_"+c);
				return;
			}
		}		
	}
}

//function to check if the puzzle is complete. if it is, display a confirm popup
function checkComplete(){
	var flag = true; //set to false if td element has the wrong className
	var counter = 1;
	for (var row=1;row<=3;row++) {
		for (var column=1;column<=3;column++) {
			if(document.getElementById(row+"_"+column).className != ("t"+counter)){
				flag = false;
			}
			counter++;
		}
	}
	
	//if complete
	if(flag){
		document.getElementById("3_3").className = "t9complete"; //change whitespace to the missing image piece
		
		//timeout to allow html elements to update before popup
		setTimeout(function() {
			if(window.confirm("Congratulations, You solved it! Click okay to shuffle and try again!")){
				document.getElementById("3_3").className = "t9"; //change back to whitespace before shuffle
				shuffle();
			}
		},10)
	}
}