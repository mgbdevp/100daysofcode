const t = document.getElementById('t');
const inc = document.getElementById('including');

//ailments
fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
.then(res => res.json())
.then(data => {
	inc.innerHTML = 'including [' + data.length + '] universities';
	for(let i = 0; i < data.length; i++){
		const ntr = document.createElement('tr');
		const name = document.createElement('td');
		const country = document.createElement('td');
		const webpage = document.createElement('td');

		name.innerHTML = data[i].name;
		country.innerHTML = data[i].country;
		webpage.innerHTML = `<a href='${data[i].web_pages[0]}'>${data[i].web_pages[0].replace(/https|http/g, '').replace('://', '')}</a>`;

		t.appendChild(ntr);
		ntr.append(name, country, webpage);
	}
});
