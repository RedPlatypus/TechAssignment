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

Instantiate your WarZone class with a group of transformers

```javascript 
var battle = new WarZone(transformers);
battle.toggleCommentary();	// gets active reports as fights happen
battle.runBattles();		// runs the battles
battle.reportTeams();		// report teams, and current status
battle.reportFights(); 		// 1 battle
battle.reportWinner();		// report winner (based on most enemy team destroyed)
battle.reportLoser();		// report loser (based on most team mates destroyed)
battle.reportScore();		// report winning team and survivors, losing team and survivors
```