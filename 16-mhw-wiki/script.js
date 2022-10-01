const t_ailments = document.getElementById('t_ailments');
const t_armor = document.getElementById('t_armor');
const t_armor_sets = document.getElementById('t_armor_sets');
const t_charms = document.getElementById('t_charms');
const t_decorations = document.getElementById('t_decorations');
const t_items = document.getElementById('t_items');
const t_locations = document.getElementById('t_locations');
const t_monsters = document.getElementById('t_monsters');
const t_motion_values = document.getElementById('t_motion_values');
const t_skills = document.getElementById('t_skills');

//ailments
fetch('https://mhw-db.com/ailments')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const description = document.createElement('td');

		name.innerHTML = data[i].name;
		description.innerHTML = data[i].description;

		t_ailments.appendChild(ntr);
		ntr.append(name, description);
	}
});

//armor
fetch('https://mhw-db.com/armor')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const imagetd = document.createElement('td');
		const image = document.createElement('img');
		const name = document.createElement('td');
		const rank = document.createElement('td');
		const type = document.createElement('td');
		const skill = document.createElement('td');
		const defense = document.createElement('td');

		image.src = data[i].assets.imageMale;
		name.innerHTML = data[i].name;
		rank.innerHTML = data[i].rank + ' ' + data[i].rarity;
		type.innerHTML = data[i].type;
		if(data[i].skills.length != 0) skill.innerHTML = data[i].skills[0].skillName;
		defense.innerHTML = data[i].defense.base + ' / ' + data[i].defense.max + ' / ' + data[i].defense.augmented;

		t_armor.appendChild(ntr);
		ntr.appendChild(imagetd);
		imagetd.appendChild(image);
		ntr.append(name, rank, type, skill, defense);
	}
});

//armor sets
fetch('https://mhw-db.com/armor/sets')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const rank = document.createElement('td');

		name.innerHTML = data[i].name;
		rank.innerHTML = data[i].rank;

		t_armor_sets.appendChild(ntr);
		ntr.append(name, rank);
	}
});

//armor sets
fetch('https://mhw-db.com/charms')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const id = document.createElement('td');
		const name = document.createElement('td');

		id.innerHTML = data[i].id;
		name.innerHTML = data[i].name;

		t_charms.appendChild(ntr);
		ntr.append(id, name);
	}
});

//decorations
fetch('https://mhw-db.com/decorations')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const rarity = document.createElement('td');
		const skill = document.createElement('td');

		name.innerHTML = data[i].name;
		rarity.innerHTML = data[i].rarity;
		skill.innerHTML = data[i].skills[0].skillName;

		t_decorations.appendChild(ntr);
		ntr.append(name, rarity, skill);
	}
});

//items
fetch('https://mhw-db.com/items')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const rarity = document.createElement('td');
		const carrylimit = document.createElement('td');
		const value = document.createElement('td');
		const description = document.createElement('td');

		name.innerHTML = data[i].name;
		rarity.innerHTML = data[i].rarity;
		carrylimit.innerHTML = data[i].carryLimit;
		value.innerHTML = data[i].value;
		description.innerHTML = data[i].description;

		t_items.appendChild(ntr);
		ntr.append(name, rarity, carrylimit, value, description);
	}
});

//locations
fetch('https://mhw-db.com/locations')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const zonecount = document.createElement('td');

		name.innerHTML = data[i].name;
		zonecount.innerHTML = data[i].zoneCount;

		t_locations.appendChild(ntr);
		ntr.append(name, zonecount);
	}
});

//monsters
fetch('https://mhw-db.com/monsters')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const type = document.createElement('td');
		const species = document.createElement('td');
		const location = document.createElement('td');
		const description = document.createElement('td');

		name.innerHTML = data[i].name;
		type.innerHTML = data[i].type;
		species.innerHTML = data[i].species;
		location.innerHTML = data[i].locations[0].name;
		description.innerHTML = data[i].description;

		t_monsters.appendChild(ntr);
		ntr.append(name, type, species, location, description);
	}
});

//motion values
fetch('https://mhw-db.com/motion-values')
.then(res => res.json())
.then(data => {
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const damagetype = document.createElement('td');
		const weapontype = document.createElement('td');
		const hits = document.createElement('td');

		name.innerHTML = data[i].name;
		damagetype.innerHTML = data[i].damageType;
		weapontype.innerHTML = data[i].weaponType;
		hits.innerHTML = data[i].hits[0];

		t_motion_values.appendChild(ntr);
		ntr.append(name, damagetype, weapontype, hits);
	}
});

//skills
fetch('https://mhw-db.com/skills')
.then(res => res.json())
.then(data => {
	console.log(data);
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const description = document.createElement('td');

		name.innerHTML = data[i].name;
		description.innerHTML = data[i].description;

		t_skills.appendChild(ntr);
		ntr.append(name, description);
	}
});