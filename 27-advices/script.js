const cnt = document.getElementById('content');

function adv(){cnt.innerHTML='';fetch('https://api.adviceslip.com/advice').then(r=>r.json()).then(d=>{const advc=document.createElement('h2');advc.innerHTML=d.slip.advice;cnt.appendChild(advc)});}
adv();