const cs = document.getElementById('cs');
const tc = document.getElementById('tc');

function calc(){
	const cost = document.getElementById('cost').value;
	const w = document.getElementById('w').value;
	const h = document.getElementById('h').value;
	cs.innerHTML = 'The covered surface: ' + w * h;
	tc.innerHTML = 'The total cost: ' + (w * h) * cost; 
}