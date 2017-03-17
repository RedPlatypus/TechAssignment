console.log("Part 2");
/*
By: Brendan Robertson, March 17, 2017
For: AEQ Technologies
*/
Array.prototype.contains = function(object){
	for (i = 0; i < this.length; i++) {
        if (this[i] == object) 
        	return true;
    }
};

class Transformer {
	constructor(transformer){
		var specialBots = ["Optimus Prime", "Predaking"];
		this.name = transformer.name;
		this.strength = transformer.strength || 1;
		this.intelligence = transformer.intelligence || 1;
		this.speed = transformer.speed || 1;
		this.endurance = transformer.endurance || 1;
		this.firepower = transformer.firepower || 1;
		this.rank = transformer.rank || 1;
		this.courage = transformer.courage || 1;
		this.skill = transformer.skill || 1;
		if (transformer.allegiance != "D" && transformer.allegiance != "A") {
			console.warn(transformer.name + " is a roge opperative. They should choose a side if they wish to participate in battle senarios.");
			this.allegiance = "Rogue opperative";
		} else{
			this.allegiance = transformer.allegiance;
		}
		this.destroyed = transformer.destroyed || false;
		this.battlesWon = transformer.battlesWon || 0; // incase we decide to re-run
		if (specialBots.contains(this.name)) {
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
	constructor(name){
		//build your team
		this.name = name || "Rogue";
		this.operatives = [];
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

// Call runBattles from wherever on a group of transformers.
var battle = new WarZone(transformers);
battle.toggleCommentary();	// gets active reports of battle.
battle.runBattles();				// runs the battles
// battle.reportTeams();		//report teams, and current status
// battle.reportFights(); 		// 1 battle
// battle.reportWinner();		// report winner (based on most enemy team destroyed)
// battle.reportLoser();		// report loser (based on most team mates destroyed)
battle.reportScore();		// report winning team and survivors, losing team and survivors

