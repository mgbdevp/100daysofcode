const t = document.getElementById('t');
const inc = document.getElementById('including');

let pg = 1;
let url = 'https://www.balldontlie.io/api/v1/players?per_page=100';
function nb(){
	t.innerHTML = '<th>Name</th><th>Height</th><th>Weight</th><th>Position</th><th>Team</th>';
	fetch(url)
	.then(res => res.json())
	.then(d => {
		inc.innerHTML = 'including [' + d.meta.total_count + '] players';
		for(let i = 0; i < d.data.length; i++){
			const ntr = document.createElement('tr');
			const name = document.createElement('td');
			const height = document.createElement('td');
			const weight = document.createElement('td');
			const position = document.createElement('td');
			const team = document.createElement('td');

			name.innerHTML = d.data[i].first_name + ' ' + d.data[i].last_name;
			height.innerHTML = d.data[i].height_feet === null || d.data[i].height_inches === null ? '' : d.data[i].height_feet + "'" + d.data[i].height_inches + '"';
			weight.innerHTML = d.data[i].weight_pounds === null ? '' : d.data[i].weight_pounds + ' lbs';
			position.innerHTML = d.data[i].position === null ? '' : d.data[i].position;
			team.innerHTML = d.data[i].team.full_name;

			t.appendChild(ntr);
			ntr.append(name, height, weight, position, team);
		}
	});
}

nb();
