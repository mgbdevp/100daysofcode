const content = document.querySelector('.content');
const wiki = document.getElementById('wiki');

let skip = 0;
let url = `https://bobsburgers-api.herokuapp.com/characters/?limit=20&skip=${skip}`;
function getContent(){
	
	fetch(url)
	.then(res => res.json())
	.then(data => {
		wiki.innerHTML = '';
		for(let i = 0; i < data.length; i++){

			const card = document.createElement('div');
			card.classList.add('card');
			wiki.appendChild(card);

			const image = document.createElement('img');
			image.src = data[i].image;
			card.appendChild(image);

			const right = document.createElement('div');
			right.classList.add('right');
			card.appendChild(right);

			const name = document.createElement('h3');
			const age = document.createElement('p');
			const gender = document.createElement('p');
			const haircolor = document.createElement('p');
			const firstepisode = document.createElement('p');
			const occupation = document.createElement('p');
			const voicedby = document.createElement('p');

			name.innerHTML = data[i].name;
			age.innerHTML = data[i].age != undefined ? 'Age: ' + data[i].age : 'Age: ?';
			gender.innerHTML = 'Gender: ' + data[i].gender;
			haircolor.innerHTML =  'Hair color: ' + data[i].hairColor;
			firstepisode.innerHTML = 'First episode: ' + data[i].firstEpisode;
			occupation.innerHTML = 'Occupation: ' + data[i].occupation;
			voicedby.innerHTML = 'Voiced by: ' + data[i].voicedBy;

			right.append(name, age, gender, haircolor, firstepisode, occupation, voicedby);
		}
	});
}

getContent();
