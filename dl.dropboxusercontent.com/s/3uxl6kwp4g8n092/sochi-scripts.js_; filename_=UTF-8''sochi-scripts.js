
function pisPod(type, x, y){
    var
    nt = document.createElement('div'),
    ntA = document.createElement('a'),
    ntAImg = '<img class="svg" src="https://static.tumblr.com/vr8wztv/QG5poaddv/spielglocken.svg"/><img class="text" src="https://static.tumblr.com/vr8wztv/fffpoankj/spielglocken1.svg" />',
    target = document.querySelector(x),
    method = y,
	typeOfWork = type;

    // main
    nt.setAttribute('id', 'nt');
    ntA.setAttribute('href', 'https://spielglocken.tumblr.com');
    ntA.innerHTML = ntAImg;
    nt.appendChild(ntA);
	if (typeOfWork == 'theme'){
		nt.setAttribute('class', 'th');
	}else if (typeOfWork == 'page'){
		nt.setAttribute('class', 'pg');
	}
    if(method == 'prepend'){
        target.insertBefore(nt, target.firstChild);
    }else if (method == 'append'){
        target.appendChild(nt);
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
	var
	slot = document.querySelector('.slots'),
	slotCount = parseInt(slot.getAttribute('data-slot-count')),
	slotUsed = parseInt(slot.getAttribute('data-booked-slot')),
	displayCount = slot.getAttribute('data-display-count');
    if(slot){
        for(i = 0; i < slotCount; i++){
            var newSlot = document.createElement('div');
            newSlot.classList.add('slot-counter');
            newSlot.setAttribute('data-order', i + 1);
            slot.appendChild(newSlot);
        }
        var slotCounters = slot.children;
        for (j = 0; j < slotUsed; j++){
            slotCounters[j].classList.add('occupied');
        }
        var textCounter = document.createElement('div');
        if(displayCount == 'display'){
            textCounter.innerHTML = slotCount - slotUsed + '/' + slotCount + ' ' + slot.getAttribute('data-slot-string');
        }else{
            textCounter.innerHTML = slot.getAttribute('data-slot-string');
        }
        textCounter.classList.add('text-counter');
        slot.parentElement.appendChild(textCounter);
    }
    
    var skills = document.querySelectorAll('.skill-item');
    if(skills){
        skills.forEach((i) =>{
            for (j = 0; j < 5; j++){
                var
                newGaugeItem = document.createElement('div');
                newGaugeItem = document.createElement('div');
                newGaugeItem.classList.add('gauge-item');
                newGaugeItem.setAttribute('data-count', j+1);
                i.appendChild(newGaugeItem);            
            }
            var gaugeItems = i.children;
            for (o = 0; o < Math.ceil(i.getAttribute('data-level')); o++){
                gaugeItems[o].classList.add('filled');					
            }
            if(i.getAttribute('data-level') % 1 != 0){
                var c = i.querySelectorAll('.filled');
                c[c.length - 1].classList.add('halved');
            }
            var
            newSkillLabel = document.createElement('div');
            newSkillLabel.classList.add('skill-label');
            newSkillLabel.innerHTML = i.getAttribute('data-label');
            i.insertBefore(newSkillLabel, i.firstElementChild);
        });
    }
	
	pisPod('page','body','append');
});
window.onload = function(){
	document.body.setAttribute('data-loaded', 'finished');
}