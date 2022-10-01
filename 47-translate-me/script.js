const txarea = document.getElementById('translated');

function submit(){
	const src = document.getElementById('src').value;
	const trg = document.getElementById('trg').value;
	const toTranslate = document.getElementById('toTranslate').value;
	fetch(`https://libretranslate.de/translate?q=${toTranslate}&source=${src}&target=${trg}&format=text`, {
		method: 'POST'
	})
	.then(res => res.json())
	.then(d => {
		txarea.value = d.translatedText;
	});
}