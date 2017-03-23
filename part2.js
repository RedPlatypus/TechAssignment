console.log("Part 2");
/*
By: Brendan Robertson, March 17, 2017
For: Aequilibrium
*/


let transformers = [
	{
		name: "Pounce",
		allegiance: "Rogue",
		strength: 5,
		intelligence: 7,
		speed: 4,
		endurance: 5,
		rank: 6,
		courage: 8,
		firepower: 7,
		skill: 10
	},
	{
		name: "Sandstorm",
		allegiance: "D",
		strength: 7,
		intelligence: 9,
		speed: 6,
		endurance: 7,
		rank: 6,
		courage: 10,
		firepower: 6,
		skill: 9
	},
	{
		name: "Optimus Prime",
		allegiance: "A",
		strength: 10,
		intelligence: 10,
		speed: 8,
		endurance: 10,
		rank: 10,
		courage: 10,
		firepower: 8,
		skill: 10
	},
	{
		name: "Soundwave",
		allegiance: "D",
		strength: 8,
		intelligence: 9,
		speed: 2,
		endurance: 6,
		rank: 7,
		courage: 5,
		firepower: 6,
		skill: 10
	},
	{
		name: "Bluestreak",
		allegiance: "A",
		strength: 6,
		intelligence: 6,
		speed: 7,
		endurance: 9,
		rank: 5,
		courage: 2,
		firepower: 9,
		skill: 7
	},
	{
		name: "Hubcap",
		allegiance: "A",
		strength: 3,
		intelligence: 9,
		speed: 4,
		endurance: 3,
		rank: 6,
		courage: 8,
		firepower: 1,
		skill: 9
	},
	{
		name: "testa",
		allegiance: "A",
		strength: 11,
		intelligence: 11,
		speed: 11,
		endurance: 11,
		rank: 11,
		courage: 11,
		firepower: 11,
		skill: 11
	},
	{
		name: "testd",
		allegiance: "D",
		strength: 11,
		intelligence: 11,
		speed: 11,
		endurance: 11,
		rank: 11,
		courage: 11,
		firepower: 11,
		skill: 11
	},
	{
		name: "Dr. Probious",
		allegiance: "D",
		strength: 9,
		intelligence: 4,
		speed: 8,
		endurance: 10,
		rank: 8,
		courage: 10,
		firepower: 8,
		skill: 10
	},{
		name: "Micilan Man",
		allegiance: "A",
		strength: 10,
		intelligence: 10,
		speed: 8,
		endurance: 10,
		rank: 2,
		courage: 10,
		firepower: 8,
		skill: 10
	}
];

let transformers2 = [
	{
		name: "Soundwave",
		allegiance: "D",
		strength: 8,
		intelligence: 9,
		speed: 2,
		endurance: 6,
		rank: 7,
		courage: 5,
		firepower: 6,
		skill: 10
	},
	{
		name: "Bluestreak",
		allegiance: "A",
		strength: 6,
		intelligence: 6,
		speed: 7,
		endurance: 9,
		rank: 5,
		courage: 2,
		firepower: 9,
		skill: 7
	},
	{
		name: "Hubcap",
		allegiance: "A",
		strength: 4,
		intelligence: 4,
		speed: 4,
		endurance: 4,
		rank: 4,
		courage: 4,
		firepower: 4,
		skill: 4
	}
];


Array.prototype.contains = function(object){
	for (i = 0; i < this.length; i++) {
        if (this[i] == object) 
        	return true;
    }
};

class Transformer {
	constructor(options){
		const SPECIAL_BOTS = ["Optimus Prime", "Predaking"];
		let defaults = {
			strength: 		1,
			intelligence: 	1,
			speed: 			1,
			endurance: 		1,
			firepower: 		1,
			rank: 			1,
			courage: 		1,
			skill: 			1,
			allegiance: 	"Rogue opperative",
			isSpecial: 		false,
			destroyed: 		false,
			battlesWon: 	0
		};
		
		Object.assign(this, defaults, options);

		if (this.allegiance != "D" && this.allegiance != "A") {
			console.warn(`${this.name} must be a Decepticon or Autobot to participate in battle senarios. Allegiance: ${this.allegiance}`);
		} 
		if (SPECIAL_BOTS.contains(this.name)) {
			this.isSpecial = true;
		}
	}
	overallRating(){
		return this.strength + this.intelligence + this.speed + this.endurance + this.firepower;
	}
	reportIn(){
		this.destroyed ? 
		console.log("Rank:" + this.rank + ", " + this.name + " destroyed") : 
		console.log("Rank:" + this.rank + ", " + this.name + " feeling fine " + this.battlesWon + " battles won sir.");
	}
	wonBattle(){
		this.battlesWon ++;
	}
	lostBattle(){
		this.destroyed = true;
	}
};

class Team {
	//any side
	constructor(name = "", operatives = []){
		//build your team
		this.name = name;
		this.operatives = operatives;
		this.launch = -1; // which operative is next out.
	}
	addUnit(unit){
		if(Transformer.prototype.isPrototypeOf(unit)){
			this.operatives.push(unit);
		} else{
			throw new Error("This team is only accepting transformers now.");
		}
	}
	sortTroops(key){
		//sort troops by key
		this.operatives.sort(function(a,b){
			var keyA = a[key];
			var keyB = b[key];
		    if(keyA < keyB) return 1;
		    if(keyA > keyB) return -1;
		    return 0;
		});
	}
	reportIn(){
		console.log(this.name);
		for (var i = 0; i < this.operatives.length; i++) {
			this.operatives[i].reportIn();
		}
	}
	getUnitCount(){
		return this.operatives.length;
	}
	getNextUnit(){
		//look for next operative
		this.launch++;
		if (this.launch > this.operatives.length) { 
			return null;
		}
		return this.operatives[this.launch];
	}
	blowUp(){
		for (var i = 0; i < this.operatives.length; i++) {
			this.operatives[i].destroyed = true;
		}
		this.launch = this.operatives.length;
	}
	getDeathCount(){
		for (var i = 0, dead = 0; i < this.operatives.length; i++) {
			if(this.operatives[i].destroyed){ dead++ };
		}
		return dead;
	}
	getSurvivorNames(){
		for (var i = 0, names = ""; i < this.operatives.length; i++) {
			if(!this.operatives[i].destroyed){
				names += this.operatives[i].name + ", ";
			}
		}
		return names;
	}
};

class WarZone {
	constructor(transformers){
		var decepticons = new Team("Decepticons");
		var autobots = new Team("Autobots");
		var bots = []; // tmp holder.
		for (var i = 0; i < transformers.length; i++) {
			var trans = new Transformer(transformers[i]);
			bots.push(trans);
		}
		bots.filter(function(bot){
			if(bot.allegiance == "D") decepticons.addUnit(bot);
			if(bot.allegiance == "A") autobots.addUnit(bot);
		});
		this.teams = [autobots, decepticons];
		this.totalBattles = 0;	
		this.commentary = false;
		this.buildTeams();
	}
	buildTeams(){
		for (var i = 0; i < this.teams.length; i++) {
			this.teams[i].sortTroops("rank");
		}
	}
	toggleCommentary(){
		this.commentary ? this.commentary = false : this.commentary = true;
		this.commentary ? console.log("commentary turned on") : console.log("commentary off");
	}
	runBattles(){
		//could add a reset & restart functionality to allow bots keep on fighting till no one remains...
		//We only support 2 teams currently, there must be 2 teams.
		var carryOn = true;
		while(carryOn){
			var team1Unit = this.teams[0].getNextUnit();
			var team2Unit = this.teams[1].getNextUnit();
			if (team1Unit != null && team2Unit != null) {
				if(this.battle(team1Unit, team2Unit) == null){
					carryOn = false;
				};
			} else{
				carryOn = false;
			}
		}
	}
	battle(unit1, unit2){
		this.totalBattles ++;
		if (this.commentary) console.log(unit1.name + " VS " + unit2.name);

		//check courage & strength
		if(unit1.allegiance == unit2.allegiance){
			throw new Error ("The same faction doesn't fight each other.");
			return;
		}
		//run special case checks
		if(unit1.isSpecial || unit2.isSpecial){
			return specialChecks(unit1, unit2);
		}

		// run courage & strength check
		var bot = courageStrengthCheck(unit1, unit2);
		if(bot) return bot; //returns winner if we have one.
		
		// run skill check
		bot = skillCheck(unit1, unit2);
		if(bot) return bot; //returns winner if we have one.

		//run overall rating check
		if (unit1.overallRating() === unit2.overallRating()) {
			unit1.lostBattle();
			unit2.lostBattle();
			if(this.commentary) console.log(unit1.name + " & " + unit2.name + " overall rating is equal : " + unit1.overallRating() + " : " + unit2.overallRating());
			return "Both Destroyed";
		} else if(unit1.overallRating() > unit2.overallRating()){
			if (this.commentary) console.log(unit1.name + " has the higher overall rating: " + unit1.overallRating() + " compared to : " + unit2.overallRating());
			return setWinLoss(unit1, unit2);
		} else if(unit2.overallRating() > unit1.overallRating()){
			if (this.commentary) console.log(unit2.name + " has the higher overall rating: " + unit2.overallRating() + " compared to : " + unit1.overallRating());
			return setWinLoss(unit2, unit1);
		}

		//additional function... functions.
		function skillCheck(unit1, unit2){
			var skill = unit1.skill - unit2.skill;
			if (Math.abs(skill) >= 3) {
				if (skill > 0) {
					//unit1 advantage
					return setWinLoss(unit1, unit2);
				} else{
					return setWinLoss(unit2, unit1);
				}
			}
			return null;
		}
		function specialChecks(unit1, unit2){
			if(unit1.isSpecial && unit2.isSpecial){
				for (var i = 0; i < this.teams.length; i++) {
					this.teams[i].blowUp();
				}
				if(this.commentary) console.log("The battle was great, but now over. Special rules kills everything.");
				return null;
			} else {
				// the special always wins.
				if (unit1.isSpecial) {
					return setWinLoss(unit1, unit2);
				} else{
					return setWinLoss(unit2, unit1);
				}
			}
		}
		function courageStrengthCheck(unit1, unit2){
			var courage = unit1.courage - unit2.courage;
			var strength = unit1.strength - unit2.strength;
			if (Math.abs(courage) >= 4 && Math.abs(strength) >= 3) {
				if (courage > 0 && strength > 0) {
					return setWinLoss(unit1, unit2);
				} else if(courage < 0 && strength < 0){
					return setWinLoss(unit2, unit1);
				}
			}
			return null;
		}
		function setWinLoss(winner, loser){
			winner.wonBattle();
			loser.lostBattle();
			return winner;
		}
	}
	
	reportTeams(){
		console.log("Teams Reporting In: ")
		for (var i = 0; i < this.teams.length; i++) {
			this.teams[i].reportIn();
		}
	}
	reportFights(){
		console.log(this.totalBattles + " battles");
	}
	reportWinner(){
		//TODO: only works with 2 teams currently.
		var team1Kills = this.teams[1].getDeathCount();
		var team2Kills = this.teams[0].getDeathCount();
		if (team1Kills > team2Kills) {
			console.log("Winning Team (" + this.teams[0].name + "): " + this.teams[0].getSurvivorNames());
		} else if(team2Kills > team1Kills){
			console.log("Winning Team (" + this.teams[1].name + "): " + this.teams[1].getSurvivorNames());
		} else {
			console.log("Tie match");
		}
	}
	reportLoser(){//TODO: only works with 2 teams currently.
		var team1Deaths = this.teams[0].getDeathCount();
		var team2Deaths = this.teams[1].getDeathCount();
		if (team1Deaths > team2Deaths) {
			console.log("Survivors from the losing team ("+ this.teams[0].name +"): " + this.teams[0].getSurvivorNames() )
		} else if(team2Deaths > team1Deaths){
			console.log("Survivors from the losing team ("+ this.teams[1].name +"): " + this.teams[1].getSurvivorNames() )
		} else {
			console.log("Tie match");
		}
	}
	reportScore(){
		this.reportFights();
		this.reportWinner();
		this.reportLoser();
	}
};


console.log("--Battle 1--");
// Call runBattles from wherever on the warzone
var battle = new WarZone(transformers2);
// var battle = new WarZone(transformers); // run with a different group of transformers.
// battle.toggleCommentary();	// gets active reports of battle.
battle.runBattles();				// runs the battles
// battle.reportTeams();		//report teams, and current status
// battle.reportFights(); 		// 1 battle
// battle.reportWinner();		// report winner (based on most enemy team destroyed)
// battle.reportLoser();		// report loser (based on most team mates destroyed)
battle.reportScore();		// report winning team and survivors, losing team and survivors


console.log("--Battle 2--");
var battle2 = new WarZone(transformers);
// battle2.toggleCommentary();	// gets active reports of battle2.
battle2.runBattles();				// runs the battle2s
battle2.reportScore();

