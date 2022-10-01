const cb = document.getElementById('content-box');

fetch('https://fakestoreapi.com/products')
.then(res => res.json())
.then(d => {
	for(let i = 0; i < d.length; i++){
		const card = document.createElement('div');
		card.classList.add('card');
		cb.appendChild(card);
		const img = document.createElement('img');
		const title = document.createElement('h3');
		const price = document.createElement('p');
		const rating = document.createElement('p');
		
		price.classList.add('d-prc');

		img.src = d[i].image;
		title.innerHTML = d[i].title;
		price.innerHTML = '💸' + d[i].price + '$';
		rating.innerHTML = '⭐' + d[i].rating.rate + ` (${d[i].rating.count} reviews)`;

		card.append(img, title, price, rating);
	}
});