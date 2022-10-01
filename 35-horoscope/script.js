const hrbox = document.getElementById('horoscope-box');


function getHoroscope(){
	hrbox.innerHTML = '';
	const sign = document.getElementById('zodiac-sign').value;
	fetch(`https://aztro.sameerkumar.website?sign=${sign.toLowerCase()}&day=today`, {
		method: 'POST'
	})
	.then(r => r.json())
	.then(d => {
		console.log(d);

		const currentdate = document.createElement('p');
		const sgninf = document.createElement('h3');
		const color = document.createElement('p');
		const compatibility = document.createElement('p');
		const mood = document.createElement('p');
		const luckynumber = document.createElement('p');
		const luckytime = document.createElement('p');
		const description = document.createElement('p');

		description.id = 'desc';

		currentdate.innerHTML = '📅 ' + d.current_date;
		sgninf.innerHTML = '🌌 ' + sign + ` (${d.date_range})`;
		color.innerHTML = '🎨 Color: ' + d.color;
		compatibility.innerHTML = '🔁 Compatibility: ' + d.compatibility;
		mood.innerHTML = '🙂 Mood: ' + d.mood;
		luckynumber.innerHTML = '🔟 Lucky Number: ' + d.lucky_number;
		luckytime.innerHTML = '⌚ Lucky Time: ' + d.lucky_time;
		description.innerHTML = d.description;

		hrbox.append(currentdate, sgninf, color, compatibility, mood, luckynumber, luckytime, description);
	});
}