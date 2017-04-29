# Tech Assignment

Answers to Aequilibrium tech test.

Part 1. The Castle Company.
Part 2. Make the transformers fight.


Open the console, you will see results from example data.

## Part 1

Is a static class
`LandArray.getPeaksAndValleys(Array, Boolean);`
Array is land values.
Pass true to boolean to see logging information.
Expected results shown in (brackets) in console

## Part 2

Instantiate your WarZone class with a group of transformers. 
Set allegiance to either *A* or *D*, anything else throws an exception. 
If you don't set an attribue, it defaults to 1.

Example:
```javascript
let my_custom_transformers = [
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
	}
];
```

```javascript 
var battle = new WarZone(my_custom_transformers);
battle.toggleCommentary();	// gets active reports as fights happen
battle.runBattles();		// runs the battles
battle.reportTeams();		// report teams, and current status
battle.reportFights(); 		// 1 battle
battle.reportWinner();		// report winner (based on most enemy team destroyed)
battle.reportLoser();		// report loser (based on most team mates destroyed)
battle.reportScore();		// report winning team and survivors, losing team and survivors
```