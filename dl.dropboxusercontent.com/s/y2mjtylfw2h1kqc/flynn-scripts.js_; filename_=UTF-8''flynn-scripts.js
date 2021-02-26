
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
function scrollToTop(){
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}
function stickMe(x, y) {
	var target = document.querySelectorAll(x);
	target.forEach(function(i){
		var 
		main = document.querySelector('main'),
		sticky = i.querySelector(y),
		offset = i.offsetTop + main.offsetTop,
		end = offset + i.clientHeight,
		p = window.pageYOffset,
		withinLimits = window.innerWidth > 1101;
		if(sticky && withinLimits) {		
			if(p < end && p > offset){
				sticky.classList.add('sticky');
			}
			else if (p > end){
				sticky.classList.remove('sticky');
			}
			else{
				sticky.classList.remove('sticky');
			}
		}
	});
}
function stickyClone(){
    var posts = document.querySelectorAll('.entry');
    posts.forEach(function(i){
        var clone = i.querySelector('.entry-info').cloneNode(true);
        i.appendChild(clone);
        i.lastElementChild.classList.add('cloned');
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
                hasVideo.style.width = '100%';
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

            audioplayer.parentElement.style.height = '100%';
            audioplayer.children[0].style.cssText = 'display:none!important;';
            audioplayer.children[2].style.display = 'none';
            audioplayer.children[1].style.cssText = 'padding:1em!important; width:100%; height:100%; box-sizing:border-box; display:flex; display:-webkit-flex; align-items:center; justify-content:center; color:' + color + '!important;';
            audioplayer.children[1].firstChild.style.fontSize = '24px';
            audioplayer.style.cssText = 'padding:0!important; height:100%!important; width:100%!important; background:transparent!important;';
            cp.classList.add('loaded');
            }
        });
    }
}
function headerFix(){
    var
    width = window.innerWidth,
    header = document.querySelector('header'),
    search = document.querySelector('.blog-search'),
    px = 'px';
    
    if(width < 1100){
        header.style.marginTop = search.offsetHeight + px;
    }
    else{
        header.removeAttribute('style');
    }
}
function shareButtons(){
    var 
    shareButtons = document.querySelectorAll('.share-btn');
    
    if(shareButtons){
        shareButtons.forEach(function(i){
            i.addEventListener('click', function(){
                i.classList.toggle('display');
                var
                copied = i.parentElement.querySelector('.copied'),
                shareLink = i.nextElementSibling;
                shareLink.addEventListener('click', function(){
                    this.select();
                    this.setSelectionRange(0, 99999);
                    document.execCommand("copy");
                    copied.classList.add('display');
                    setTimeout(function(){copied.classList.remove('display')},500);
                });
            });
        });   
    }
}
function extLightbox(target){
    var
    posts = document.querySelectorAll(target);
    posts.forEach(function(i){
        let obj = [];
        let photos = i.querySelectorAll('figure.tmblr-full');
        let n = 0;
        if(photos){
            photos.forEach(function(photo){
                n++;
                let photoObject = {
                    width: photo.getAttribute('data-orig-width'),
                    height: photo.getAttribute('data-orig-height'),
                    low_res: photo.querySelector('img').getAttribute('src'),
                    high_res: photo.querySelector('img').getAttribute('src')
                };
                obj.push(photoObject);
                photo.setAttribute('data-index',n);
            });
            photos.forEach(function(lightbox){
                lightbox.addEventListener('click', function(){
                    var i = parseInt(lightbox.getAttribute('data-index'));
                    Tumblr.Lightbox.init(obj, i);
                    document.body.classList.toggle('tumblr_lightbox_active');
                    });
            });
        }
    });
}
window.addEventListener('DOMContentLoaded', (event) => {
    
    window.addEventListener('scroll',function(){
    	if(window.pageYOffset > window.innerHeight){
    		document.querySelector('.top-of-page').classList.add('display');
    	}
    	else{document.querySelector('.top-of-page').classList.remove('display');}
    	stickMe('.entry','.entry-info');
    });
    
    window.addEventListener('resize', function(){
        headerFix();
    	stickMe('.entry','.entry-info');
		resizeVideos('.video-container');
    });
    
    if(document.documentElement.offsetHeight < window.innerHeight || document.documentElement.offsetHeight > window.innerHeight && window.pageYOffset > window.innerHeight){
    	document.querySelector('.top-of-page').classList.add('display');
    }
    
    headerFix();
    initPhotosets();
    extLightbox('.entry');
    resizeVideos('.video-container');
    audioPlayers();
    shareButtons();
    stickyClone();
    pisPod('theme','body','append');
    
    var
	vs = document.querySelectorAll('span.name');
	if(vs){
	    vs.forEach(function(i){
	        i.innerHTML = i.innerHTML.split('https://')[1].split('.tumblr.com')[0];
	    });
	}
    
    document.addEventListener('click', function(e){
    	var
    	tumblrControls = document.querySelector('.tc'),
    	body = document.body;
    	
    	if(e.target.matches('.tc, .tc *')){
    		tumblrControls.classList.toggle('active');
    		body.classList.toggle('show-tc');
    	}
    	if(e.target.matches('.blog-search i')){
    		e.target.parentElement.classList.toggle('active');
    		if(e.target.innerHTML == 'search'){
    			e.target.innerHTML = 'clear';
    		}
    		else{
    			e.target.innerHTML = 'search';
    		}
    	}
    	if(e.target.matches('.top-of-page, .top-of-page *')){
    		e.onclick = scrollToTop();
    	}
    },false);

});
window.onload = function(){
	document.body.setAttribute('data-loaded','loaded');
}