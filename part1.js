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

function LandArray(){}; 

LandArray.getPeaksAndValleys = function(heights = [], logging = false){
	//if left & right are both lower || higher, we have a peak / valley
	this.logging = logging;
	this.state = 0; 			// -1 = falling, 0 = flat, 1 = rising
	this.castles = 0; 		// count of castles
	this.transition = true; 	// when true, we have gone through a state change that results in a peak or valley
	this.height = this.pastHeight = heights[0];//initalize height
	this.pastState = 0;		//we will need state
	this.slopeState = 0; 	//we will need to check for doubles of (rising & falling) i.e. 4,4,3,3,2,2,1,1 should count for 1 valley not 3 valleys

	for (let [index, height] of heights.entries()) {
		// fancy way of getting 1 or -1 or 0 for state
		this.height = height; //let everyone have current height.
		this.state = this.height - this.pastHeight;
		this.state = this.state > 0 ? 1 : this.state < 0 ? -1 : 0;


		//check last index. This method is based on looking backwards to tell us if we are on a peak or valley, so special check for last entry.
		if (index === heights.length - 1) { 
			this._checkLast();
			//no continue, because we are still checking trend for last values
		};

		//if state check doesn't pan out, check the trend.
		if(this._checkTrend()) {
			this._setPastValues();
			this._buildCastel();
			continue;
		}

		//call appropriate method depending on current state
		this.state > 0 ? this._rising() : this.state < 0 ? this._falling() : this._flat();
		if(this.transition){
			this._setPastValues();	
			this._buildCastel();
			continue;
		}

		this._setPastValues();

	};
	return this.castles;
}

LandArray._buildCastel = function(){
	this.castles++;
	if(this.logging) console.log("Increased castles: " + this.castles);
	this.transition = false;
}

LandArray._falling = function(){
	this.slopeState = -1;
	if (this.pastState == -1) {
		if(this.logging) console.log(`${this.height} Youre continuing to fall: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
	} else if (this.pastState == 0) {
		if(this.logging) console.log(`${this.height} Youve started to fall: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
	} else if (this.pastState == 1) {
		if(this.logging) console.log(`${this.height} Youve fall after rising: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
		transition = true;
	};
}

LandArray._flat = function(){
	if (this.pastState == -1) {
		if(this.logging) console.log(`${this.height} Youre flattening after a fall: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
	} else if (this.pastState == 0) {
		if(this.logging) console.log(`${this.height} Youre on a plain: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
	} else if (this.pastState == 1) {
		if(this.logging) console.log(`${this.height} Youre flattening after a rise: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
	};
}

LandArray._rising = function(){
	this.slopeState = 1;
	if (this.pastState == -1) {
		//you just came out of a valley
		if(this.logging) console.log(`${this.height} Youve started to rise after falling: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
		transition = true;
	} else if (this.pastState == 0) {
		if(this.logging) console.log(`${this.height} Youve started to rise: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
	} else if (this.pastState == 1) {
		if(this.logging) console.log(`${this.height} youre still rising: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
	};
}

LandArray._checkTrend = function(){
	let change = false
	if (this.slopeState == -1 && this.state == 1) {
		//was trending down.. now rising
		this.transition = true;
		this.slopeState = 1;
		this.change = true;
		if(this.logging) console.log(`${this.height} You just came from a large valley. Build there.: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
		
	} else if(this.slopeState == 1 && this.state == -1){
		//was trending down.. now rising
		this.transition = true;
		this.slopeState = -1;
		this.change = true;
		if(this.logging) console.log(`${this.height} You just came off a large peak, build there.: pastState: ${this.pastState}, pastHeight: ${this.pastHeight}, currentState: ${this.state}, slopeState: ${this.slopeState}`);
		
	}
	return change;
}
LandArray._setPastValues = function(){
	this.pastState = this.state;	
	this.pastHeight = this.height;
}

LandArray._checkLast = function(){
	//always returns true, unless you never moved up or down.
	if (this.state !== 0 || this.slopeState !== 0 ) {
		if(this.logging) console.log("Building Castel on final peak/valley");
		this._buildCastel();
	};
}


//pass in `true` as 2nd parameter to see this.logging output.
//EX to get logging: LandArray.getPeaksAndValleys(landStretch, true);

var landStretch = [2,2,3,4,3,3,2,2,1,1,2,5]; // should be 4
console.log("[2,2,3,4,3,3,2,2,1,1,2,5] (4) returns : " + LandArray.getPeaksAndValleys(landStretch));

var landStretch = [2,2,3,3,4,4,3,3,2,2,1,1,2,5,3,1,1,2]; // should be 6
console.log("[2,2,3,3,4,4,3,3,2,2,1,1,2,5,3,1,1,2] (6) returns : " + LandArray.getPeaksAndValleys(landStretch));


var landStretch = [2,2,2,3,3,3,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,2,2,2,5,5,5,3,3,3,1,1,2,2,2]; // should be 6
console.log("[2,2,2,3,3,3,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,2,2,2,5,5,5,3,3,3,1,1,2,2,2] (6) returns : " + LandArray.getPeaksAndValleys(landStretch));


var landStretch = [1,2,1,2]; // should be 4
console.log("[1,2,1,2] (4) returns : " + LandArray.getPeaksAndValleys(landStretch));

landStretch = [1,2,1,2,3]; // should be 4
console.log("[1,2,1,2,3] (4) returns : " + LandArray.getPeaksAndValleys(landStretch));


landStretch = [1,2,1,2,3,3]; // should be 3
console.log("[1,2,1,2,3,3] (4) returns : " + LandArray.getPeaksAndValleys(landStretch));

landStretch = [1,1,1,1,1,1]; // should be 3
console.log("[1,1,1,1,1,1] (1) returns : " + LandArray.getPeaksAndValleys(landStretch));

var landStretch = [3,2,1]; // should be 2
console.log("[3,2,1] (2) returns : " + LandArray.getPeaksAndValleys(landStretch));

var landStretch = [3,2,1,1,1]; // should be 2
console.log("[3,2,1,1,1] (2) returns : " + LandArray.getPeaksAndValleys(landStretch));

landStretch = [1,2,1,2,3,4]; // should be 4
console.log("[1,2,1,2,3,4] (4) returns : " + LandArray.getPeaksAndValleys(landStretch));

var landStretch = [1,2,1,2,3,40,3]; // should be 5
console.log("[1,2,1,2,3,40,3] (5) returns : " + LandArray.getPeaksAndValleys(landStretch));

var landStretch = [5,2,1,2,3,40,3]; // should be 5
console.log("[5,2,1,2,3,40,3] (4) returns : " + LandArray.getPeaksAndValleys(landStretch));

var landStretch = [2,2,1,2,3,40,3]; // should be 5
console.log("[2,2,1,2,3,40,3] (4) returns : " + LandArray.getPeaksAndValleys(landStretch));






