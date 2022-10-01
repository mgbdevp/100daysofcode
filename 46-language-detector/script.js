const cb = document.getElementById('c-box');

function detectLanguage(){
	cb.innerHTML = '';
	const text = document.getElementById('text').value;
	fetch('https://ws.detectlanguage.com/0.2/detect?q=' + text, {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer 22f95a9312781c1185c16d0cde153d0f'
		}
	})
	.then(res => res.json())
	.then(data => {
		console.log(data);
		const detectedLang = document.createElement('h2');
		const confidence = document.createElement('p');
		detectedLang.innerHTML = data.data.detections[0].language.toUpperCase();
		confidence.innerHTML = 'Confidence: ' + data.data.detections[0].confidence;
		confidence.style.color = data.data.detections[0].confidence > 3 ? 'lightgreen' : 'orange';
		cb.append(detectedLang, confidence);
	})
}