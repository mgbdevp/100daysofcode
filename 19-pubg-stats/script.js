const stats = document.getElementById('stats');
const ldb = document.getElementById('ldboard');

const options = {
	method: 'GET',
	headers: {
		'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2NWQ2NmE2MC1hZmFjLTAxM2EtZGQyZi0wZDNmNWNjYWIwOWMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjUxODcwMzYyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6IjF0aGFwaSJ9.BMWRYOYAxVmI6a-nwGwH8gJFxzl3FRBp1z8YemOci7Y',
		'Accept': 'application/vnd.api+json'
	}
}

//getCurrentSeason()
let currentSeasonID;
let dvgrd;
fetch('https://api.pubg.com/shards/steam/seasons', options)
.then(res => res.json())
.then(data => {
	const currentSeason = data.data.filter(n => n.attributes.isCurrentSeason === true);
	currentSeasonID = currentSeason[0].id;
});


let playerID;
function getPlayerStats(){
	stats.style.padding = '2rem';
	stats.style.minHeight = '70vh';
	let username;
	const fv = document.getElementById('username1').value;
	const sv = document.getElementById('username2').value;
	if(fv != '') username = fv;
	else username = sv;
	document.getElementById('c-imgbg').style.display = 'none';
	stats.innerHTML = '';
	
	//get id
	fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${username}`, options)
	.then(res => res.json())
	.then(data => {
		playerID = data.data[0].id;
		console.log(playerID);
		const name = document.createElement('h3');
		name.id = 'h3';
		name.innerHTML = data.data[0].attributes.name;
		stats.appendChild(name);
	});

	//get ranked stats
	setTimeout(() => {
		fetch(`https://api.pubg.com/shards/steam/players/${playerID}/seasons/${currentSeasonID}/ranked`, options)
		.then(res => res.json())
		.then(data => {
			const rs = data.data.attributes.rankedGameModeStats;

			const grid = document.createElement('div');
			grid.classList.add('dv-grid');
			stats.appendChild(grid);
			dvgrd = grid;
			const squad = document.createElement('div');
			const solo = document.createElement('div');
			grid.append(squad, solo);

			const squadtext = document.createElement('h3');
			const solotext = document.createElement('h3');
			squadtext.innerHTML = 'Ranked - Squad';
			solotext.innerHTML = 'Ranked - Solo';

			const squadhr = document.createElement('hr');
			const solohr = document.createElement('hr');

			squad.append(squadtext, squadhr);
			solo.append(solotext, solohr);

			const sqRankPoint = document.createElement('h3');
			const sqTotalGames = document.createElement('p');
			const sqKda = document.createElement('p');
			const sqAvgRank = document.createElement('p');
			const sqHS = document.createElement('p');
			const sqAvgSurvivalTime = document.createElement('p');
			const sqPlayTime = document.createElement('p');
			const sqLongestKill = document.createElement('p');
			if(rs.squad != undefined){
				sqRankPoint.innerHTML = rs.squad.currentRankPoint + ' (' +  rs.squad.currentTier.tier + ' ' + rs.squad.currentTier.subTier + ')';
				sqTotalGames.innerHTML = 'Total Games: ' + rs.squad.roundsPlayed + ' (' + rs.squad.wins + ' wins' + ')';
				sqKda.innerHTML = 'KDA: ' + rs.squad.kda.toFixed(1) + ' (' + rs.squad.kills + '/' + rs.squad.deaths + '/' + rs.squad.assists + ')';
				sqAvgRank.innerHTML = 'Avg. Rank: ' + rs.squad.avgRank;
				sqHS.innerHTML = 'Headshot Kills: ' + rs.squad.headshotKills;
				sqAvgSurvivalTime.innerHTML = 'Avg. Survival Time: ' + rs.squad.avgSurvivalTime;
				sqPlayTime.innerHTML = 'Play Time: ' + rs.squad.playTime;
				sqLongestKill.innerHTML = 'Longest Kill: ' + rs.squad.longestKill;

				squad.append(sqRankPoint, sqTotalGames, sqKda, sqAvgRank, sqHS, sqAvgSurvivalTime, sqPlayTime, sqLongestKill);
			}
			const soRankPoint = document.createElement('h3');
			const soTotalGames = document.createElement('p');
			const soKda = document.createElement('p');
			const soAvgRank = document.createElement('p');
			const soHS = document.createElement('p');
			const soAvgSurvivalTime = document.createElement('p');
			const soPlayTime = document.createElement('p');
			const soLongestKill = document.createElement('p');

			if(rs.solo != undefined){
				soRankPoint.innerHTML = rs.solo.currentRankPoint + ' (' +  rs.solo.currentTier.tier + ' ' + rs.solo.currentTier.subTier + ')';
				soTotalGames.innerHTML = 'Total Games: ' + rs.solo.roundsPlayed + ' (' + rs.solo.wins + ' wins' + ')';
				soKda.innerHTML = 'KDA: ' + rs.solo.kda.toFixed(1) + ' (' + rs.solo.kills + '/' + rs.solo.deaths + '/' + rs.solo.assists + ')';
				soAvgRank.innerHTML = 'Avg. Rank: ' + rs.solo.avgRank.toFixed(1);
				soHS.innerHTML = 'Headshot Kills: ' + rs.solo.headshotKills;
				soAvgSurvivalTime.innerHTML = 'Avg. Survival Time: ' + rs.solo.avgSurvivalTime;
				soPlayTime.innerHTML = 'Play Time: ' + rs.solo.playTime;
				soLongestKill.innerHTML = 'Longest Kill: ' + rs.solo.longestKill;

				solo.append(soRankPoint, soTotalGames, soKda, soAvgRank, soHS, soAvgSurvivalTime, soPlayTime, soLongestKill);
			}
		});

	}, 1400);

	//get season stats
	setTimeout(() => {
		fetch(`https://api.pubg.com/shards/steam/players/${playerID}/seasons/lifetime`, options)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			const gs = data.data.attributes.gameModeStats;

			const solo = document.createElement('div');
			const solofpp = document.createElement('div');
			const duo = document.createElement('div');
			const duofpp = document.createElement('div');
			const squad = document.createElement('div');
			const squadfpp = document.createElement('div');
			dvgrd.append(solo, solofpp, duo, duofpp, squad, squadfpp);

			const solotext = document.createElement('h3');
			const solofpptext = document.createElement('h3');
			const duotext = document.createElement('h3');
			const duofpptext = document.createElement('h3');
			const squadtext = document.createElement('h3');
			const squadfpptext = document.createElement('h3');

			solotext.innerHTML = 'Solo';
			solofpptext.innerHTML = 'Solo FPP';
			duotext.innerHTML = 'Duo';
			duofpptext.innerHTML = 'Duo FPP';
			squadtext.innerHTML = 'Squad';
			squadfpptext.innerHTML = 'Squad FPP';

			const hr1 = document.createElement('hr');
			const hr2 = document.createElement('hr');
			const hr3 = document.createElement('hr');
			const hr4 = document.createElement('hr');
			const hr5 = document.createElement('hr');
			const hr6 = document.createElement('hr');

			solo.append(solotext, hr1);
			solofpp.append(solofpptext, hr2);
			duo.append(duotext, hr3);
			duofpp.append(duofpptext, hr4);
			squad.append(squadtext, hr5);
			squadfpp.append(squadfpptext, hr6);

			//solo
			const soTotalGames = document.createElement('p');
			const soKda = document.createElement('p');
			const soTimeSurvived = document.createElement('p');
			const soLongestTimeSurvived = document.createElement('p');
			const soHS = document.createElement('p');
			const soTop10 = document.createElement('p');
			const soLongestKill = document.createElement('p');
			const soWalkDistance = document.createElement('p');
			const soRideDistance = document.createElement('p');
			const soSwimDistance = document.createElement('p');
			const soBoosts = document.createElement('p');
			const soHeals = document.createElement('p');
			const soMostKills = document.createElement('p');
			const soDamage = document.createElement('p');

			soTotalGames.innerHTML = 'Total Games: ' + gs.solo.roundsPlayed + ' (' + gs.solo.wins + ' wins' + ')';
			soKda.innerHTML = 'KDA: ' + ((gs.solo.kills + gs.solo.assists)/gs.solo.losses).toFixed(1) + ' (' + gs.solo.kills + '/' + gs.solo.losses + '/' + gs.solo.assists + ')';
			soTimeSurvived.innerHTML = 'Time Survived: ' + parseInt(gs.solo.timeSurvived/60).toFixed(0) + 'min';
			soLongestTimeSurvived.innerHTML = 'Longest Time Survived: ' + parseInt(gs.solo.longestTimeSurvived/60).toFixed(0) + 'min';
			soHS.innerHTML = 'Headshot Kills: ' + gs.solo.headshotKills;
			soTop10.innerHTML = 'Top 10\'s: ' + gs.solo.top10s;
			soLongestKill.innerHTML = 'Longest Kill: ' + gs.solo.longestKill.toFixed(0) + 'm';
			soWalkDistance.innerHTML = 'Walk Distance: ' + (gs.solo.walkDistance/1000).toFixed(1) + 'km';
			soRideDistance.innerHTML = 'Ride Distance: ' + (gs.solo.rideDistance/1000).toFixed(1) + 'km';
			soSwimDistance.innerHTML = 'Swim Distance: ' + (gs.solo.swimDistance/1000).toFixed(1) + 'km';
			soBoosts.innerHTML = 'Boosts: ' + gs.solo.boosts;
			soHeals.innerHTML = 'Heals: ' + gs.solo.heals;
			soMostKills.innerHTML = 'Most Kills: ' + gs.solo.roundMostKills;
			soDamage.innerHTML = 'Damage: ' + gs.solo.damageDealt.toFixed(0);

			solo.append(soTotalGames, soKda, soTimeSurvived, soLongestTimeSurvived, soHS, soTop10, soLongestKill, soWalkDistance, soRideDistance, soSwimDistance, soBoosts, soHeals, soMostKills, soDamage);

			//solo-fpp
			const sofpTotalGames = document.createElement('p');
			const sofpKda = document.createElement('p');
			const sofpTimeSurvived = document.createElement('p');
			const sofpLongestTimeSurvived = document.createElement('p');
			const sofpHS = document.createElement('p');
			const sofpTop10 = document.createElement('p');
			const sofpLongestKill = document.createElement('p');
			const sofpWalkDistance = document.createElement('p');
			const sofpRideDistance = document.createElement('p');
			const sofpSwimDistance = document.createElement('p');
			const sofpBoosts = document.createElement('p');
			const sofpHeals = document.createElement('p');
			const sofpMostKills = document.createElement('p');
			const sofpDamage = document.createElement('p');

			sofpTotalGames.innerHTML = 'Total Games: ' + gs['solo-fpp'].roundsPlayed + ' (' + gs['solo-fpp'].wins + ' wins' + ')';
			sofpKda.innerHTML = 'KDA: ' + ((gs['solo-fpp'].kills + gs['solo-fpp'].assists)/gs['solo-fpp'].losses).toFixed(1) + ' (' + gs['solo-fpp'].kills + '/' + gs['solo-fpp'].losses + '/' + gs['solo-fpp'].assists + ')';
			sofpTimeSurvived.innerHTML = 'Time Survived: ' + parseInt(gs['solo-fpp'].timeSurvived/60).toFixed(0) + 'min';
			sofpLongestTimeSurvived.innerHTML = 'Longest Time Survived: ' + parseInt(gs['solo-fpp'].longestTimeSurvived/60).toFixed(0) + 'min';
			sofpHS.innerHTML = 'Headshot Kills: ' + gs['solo-fpp'].headshotKills;
			sofpTop10.innerHTML = 'Top 10\'s: ' + gs['solo-fpp'].top10s;
			sofpLongestKill.innerHTML = 'Longest Kill: ' + gs['solo-fpp'].longestKill.toFixed(0) + 'm';
			sofpWalkDistance.innerHTML = 'Walk Distance: ' + (gs['solo-fpp'].walkDistance/1000).toFixed(1) + 'km';
			sofpRideDistance.innerHTML = 'Ride Distance: ' + (gs['solo-fpp'].rideDistance/1000).toFixed(1) + 'km';
			sofpSwimDistance.innerHTML = 'Swim Distance: ' + (gs['solo-fpp'].swimDistance/1000).toFixed(1) + 'km';
			sofpBoosts.innerHTML = 'Boosts: ' + gs['solo-fpp'].boosts;
			sofpHeals.innerHTML = 'Heals: ' + gs['solo-fpp'].heals;
			sofpMostKills.innerHTML = 'Most Kills: ' + gs['solo-fpp'].roundMostKills;
			sofpDamage.innerHTML = 'Damage: ' + gs['solo-fpp'].damageDealt.toFixed(0);

			solofpp.append(sofpTotalGames, sofpKda, sofpTimeSurvived, sofpLongestTimeSurvived, sofpHS, sofpTop10, sofpLongestKill, sofpWalkDistance, sofpRideDistance, sofpSwimDistance, sofpBoosts, sofpHeals, sofpMostKills, sofpDamage);

			//duo
			const duTotalGames = document.createElement('p');
			const duKda = document.createElement('p');
			const duTimeSurvived = document.createElement('p');
			const duLongestTimeSurvived = document.createElement('p');
			const duHS = document.createElement('p');
			const duTop10 = document.createElement('p');
			const duLongestKill = document.createElement('p');
			const duWalkDistance = document.createElement('p');
			const duRideDistance = document.createElement('p');
			const duSwimDistance = document.createElement('p');
			const duBoosts = document.createElement('p');
			const duHeals = document.createElement('p');
			const duMostKills = document.createElement('p');
			const duDamage = document.createElement('p');

			duTotalGames.innerHTML = 'Total Games: ' + gs.duo.roundsPlayed + ' (' + gs.duo.wins + ' wins' + ')';
			duKda.innerHTML = 'KDA: ' + ((gs['solo-fpp'].kills + gs.duo.assists)/gs.duo.losses).toFixed(1) + ' (' + gs.duo.kills + '/' + gs.duo.losses + '/' + gs.duo.assists + ')';
			duTimeSurvived.innerHTML = 'Time Survived: ' + parseInt(gs.duo.timeSurvived/60).toFixed(0) + 'min';
			duLongestTimeSurvived.innerHTML = 'Longest Time Survived: ' + parseInt(gs.duo.longestTimeSurvived/60).toFixed(0) + 'min';
			duHS.innerHTML = 'Headshot Kills: ' + gs.duo.headshotKills;
			duTop10.innerHTML = 'Top 10\'s: ' + gs.duo.top10s;
			duLongestKill.innerHTML = 'Longest Kill: ' + gs.duo.longestKill.toFixed(0) + 'm';
			duWalkDistance.innerHTML = 'Walk Distance: ' + (gs.duo.walkDistance/1000).toFixed(1) + 'km';
			duRideDistance.innerHTML = 'Ride Distance: ' + (gs.duo.rideDistance/1000).toFixed(1) + 'km';
			duSwimDistance.innerHTML = 'Swim Distance: ' + (gs.duo.swimDistance/1000).toFixed(1) + 'km';
			duBoosts.innerHTML = 'Boosts: ' + gs.duo.boosts;
			duHeals.innerHTML = 'Heals: ' + gs.duo.heals;
			duMostKills.innerHTML = 'Most Kills: ' + gs.duo.roundMostKills;
			duDamage.innerHTML = 'Damage: ' + gs.duo.damageDealt.toFixed(0);

			duo.append(duTotalGames, duKda, duTimeSurvived, duLongestTimeSurvived, duHS, duTop10, duLongestKill, duWalkDistance, duRideDistance, duSwimDistance, duBoosts, duHeals, duMostKills, duDamage);

			//duo fpp
			const dufpTotalGames = document.createElement('p');
			const dufpKda = document.createElement('p');
			const dufpTimeSurvived = document.createElement('p');
			const dufpLongestTimeSurvived = document.createElement('p');
			const dufpHS = document.createElement('p');
			const dufpTop10 = document.createElement('p');
			const dufpLongestKill = document.createElement('p');
			const dufpWalkDistance = document.createElement('p');
			const dufpRideDistance = document.createElement('p');
			const dufpSwimDistance = document.createElement('p');
			const dufpBoosts = document.createElement('p');
			const dufpHeals = document.createElement('p');
			const dufpMostKills = document.createElement('p');
			const dufpDamage = document.createElement('p');

			dufpTotalGames.innerHTML = 'Total Games: ' + gs['duo-fpp'].roundsPlayed + ' (' + gs['duo-fpp'].wins + ' wins' + ')';
			dufpKda.innerHTML = 'KDA: ' + ((gs['solo-fpp'].kills + gs['duo-fpp'].assists)/gs['duo-fpp'].losses).toFixed(1) + ' (' + gs['duo-fpp'].kills + '/' + gs['duo-fpp'].losses + '/' + gs['duo-fpp'].assists + ')';
			dufpTimeSurvived.innerHTML = 'Time Survived: ' + parseInt(gs['duo-fpp'].timeSurvived/60).toFixed(0) + 'min';
			dufpLongestTimeSurvived.innerHTML = 'Longest Time Survived: ' + parseInt(gs['duo-fpp'].longestTimeSurvived/60).toFixed(0) + 'min';
			dufpHS.innerHTML = 'Headshot Kills: ' + gs['duo-fpp'].headshotKills;
			dufpTop10.innerHTML = 'Top 10\'s: ' + gs['duo-fpp'].top10s;
			dufpLongestKill.innerHTML = 'Longest Kill: ' + gs['duo-fpp'].longestKill.toFixed(0) + 'm';
			dufpWalkDistance.innerHTML = 'Walk Distance: ' + (gs['duo-fpp'].walkDistance/1000).toFixed(1) + 'km';
			dufpRideDistance.innerHTML = 'Ride Distance: ' + (gs['duo-fpp'].rideDistance/1000).toFixed(1) + 'km';
			dufpSwimDistance.innerHTML = 'Swim Distance: ' + (gs['duo-fpp'].swimDistance/1000).toFixed(1) + 'km';
			dufpBoosts.innerHTML = 'Boosts: ' + gs['duo-fpp'].boosts;
			dufpHeals.innerHTML = 'Heals: ' + gs['duo-fpp'].heals;
			dufpMostKills.innerHTML = 'Most Kills: ' + gs['duo-fpp'].roundMostKills;
			dufpDamage.innerHTML = 'Damage: ' + gs['duo-fpp'].damageDealt.toFixed(0);

			duofpp.append(dufpTotalGames, dufpKda, dufpTimeSurvived, dufpLongestTimeSurvived, dufpHS, dufpTop10, dufpLongestKill, dufpWalkDistance, dufpRideDistance, dufpSwimDistance, dufpBoosts, dufpHeals, dufpMostKills, dufpDamage);

			//squad
			const sqTotalGames = document.createElement('p');
			const sqKda = document.createElement('p');
			const sqTimeSurvived = document.createElement('p');
			const sqLongestTimeSurvived = document.createElement('p');
			const sqHS = document.createElement('p');
			const sqTop10 = document.createElement('p');
			const sqLongestKill = document.createElement('p');
			const sqWalkDistance = document.createElement('p');
			const sqRideDistance = document.createElement('p');
			const sqSwimDistance = document.createElement('p');
			const sqBoosts = document.createElement('p');
			const sqHeals = document.createElement('p');
			const sqMostKills = document.createElement('p');
			const sqDamage = document.createElement('p');
			sqTotalGames.innerHTML = 'Total Games: ' + gs.squad.roundsPlayed + ' (' + gs.squad.wins + ' wins' + ')';
			sqKda.innerHTML = 'KDA: ' + ((gs['solo-fpp'].kills + gs.duo.assists)/gs.squad.losses).toFixed(1) + ' (' + gs.squad.kills + '/' + gs.squad.losses + '/' + gs.squad.assists + ')';
			sqTimeSurvived.innerHTML = 'Time Survived: ' + parseInt(gs.squad.timeSurvived/60).toFixed(0) + 'min';
			sqLongestTimeSurvived.innerHTML = 'Longest Time Survived: ' + parseInt(gs.squad.longestTimeSurvived/60).toFixed(0) + 'min';
			sqHS.innerHTML = 'Headshot Kills: ' + gs.squad.headshotKills;
			sqTop10.innerHTML = 'Top 10\'s: ' + gs.squad.top10s;
			sqLongestKill.innerHTML = 'Longest Kill: ' + gs.squad.longestKill.toFixed(0) + 'm';
			sqWalkDistance.innerHTML = 'Walk Distance: ' + (gs.squad.walkDistance/1000).toFixed(1) + 'km';
			sqRideDistance.innerHTML = 'Ride Distance: ' + (gs.squad.rideDistance/1000).toFixed(1) + 'km';
			sqSwimDistance.innerHTML = 'Swim Distance: ' + (gs.squad.swimDistance/1000).toFixed(1) + 'km';
			sqBoosts.innerHTML = 'Boosts: ' + gs.squad.boosts;
			sqHeals.innerHTML = 'Heals: ' + gs.squad.heals;
			sqMostKills.innerHTML = 'Most Kills: ' + gs.squad.roundMostKills;
			sqDamage.innerHTML = 'Damage: ' + gs.squad.damageDealt.toFixed(0);

			squad.append(sqTotalGames, sqKda, sqTimeSurvived, sqLongestTimeSurvived, sqHS, sqTop10, sqLongestKill, sqWalkDistance, sqRideDistance, sqSwimDistance, sqBoosts, sqHeals, sqMostKills, sqDamage);

			//squad fpp
			const sqfpTotalGames = document.createElement('p');
			const sqfpKda = document.createElement('p');
			const sqfpTimeSurvived = document.createElement('p');
			const sqfpLongestTimeSurvived = document.createElement('p');
			const sqfpHS = document.createElement('p');
			const sqfpTop10 = document.createElement('p');
			const sqfpLongestKill = document.createElement('p');
			const sqfpWalkDistance = document.createElement('p');
			const sqfpRideDistance = document.createElement('p');
			const sqfpSwimDistance = document.createElement('p');
			const sqfpBoosts = document.createElement('p');
			const sqfpHeals = document.createElement('p');
			const sqfpMostKills = document.createElement('p');
			const sqfpDamage = document.createElement('p');

			sqfpTotalGames.innerHTML = 'Total Games: ' + gs['squad-fpp'].roundsPlayed + ' (' + gs['squad-fpp'].wins + ' wins' + ')';
			sqfpKda.innerHTML = 'KDA: ' + ((gs['solo-fpp'].kills + gs['squad-fpp'].assists)/gs['squad-fpp'].losses).toFixed(1) + ' (' + gs['squad-fpp'].kills + '/' + gs['squad-fpp'].losses + '/' + gs['squad-fpp'].assists + ')';
			sqfpTimeSurvived.innerHTML = 'Time Survived: ' + parseInt(gs['squad-fpp'].timeSurvived/60).toFixed(0) + 'min';
			sqfpLongestTimeSurvived.innerHTML = 'Longest Time Survived: ' + parseInt(gs['squad-fpp'].longestTimeSurvived/60).toFixed(0) + 'min';
			sqfpHS.innerHTML = 'Headshot Kills: ' + gs['squad-fpp'].headshotKills;
			sqfpTop10.innerHTML = 'Top 10\'s: ' + gs['squad-fpp'].top10s;
			sqfpLongestKill.innerHTML = 'Longest Kill: ' + gs['squad-fpp'].longestKill.toFixed(0) + 'm';
			sqfpWalkDistance.innerHTML = 'Walk Distance: ' + (gs['squad-fpp'].walkDistance/1000).toFixed(1) + 'km';
			sqfpRideDistance.innerHTML = 'Ride Distance: ' + (gs['squad-fpp'].rideDistance/1000).toFixed(1) + 'km';
			sqfpSwimDistance.innerHTML = 'Swim Distance: ' + (gs['squad-fpp'].swimDistance/1000).toFixed(1) + 'km';
			sqfpBoosts.innerHTML = 'Boosts: ' + gs['squad-fpp'].boosts;
			sqfpHeals.innerHTML = 'Heals: ' + gs['squad-fpp'].heals;
			sqfpMostKills.innerHTML = 'Most Kills: ' + gs['squad-fpp'].roundMostKills;
			sqfpDamage.innerHTML = 'Damage: ' + gs['squad-fpp'].damageDealt.toFixed(0);

			squadfpp.append(sqfpTotalGames, sqfpKda, sqfpTimeSurvived, sqfpLongestTimeSurvived, sqfpHS, sqfpTop10, sqfpLongestKill, sqfpWalkDistance, sqfpRideDistance, sqfpSwimDistance, sqfpBoosts, sqfpHeals, sqfpMostKills, sqfpDamage);
		});

	}, 1600);
	
}

let reg;

function activeLdb(){
	document.getElementById('c-imgbg').style.display = 'none';
	ldb.style.display = 'block';
	
	const ldbtext = document.createElement('h2');
	ldb.innerHTML = '';
	ldbtext.innerHTML = 'Leaderboards (EU)';
	ldbtext.id = 'ldbtext';
	ldb.appendChild(ldbtext);
	fetch(`https://api.pubg.com/shards/pc-eu/leaderboards/${currentSeasonID}/squad`, options)
	.then(res => res.json())
	.then(data => {

		const includedOld = data.included;
		const included = includedOld.sort(function(a, b){
			return a.attributes.rank - b.attributes.rank;
		});
		console.log(included);

		const table = document.createElement('table');
		table.innerHTML = '<th>Rank</th><th>Name</th><th>Tier</th><th>Rank Points</th><th>Games</th><th>KDA</th><th>Kills</th><th>Avg. Rank</th><th>Avg. Damage</th>';
		ldb.appendChild(table);

		for(let i = 0; i < included.length; i++){
			const ntr = document.createElement('tr');
			const rank = document.createElement('td');
			const name = document.createElement('td');
			const tier = document.createElement('td');
			const rankpoints = document.createElement('td');
			const games = document.createElement('td');
			const kda = document.createElement('td');
			const kills = document.createElement('td');
			const avgrank = document.createElement('td');
			const avgdamage = document.createElement('td');

			rank.innerHTML = included[i].attributes.rank;
			name.innerHTML = included[i].attributes.name;
			tier.innerHTML = included[i].attributes.stats.tier + ' ' + included[i].attributes.stats.subTier;
			rankpoints.innerHTML = included[i].attributes.stats.rankPoints;
			games.innerHTML = included[i].attributes.stats.games;
			kda.innerHTML = included[i].attributes.stats.kda.toFixed(1);
			kills.innerHTML = included[i].attributes.stats.kills;
			avgrank.innerHTML = included[i].attributes.stats.averageRank.toFixed(0);
			avgdamage.innerHTML = included[i].attributes.stats.averageDamage;
			
			table.appendChild(ntr);
			ntr.append(rank, name, tier, rankpoints, games, kda, kills, avgrank, avgdamage);
		}
	});
}