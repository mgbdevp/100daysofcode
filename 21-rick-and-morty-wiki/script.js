const content = document.querySelector('.content');
const wiki = document.getElementById('wiki');
let url = 'https://rickandmortyapi.com/api/character?page=1';
function getContent(){
	
	fetch(url)
	.then(res => res.json())
	.then(data => {
		wiki.innerHTML = '';
		console.log(data);
		for(let i = 0; i < data.results.length; i++){

			const card = document.createElement('div');
			card.classList.add('card');
			wiki.appendChild(card);

			const image = document.createElement('img');
			image.src = data.results[i].image;
			card.appendChild(image);

			const right = document.createElement('div');
			right.classList.add('right');
			card.appendChild(right);

			const name = document.createElement('h3');
			const status = document.createElement('p');
			const hwmchepisodes = document.createElement('p');
			const lkltext = document.createElement('span');
			const lkl = document.createElement('p');
			const fstext = document.createElement('span');
			const fs = document.createElement('p');

			name.innerHTML = data.results[i].name;
			if(data.results[i].status == 'Alive') status.innerHTML = '<span>🟢 </span>' + data.results[i].status + ' - ' + data.results[i].species;
			else if(data.results[i].status == 'Dead') status.innerHTML = '<span>🔴 </span>' + data.results[i].status + ' - ' + data.results[i].species;
			else status.innerHTML = '<span>🟡 </span>' + data.results[i].status + ' - ' + data.results[i].species;
			hwmchepisodes.innerHTML = 'Appeared in ' +  data.results[i].episode.length + ' episodes';
			lkltext.innerHTML = 'Last known location:';
			lkl.innerHTML = data.results[i].origin.name;
			fstext.innerHTML = 'First seen:';
			fs.innerHTML = data.results[i].location.name;

			right.append(name, status, hwmchepisodes, lkltext, lkl, fstext, fs);
		}

		if(document.getElementsByTagName('button')[0] == undefined){
			const pagination = document.createElement('div');
			pagination.style.textAlign = 'center';
			content.appendChild(pagination);
			const page = document.createElement('p');
			page.id = 'page';
			pagination.appendChild(page);
			const leftbtn = document.createElement('button');
			leftbtn.id = 'leftbtn';
			const rightbtn = document.createElement('button');
			rightbtn.id = 'rightbtn';
			leftbtn.innerHTML = '<<';
			rightbtn.innerHTML = '>>';
			pagination.append(leftbtn, rightbtn);
		}
		document.getElementById('page').innerHTML = 'Page: ' + (parseInt(data.info.next.slice(47)) - 1) + '/' + data.info.pages;
		if(data.info.prev == null) leftbtn.disabled = true;
		if(data.info.next == null) rightbtn.disabled = true;
		document.getElementById('leftbtn').addEventListener('click', () =>{
			url = data.info.prev;
			getContent();

		});
		document.getElementById('rightbtn').addEventListener('click', () =>{
			url = data.info.next;
			getContent();
		});
	});
}

getContent();
