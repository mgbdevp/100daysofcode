const cbox = document.getElementById('content-box');


function getPixelated(){
	cbox.innerHTML = '';
	const txt = document.getElementById('txt').value;
	const type = document.getElementById('type').value;

	const a = document.createElement('a');
	a.href = `https://avatars.dicebear.com/api/${type}/${txt}.svg`;
	a.download = true;

	cbox.appendChild(a);

	const img = document.createElement('img');
	img.src = `https://avatars.dicebear.com/api/${type}/${txt}.svg`;
	a.appendChild(img);
}