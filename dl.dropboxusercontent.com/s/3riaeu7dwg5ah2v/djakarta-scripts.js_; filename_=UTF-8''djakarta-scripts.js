
function pisPod(type, x, y, z){
    var
    nt = document.createElement('div'),
    ntA = document.createElement('a'),
    ntAImg = '<img class="svg" src="https://static.tumblr.com/vr8wztv/QG5poaddv/spielglocken.svg"/><img class="text" src="https://static.tumblr.com/vr8wztv/fffpoankj/spielglocken1.svg" />',
    target = document.querySelector(x),
    method = y,
    typeOfWork = type;
    
    //secondary
    secText = '<div class="font cap label lt">Made with <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.977px" height="12.564px" viewBox="3 3.718 13.977 12.564" enable-background="new 3 3.718 13.977 12.564" xml:space="preserve"><path fill="#FF3B3B" d="M13.052,3.718c-0.742,0-1.527,0.276-2.211,0.778C10.519,4.731,10.233,5.009,10,5.309 c-0.233-0.3-0.52-0.578-0.841-0.813C8.475,3.994,7.69,3.718,6.949,3.718C4.771,3.718,3,5.489,3,7.667 c0,1.127,0.367,2.285,1.091,3.441c0.562,0.897,1.342,1.797,2.317,2.679c1.525,1.377,3.034,2.261,3.332,2.43 c0.08,0.043,0.17,0.066,0.26,0.066s0.18-0.023,0.264-0.069c0.173-0.098,1.745-0.996,3.328-2.426c0.978-0.882,1.757-1.783,2.315-2.68 C16.633,9.951,17,8.792,17,7.667C17,5.489,15.229,3.718,13.052,3.718z"></path></svg> by spielglocken</div>',
    secCont = document.createElement('div'),
    secLink = document.createElement('a'),
    secTgt = document.querySelector(z);

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
    
    //secondary
    secLink.setAttribute('href', 'https://spielglocken.tumblr.com');
    secLink.innerHTML = secText;
    secCont.className = 'cr list-item';
    secCont.appendChild(secLink);
    if(secTgt){secTgt.appendChild(secCont);}
    else {
        var newSecTgt = document.createElement('div');
        newSecTgt.setAttribute('id', 'cr');
        newSecTgt.appendChild(secCont);
        document.querySelector('.wrapper').appendChild(newSecTgt);
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    
	var    
    body = document.body,
    contents = document.querySelectorAll('.list-content'),
    parent = document.querySelector('.container'),
    nav = document.createElement('article');
    let n = 0;
    
    // mobile   
    
    nav.classList.add('mobile-nav');
    nav.innerHTML = '<div class="menu-btn"></div>';
    parent.insertBefore(nav, parent.firstElementChild);
    
    
    contents.forEach(function(e){
        n++;
        e.setAttribute('data-index', n);
		
		// append close buttons 		
        var closeButton = document.createElement('button');        
        closeButton.setAttribute('class','close-btn');
        closeButton.innerHTML = '&times;';
        e.insertBefore(closeButton, e.querySelector('.list-element-wrap'));
		
		
		// add name to left side		
		var
		characterName = document.createElement('div'),
		cnTarget = e.querySelector('.details'),
		cnLength = cnTarget.children.length;
		characterName.className = 'character-name';
		characterName.innerHTML = e.getAttribute('data-name');
		cnTarget.appendChild(characterName);
		if(cnLength > 0){
			cnTarget.insertBefore(cnTarget.children[cnLength], cnTarget.children[0]);
		}		
		
		// generate list
		var
		list = document.createElement('div'),
		name = document.createElement('div'),
		label = document.createElement('div');
		
		list.classList.add('list-item');
		list.setAttribute('data-index', n);
		
		// character name
		name.className = 'name lt';
		name.innerHTML = e.getAttribute('data-name');
		list.appendChild(name);
		
		// label
		label.className = 'font cap label lt';
		label.innerHTML = e.getAttribute('data-label');
		list.appendChild(label);
		
		parent.querySelector('.right').appendChild(list);
    });
	
	var buttons = document.querySelectorAll('.list-item');
    buttons.forEach(function(i){
        var 
        target = parent.querySelector('.list-content[data-index="' + i.getAttribute('data-index') + '"]');
        
        i.addEventListener('click', function(){
            var 
            siblings = Array.prototype.filter.call(buttons, function(sibling){return sibling != this}),
            targetSiblings = Array.prototype.filter.call(target.parentElement.querySelectorAll('[data-index]'), function(tSibling){return tSibling != target});
            
            siblings.forEach(function(d){
                d.classList.remove('active');
            });
            targetSiblings.forEach(function(e){
                e.classList.remove('active');
            });
            i.classList.toggle('active');
            target.classList.add('active');
            parent.classList.add('viewing');
        });
        i.addEventListener('mouseenter', function(){
            target.classList.add('focus');
        });
        i.addEventListener('mouseleave', function(){
            target.classList.remove('focus');
        });
	});
	
	// moodboards	
    
	var moodboards = document.querySelectorAll('.character-moodboard-image-wrap');
	moodboards.forEach(function(i){
		n = 0;
		var 
		images = i.querySelectorAll('img');
		images.forEach(function(e){
			n++;
			e.setAttribute('data-index',n);
			var
			wrap = document.createElement('div'),
			wrapClassName = e.className;
			wrap.className += wrapClassName + ' moodboard-img';
			wrap.setAttribute('data-index',n);
			i.appendChild(wrap);
		});
		var wrap = i.querySelectorAll('div');
		wrap.forEach(function(a){
			a.appendChild(a.parentElement.querySelector('img[data-index="' + a.getAttribute('data-index') + '"]'));
		});
	});		
	
	
	// color scheme 
    
	var colorSchemes = document.querySelectorAll('.color-scheme-wrap');
	colorSchemes.forEach(function(i){
		var 
		useLabel = i.getAttribute('data-display-hex'),
		children = i.querySelectorAll('div');
		children.forEach(function(e){
            var
			color = e.getAttribute('data-hex'),
			label = e.getAttribute('data-hex-label'),
			block = document.createElement('div'),
			labelContainer = document.createElement('div');
			
			// colors
			block.classList.add('color-block');
			block.style.height = e.offsetWidth + 'px';
			block.style.background = color;
			e.appendChild(block);
			
			// color labels
			if(useLabel === 'display'){
    			labelContainer.innerHTML = color;
    			labelContainer.classList.add('color-label');
    			if(label){
                    labelContainer.innerHTML += '<span class="cap font">' + label + '</span>';
                }
                e.appendChild(labelContainer);
			}
		});
	});    
    
    pisPod('page','body','append','.right');
	
	OverlayScrollbars(document.querySelectorAll('.container > .right, .container > .left, .list-content-wrap'), { });
    
    window.addEventListener('resize', function(){
        var colorSchemes = document.querySelectorAll('.color-scheme-wrap');
		colorSchemes.forEach(function(i){
            var 
            children = i.querySelectorAll('.color-scheme');
            children.forEach(function(e){
                var 
				block = e.querySelector('.color-block'),
				width = e.offsetWidth;
                block.style.height = width + 'px';
            });
		});
    });
    
    document.addEventListener('click', function(e){
        var list = document.querySelector('.right');
        if(e.target.matches('.close-btn')){
            e.target.parentElement.classList.remove('active');
            
			var index = e.target.parentElement.getAttribute('data-index');
            list.querySelector('[data-index="' + index + '"]').classList.remove('active');
			
            if(list.parentElement.classList.contains('viewing')){
                list.parentElement.classList.remove('viewing');
            }
        }
        if(e.target.matches('.menu-btn')){
            list.classList.toggle('show');
            e.target.classList.toggle('active');
        }
    });
    
    document.addEventListener('keydown', function(e){
        if(e.keyCode == 27){
            var activeItem = document.querySelector('.list-item.active');
            if(activeItem){
                var 
                activeIndex = activeItem.getAttribute('data-index'),
                target = document.querySelector('.left .list-content[data-index="' + activeIndex + '"]'),
                activeList = document.querySelector('.right .list-item[data-index="' + activeIndex + '"]');
                
                target.classList.remove('active');
                activeList.classList.remove('active');
            }
        }
    });
});

window.onload = function(){
	document.body.setAttribute('data-loaded','loaded');
}