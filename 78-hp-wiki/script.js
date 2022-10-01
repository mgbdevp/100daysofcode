const cnt = document.getElementById('cnt');

fetch('http://hp-api.herokuapp.com/api/characters')
.then(res => res.json())
.then(d => {
	for(let i = 0; i < d.length; i++){
		const card = document.createElement('div');
		const bottom = document.createElement('div');
		card.classList.add('card');
		bottom.classList.add('bottom');
		cnt.appendChild(card);

		const img = document.createElement('img');

		const name = document.createElement('h3');
		const ancestry = document.createElement('p');
		const dateOfBirth = document.createElement('p');
		const house = document.createElement('p');
		const alive = document.createElement('p');

		img.src = d[i].image;
		name.innerHTML = d[i].name;
		ancestry.innerHTML = 'Ancestry: ' + d[i].ancestry;
		dateOfBirth.innerHTML = 'Date of birth: ' + d[i].dateOfBirth;
		house.innerHTML = 'House: ' + d[i].house;
		alive.innerHTML = d[i].alive == true ? 'Is alive: Yes' : 'Is alive: No';

		card.appendChild(img);
		card.appendChild(bottom);
		bottom.append(name, ancestry, dateOfBirth, house, alive);
	}
});