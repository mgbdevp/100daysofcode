const b = document.getElementById('wall-box');
const c = document.getElementById('controls');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const page = document.getElementById('page');
const total = document.getElementById('total');

let url = 'https://api.pexels.com/v1/search?query=wallpaper&per_page=40';

function getWalls(){
	b.innerHTML = '';
	fetch(url, {
	    headers: {
	        'Authorization': '563492ad6f917000010000010f985155036944d1939d33c89b93d9d7'
	    }
	})
	.then(res => res.json())
	.then(d => {
		console.log(d);

		if(d.page != 1){
			prev.addEventListener('click', () => {
				url = d.prev_page;
				getWalls();
			});
		}

		if(d.page != 40){
			next.addEventListener('click', () => {
				url = d.next_page;
				getWalls();
			});
		}

		page.innerHTML = 'Page: ' + d.page;
		total.innerHTML = 'Total wallpapers: ' + d.total_results;

		for(let i = 0; i < d.photos.length; i++){
			const card = document.createElement('div');
			const overlay = document.createElement('div');
			card.classList.add('card');
			overlay.classList.add('overlay');
			b.appendChild(card);
			card.appendChild(overlay);

			const photo = document.createElement('img');
			const wh = document.createElement('p');
			const add = document.createElement('a');
			const adm = document.createElement('a');

			photo.src = d.photos[i].src.medium;
			photo.title = d.photos[i].alt;
			wh.innerHTML = d.photos[i].height + 'x' + d.photos[i].width;
			add.innerHTML = "<span class='material-icons-outlined'>desktop_windows</span>";
			adm.innerHTML = "<span class='material-icons-outlined'>smartphone</span>";
			add.href = d.photos[i].src.original;
			adm.href = d.photos[i].src.portrait;
			add.download
			adm.download;

			card.appendChild(photo);
			overlay.append(wh, add, adm);
		}
	});
}

getWalls();