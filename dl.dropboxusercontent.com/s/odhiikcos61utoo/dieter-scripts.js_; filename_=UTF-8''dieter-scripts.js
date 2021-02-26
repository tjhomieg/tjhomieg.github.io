
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
function truncateText(target, maxLength){
    var
    items = document.querySelectorAll(target), target = [];
    items.forEach(function(i){
        
        //collect array
        
        var 
        checkType = i.classList,
        isText = checkType.contains('text-block'),
        isQuote = checkType.contains('quote-container'),
        isNPF = isText && i.querySelector('.tmblr-full:not([data-tumblr-attribution])') || isText && i.querySelector('figure[data-npf]') || isText && i.querySelector('p[class*=npf]'),
        isNPFChat = isNPF && i.querySelector('.npf_chat'),
        isNPFMedia = isNPF && i.querySelector('figure'),
        isNPFPhoto = isNPFMedia && i.querySelector('figure img'),
        isNPFVideo = isNPFMedia && i.querySelector('figure video'),
        other = !isText || !isQuote;
        
        
        if(isNPFPhoto){
            i.classList.add('npf-photo');
        }
        if(isNPFVideo){
            i.classList.add('npf-video');
        }
        
        if(isQuote){
            target.push(i);
        }
        else if(isText && !isNPFMedia && !isNPFChat){
            target.push(i);
        }
        else if(isText && isNPFPhoto || isText && isNPFVideo){
            var n = i.querySelector('figure:last-of-type + p');
            if(n){
                n.classList.add('npf-photo-text');
                target.push(n);
            }
        }
        else if(other && !isNPF){
            target.push(i);
        }
        else{
            i.classList.add('nope-i-lied');
            return;
        }
    });
    
    target.forEach(function(t){
        // select first element
        
        var
        checkType = t.classList, firstPara,
        isText = checkType.contains('text-block'),
        isQuote = checkType.contains('quote-container'),
        isPhoto = checkType.contains('npf-photo-text'),
        other = !isText && !isQuote,
        childCount = t.childElementCount;
        
        if(childCount > 0 && !isPhoto){
            if(isText || other){
                firstPara = t.querySelector('p:first-of-type');
            }
            else if(isQuote){
                firstPara = t.querySelector('.quote-content');
            }
            else if (firstPara.textContent.length <= 0){
                firstPara = t.querySelector('p:not(:empty)');
            }
        }
        else if(isPhoto){
            var newp = document.createElement('p');
            newp.innerHTML = t.innerHTML;
            t.innerHTML = '';
            t.appendChild(newp);
            firstPara = t.firstElementChild;
        }
        else{
            var child = document.createElement('p');
            child.innerHTML = t.textContent;
            t.insertBefore(child, t.firstChild);
            t.childNodes[1].remove();
            firstPara = t.firstElementChild;
        }
        
        // find not-empty element
        while (firstPara.textContent.length <= 0){
            firstPara = t.querySelector('p:not(:empty)');
        }
        
        // truncate
        
        var 
        ellipsis = '...',
        wrap = document.createElement('div'), y = maxLength, content;
        
        // check if element has child
        if(childCount > 0 || typeof firstPara != 'string'){
            content = firstPara.cloneNode(true);
        }
        else{
            var content = document.createElement('p');
            content.innerHTML = firstPara;
        }
        
        wrap.classList.add('index-wrap');
        wrap.appendChild(content);
        wrap.setAttribute('data-length', wrap.textContent.length);
        
        if(isQuote) {
            y = parseInt(document.body.getAttribute('data-text-clip')); var p = wrap.querySelector('div:first-child'); p.className = '';
        }
        else if (isText) y = parseInt(document.body.getAttribute('data-text-clip'));
        
        if(firstPara.textContent.length > y){
            if(other){
                var p = wrap.querySelector('p');
                p.innerHTML = p.textContent.slice(0, y+1) + ellipsis;
            }
            else{
                wrap.innerHTML = wrap.textContent.slice(0, y+1) + ellipsis;
            }
        }
        if(other) t.insertBefore(wrap, t.firstChild);
        else t.appendChild(wrap);
    });
}

function scrollToTop(){
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}
function resizeVideos(selector){
    var
    videos = document.querySelectorAll(selector);
    videos.forEach(function(i){
        var
        parentWidth = i.firstChild.clientWidth,
        bound = i.firstChild,
        vidFrames = i.querySelector('iframe'),
        vwidth = vidFrames.clientWidth,
        vheight = vidFrames.clientHeight,
        vaspect = parentWidth / vwidth;
        vidFrames.width = parentWidth + 'px';
        vidFrames.height = vheight * vaspect + 'px';
        if(vidFrames.parentElement === bound){
            i.classList.add('loaded');
        }else{
            vidFrames.parentElement.style.width = 'auto';
            vidFrames.parentElement.style.height = 'auto';
            i.classList.add('loaded');
        }
    });
    var figures = document.querySelectorAll('.tmblr-full');
    if(figures){
        figures.forEach(function(i){
        var hasVideo = i.querySelector('video');
        if(hasVideo){
                i.style.width = '100%';
                var width = window.innerWidth;
                if(document.body.classList.contains('is-perma')){
                    hasVideo.style.width = '100%';
                }
                else if(width > 1024 && document.body.classList.contains('is-index')){
                    hasVideo.style.width = '50%';
                }
                else{
                    hasVideo.style.width = '100%';
                }
            }
        });
    }
}
function audioPlayers(){
    var
    scplayers = document.querySelectorAll('.soundcloud_audio_player'),
    cplayers = document.querySelectorAll('.tumblr_audio_player');
    if(scplayers){
        scplayers.forEach(function(scp){
            var
            color = document.body.getAttribute('data-accent').split('#')[1],
            scpsource = scp.src;
            nsrc = scpsource.split('&')[0] + '&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=false&amp;origin=tumblr&amp;color=' + color;
            scp.src = nsrc;
            scp.width = '100%';
            scp.height = '110';
            scp.classList.add('loaded');
        });
    }
    if(cplayers){
        cplayers.forEach(function(cp){
            var color = document.body.getAttribute('data-color');
            cp.onload = function(){
            var
            cpframe = cp.contentDocument || cp.contentWindow.document,
            head = cpframe.querySelector('head'),
            audioplayer = cpframe.querySelector('.audio-player');

            audioplayer.parentElement.style.cssText = 'height:100%; display:flex; display:-webkit-flex; align-items:center;';
            audioplayer.children[0].style.cssText = 'background:rgba(0,0,0,.1)!important;';
            audioplayer.children[1].style.cssText = 'width:50%; padding:1em!important; height:100%; box-sizing:border-box; display:flex; display:-webkit-flex; align-items:center; color:' + color + '!important;';
            audioplayer.children[1].firstChild.style.fontSize = '24px';
            audioplayer.style.cssText = 'padding:0!important; height:100%!important; width:100%!important; background:transparent!important;';
            cp.classList.add('loaded');
            
            audioplayer.children[2].style.cssText = 'width:50%; margin:0!important; padding:0 24px 0 0!important; text-align:right;';
            audioplayer.children[2].children[2].style.cssText = 'width:100%; height:1em; line-height:1em; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; color:' + color;
            }
        });
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
	
	var
	body = document.body,
	isIndex = body.classList.contains('is-index'),
	isPerma = body.classList.contains('is-perma');
	
	audioPlayers();
	resizeVideos('.video-container');
	initPhotosets();
	if(isIndex){
	    truncateText('.truncate-this, .quote-container', parseInt(document.body.getAttribute('data-caption-clip')));
	}
    pisPod('theme','body','append');
	
	window.addEventListener('resize', function(){
    	audioPlayers();
    	resizeVideos('.video-container');
	});
	
	document.addEventListener('click', function(e){
	    var
	    menu = document.querySelector('.menu-btn'),
	    menuContent = document.querySelector('.menu-content');
	    if(e.target.matches('aside .menu-btn, aside .menu-btn *')){
	        menu.classList.toggle('active');
	        menuContent.classList.toggle('active');
	        e.preventDefault();
	    }
	    if(e.target.matches('.back-to-top')){
	        e.onclick = scrollToTop();
	    }
	    return false;
	});
});

window.onload = function(){
    document.body.setAttribute('data-loaded', 'loaded');
}