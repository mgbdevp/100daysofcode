const rt = document.getElementById('res-text');
const btn = document.getElementsByTagName('button')[0];

btn.addEventListener('click', () => {
	const x = document.getElementById('x').value;
	const y = document.getElementById('y').value;

	rt.innerHTML = Math.round((x/100)*y);
});