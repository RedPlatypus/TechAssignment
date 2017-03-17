console.log("Part 1");
/*
Aequilibrium is in the business of building castles (we really aren’t, but let’s pretend). Now, we also believe in
quality aesthetics, so we only want to build castles in two types of places:
a. Peaks
b. Valleys
Let’s say you have an array of integers that describes a stretch of land, where each integer represents the
current height of the land. Can you write a function that reads that array and returns the number of castles
that Aequilibrium should build on that stretch of land?
You can assume that you can always build a castle at the start of the array.
*/

//my assumption on the question
var land1 = [50, 200, 2000, 50, 500, 2000, 50]; // should be 3 valley + 2 peak = 5
var land2 = [20,0,40,0,50,0] // should be 3 valley + 1 peak = 4

var numOfCastels = function(landHeights){
	var castels = i = 0,
		minHeight = maxHeight = landHeights[0];

	//find min & max
	for (i = 0; i < landHeights.length; i++) {
		if(landHeights[i] < minHeight)
			minHeight = landHeights[i];

		if(landHeights[i] > maxHeight)
			maxHeight = landHeights[i];
		
	}

	// check for num of peaks/ valleys
	for (i = 0; i < landHeights.length; i++) {
		if (landHeights[i] == minHeight || landHeights[i] == maxHeight)
			castels ++;
	}

	return castels;
};

console.log("for land plot 1: " + numOfCastels(land1));
console.log("for land plot 2: " + numOfCastels(land2));
