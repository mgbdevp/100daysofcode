
const t_games = document.getElementById('t_games');
const t_pets = document.getElementById('t_pets');
const t_skills = document.getElementById('t_skills');
const t_tier = document.getElementById('t_tier');

//resources/games
fetch('https://api.hypixel.net/resources/games')
.then(res => res.json())
.then(data => {
	const games = Object.keys(data.games);
	const lastupdated = document.getElementsByTagName('small')[0];
	lastupdated.innerHTML = 'updated: ' + new Date(data.lastUpdated).toLocaleDateString('en-US');

	for(let i = 0; i < games.length; i++){
		const ntr = document.createElement('tr');
		const databasename = document.createElement('td')
		const name = document.createElement('td');

		databasename.innerHTML = Object.values(games)[i];
		name.innerHTML = Object.values(games)[i];

		t_games.appendChild(ntr);
		ntr.append(databasename, name);
	}
});

//resources/vanity/pets
fetch('https://api.hypixel.net/resources/vanity/pets')
.then(res => res.json())
.then(data => {
	const lastupdated = document.getElementsByTagName('small')[1];
	lastupdated.innerHTML = 'updated: ' + new Date(data.lastUpdated).toLocaleDateString('en-US');

	for(let i = 0; i < data.types.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td')
		const rarity = document.createElement('td');

		name.innerHTML = data.types[i].name;
		rarity.innerHTML = data.types[i].rarity;

		t_pets.appendChild(ntr);
		ntr.append(name, rarity);
	}
});

//skyblock-skills
fetch('https://api.hypixel.net/resources/skyblock/skills')
.then(res => res.json())
.then(data => {
	const skills = Object.keys(data.skills);
	const lastupdated = document.getElementsByTagName('small')[2];
	lastupdated.innerHTML = 'updated: ' + new Date(data.lastUpdated).toLocaleDateString('en-US');

	for(let i = 0; i < skills.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td')
		const description = document.createElement('td');
		const maxlevel = document.createElement('td');

		name.innerHTML = Object.values(data.skills)[i].name;
		description.innerHTML = Object.values(data.skills)[i].description;
		maxlevel.innerHTML = Object.values(data.skills)[i].maxLevel;

		t_skills.appendChild(ntr);
		ntr.append(name, description, maxlevel);
	}
});

//skyblock-items
fetch('https://api.hypixel.net/resources/skyblock/items')
.then(res => res.json())
.then(data => {
	const lastupdated = document.getElementsByTagName('small')[3];
	lastupdated.innerHTML = 'updated: ' + new Date(data.lastUpdated).toLocaleDateString('en-US');

	for(let i = 0; i < data.items.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td')
		const category = document.createElement('td');
		const material = document.createElement('td');
		const tier = document.createElement('td');

		name.innerHTML = data.items[i].name;
		category.innerHTML = data.items[i].category;
		material.innerHTML = data.items[i].material;
		tier.innerHTML = data.items[i].tier;

		t_items.appendChild(ntr);
		ntr.append(name, category, material, tier);
	}
});