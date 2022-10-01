const c = document.getElementById('content');

function getDB(){
	c.innerHTML = '';
	fetch('https://sports.api.decathlon.com/sports', {method: 'GET'})
	.then(r => r.json())
	.then(d => {
		for(let i = 0; i < d.data.length; i++){
			const card = document.createElement('div');
			card.classList.add('card');
			c.appendChild(card);

			const spImg = document.createElement('img');
			const spName = document.createElement('h3');
			const spDesc = document.createElement('p');

			spImg.src = d.data[i].relationships.images.data[0].url === undefined ? '' : d.data[i].relationships.images.data[0].url;
			spName.innerHTML = d.data[i].attributes.name;
			spDesc.innerHTML = d.data[i].attributes.description;

			card.append(spImg, spName, spDesc);
		}
	});
}

getDB();