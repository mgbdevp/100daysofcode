const cnt = document.getElementById('content');
const qotd = document.getElementById('qotd');

function getd(){
	fetch('https://favqs.com/api/qotd')
	.then(r => r.json())
	.then(d => {
		qtm.innerHTML = d.qotd_date.substring(0, 10);
		const qotdBody = document.createElement('h2');
		const info = document.createElement('p');
		qotdBody.innerHTML = d.quote.body;
		info.innerHTML = `by ${d.quote.author} | ⭐${d.quote.favorites_count} 👍${d.quote.upvotes_count} 👎${d.quote.downvotes_count}`;
		cnt.append(qotdBody, info);
	});
}

getd();