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
	if (window.pageYOffset!=0){
		window.scrollBy(0,-50); 
		var timeOut = setTimeout('scrollToTop()',5); 
	} 
	else {
		clearTimeout(timeOut);
	}
}
function bump(){
    var
    sw = document.documentElement.clientWidth,
    target = document.querySelector('body'),
    marker = document.querySelector('.mobile-nav-btn');
    if(sw < 1001){
        target.style.borderBottom = 'solid transparent ' + marker.offsetHeight + 'px';
    }else{
        target.style.borderBottom = 'none';
    }
}
function audioPlayers(){
    var
    scplayers = document.querySelectorAll('.soundcloud_audio_player'),
    cplayers = document.querySelectorAll('.tumblr_audio_player');
    if(scplayers){
        scplayers.forEach(function(scp){
            var
            scpsource = scp.src;
            nsrc = scpsource.split('&')[0] + '&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=false&amp;origin=tumblr&amp;color=' + '444444';
            scp.src = nsrc;
            scp.width = '100%';
            scp.height = '110';
            scp.classList.add('loaded');
        });
    }
    if(cplayers){
        cplayers.forEach(function(cp){
            cp.onload = function(){
            var
            color = cp.parentElement.parentElement.parentElement.getAttribute('data-color'),
            cpframe = cp.contentDocument || cp.contentWindow.document,
            audioplayer = cpframe.querySelector('.audio-player'),
            head = cpframe.querySelector('head');

            audioplayer.parentElement.style.height = '100%';
            //audioplayer.children[0].style.display = 'none';
            audioplayer.children[2].style.cssText = 'text-align:right; margin:0; color:' + color + '; opacity:.7';
            audioplayer.children[1].style.cssText = 'padding:0!important; font-size:18px!important; line-height:1em!important; color:' + color + '!important;';
            audioplayer.style.cssText = 'padding:1rem 1.5rem!important; height:100%!important; width:100%!important; background:transparent!important;';
            head.innerHTML += '<style type="text/css">.play-pause .icon {display:block; height:18px!important;} .play-pause .icon_play:before{content:url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23' + color.split('#')[1] + '%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-play-circle%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%3E%3C%2Fcircle%3E%3Cpolygon%20points%3D%2210%208%2016%2012%2010%2016%2010%208%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E")!important;} .play-pause .icon_pause:before{content:url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23' + color.split('#')[1] + '%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-pause-circle%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%3E%3C%2Fcircle%3E%3Cline%20x1%3D%2210%22%20y1%3D%2215%22%20x2%3D%2210%22%20y2%3D%229%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2214%22%20y1%3D%2215%22%20x2%3D%2214%22%20y2%3D%229%22%3E%3C%2Fline%3E%3C%2Fsvg%3E")!important;}</style>';
            cp.classList.add('loaded');
            }
        });
    }
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
window.addEventListener('DOMContentLoaded', (event) => {
    window.addEventListener('resize', function(){
        resizeVideos('.video-container');
        bump();
    });
    var
    tControls = document.querySelector('.t-controls'),
    updateEnabled = document.querySelector('#tlist');
    
    //tumblr controls
    tControls.addEventListener('click', function(){
        document.body.classList.toggle('show-tc');
    });
    
    // checkboxes
    var elements = document.getElementsByTagName('input');
    for (var i = 0; i < elements.length; i++) {
        elements[i].checked = false;
    }
    
    //updates
    if(updateEnabled){
        var
        updateContents = updateEnabled.parentElement.querySelectorAll('data');
        updateContents.forEach(function(i){
            var
            updateLine = document.createElement('section');
            if(i.innerHTML.indexOf('<h1>') > 0){
                updateLine.innerHTML = i.innerHTML.split('</h1>')[0] + '</h1><div>' + i.innerHTML.split('</h1>')[1] + '</div>';
            }else{
                updateLine.innerHTML = '<div>' + i.innerHTML + '</div>';
            }
            updateLine.classList.add('tab-content');
            updateEnabled.parentElement.appendChild(updateLine);
            if(updateLine.querySelector('h1')){
                updateLine.querySelector('h1').className = 'font cap';
            }
        });
        updateEnabled.remove();
    }
    
    pisPod('theme','body','append');
    initPhotosets();
    audioPlayers();
    resizeVideos('.video-container');
    bump();
    
    var
    docBody = document.querySelector('body'),
    isIndexPage = docBody.classList.contains('is-index'),
    isInfiniteScrolling = docBody.classList.contains('iscroll');
    
    if(isInfiniteScrolling && isIndexPage){
        var
        holder = document.querySelector('.holder'),
        loadMore = document.getElementById('load-more'),
        nextPage = document.getElementById('next-page'),
        status = document.querySelector('.infscroll-loading');
        
        loadMore.addEventListener('click', function(){
            loadMore.style.opacity = 0;
            setTimeout(function(){
                loadMore.style.opacity = 1;
            },1000);
        });
        if(nextPage == null){
            status.classList.add('error');
        }
        infScroll = new InfiniteScroll(holder, {
            path: '#next-page',
            append: '.entry',
            hideNav: '.normal-pagination',
            button: loadMore,
            scrollThreshold: false,
            status: status
        });
        infScroll.on('append', function(response, path, items){
            items.forEach(function(item){
                item.classList.add('append');
            });
            var
            postArray = Array.from(items),
            postIds = postArray.map(function(e){return e.getAttribute('id');});
            Tumblr.LikeButton.get_status_by_post_ids(postIds);
            initPhotosets();
            audioPlayers();
            resizeVideos('.video-container');
        });
    }
});

window.onload = function() {
    document.body.classList.add('loaded');
    AOS.init({
        offset: 200,
        easing: 'ease-out-quart',
        duration: 700
    });
}