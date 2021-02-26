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
    
    var posts = document.getElementsByClassName('entry');
    function audioPlayers(){
        if(post.classList.contains('is-audio') || post.classList.contains('is-text')){
            let
            post = posts[i],
            classic = post.querySelectorAll('.ac-classic'),
            embed = post.querySelectorAll('.ac-embed'),
            fig = post.querySelectorAll('figure'),
            color_1 = post.getAttribute('data-text'),
            color_2 = post.getAttribute('data-color');
            
            for (e = 0; e < embed.length; e++){
                var
                a = 'soundcloud_audio_player',
                b = 'spotify_audio_player',
                c = 'bandcamp_audio_player',
                svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-music"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
                let
                eachEmbed = embed[e],
                iframe = eachEmbed.querySelector('iframe'),
                label = eachEmbed.querySelector('.accd-label');
                
                if(iframe.classList.contains(a)){
                    var 
                    source = iframe.getAttribute('src'),
                    newSource = source.split('&')[0] + '&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=true&amp;origin=tumblr&amp;color=' + color_2.split('#')[1];
                    label.innerHTML = svg + 'soundcloud';
                    iframe.src = newSource;
                    iframe.setAttribute('height', 116);
                    iframe.setAttribute('width', '100%');
                }
                else if(iframe.classList.contains(b)){
                    label.innerHTML = svg + 'spotify';
                }
                else if(iframe.classList.contains(c)){
                    label.innerHTML = svg + 'bandcamp';
                }
            }
            
            for (c = 0; c < classic.length; c++){
                let 
                eachClassic = classic[c];
                if(eachClassic.querySelectorAll('iframe')){
                eachClassic.querySelector('iframe').onload = function (){
                    var
                    ifrcontents = eachClassic.querySelector('iframe').contentDocument || eachClassic.querySelector('iframe').contentWindow.document,
                    iframeAudioPlayer = ifrcontents.querySelector('.audio-player');
                    iframeAudioPlayer.children[0].style.display = 'none';
                    iframeAudioPlayer.children[2].style.display = 'none';
                    iframeAudioPlayer.children[1].style.margin = 'auto';
                    iframeAudioPlayer.style.cssText = 'padding:0!important; height:100%!important; width:100%!important; background:transparent!important; color:' + color_1 + '!important; line-height:60px;';
                    eachClassic.querySelector('iframe').parentNode.classList.add('modified');
                }
                }
            }
            
            for (f = 0; f < fig.length; f++){
                let eachFigure = fig[f],
                iframe = eachFigure.querySelector('iframe.soundcloud_audio_player');
                if(iframe){
                    var 
                    source = iframe.getAttribute('src'),
                    newSource = source.split('&')[0] + '&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=true&amp;origin=tumblr&amp;color=' + color_2.split('#')[1];
                    iframe.src = newSource;
                    if(document.getElementsByTagName('main')[0].classList.contains('is-index')){
                        iframe.setAttribute('height', 20);
                    }else{
                        iframe.setAttribute('height', 116);
                    }
                    iframe.setAttribute('width', '100%');
                }
            }
        }
    }
    function resizeVideos(){
        if(post.classList.contains('is-video') || post.classList.contains('is-text')){
            let
            post = posts[i],
            videoPosts = post.querySelectorAll('.video-container'),
            vidFig = post.querySelectorAll('figure');
            for (vp = 0; vp < videoPosts.length; vp++){
                let
                videoPost = videoPosts[vp],
                vpiframe = videoPost.querySelector('iframe');
                if(videoPost.querySelector('iframe')){
                    vpiframe.setAttribute('width', '100%');
                    vpiframe.parentElement.style.width = '100%';
                }
            }
            for (vf = 0; vf < vidFig.length; vf++){
                let
                eachVidFig = vidFig[vf],
                vfvid = eachVidFig.querySelector('video');
                if(vfvid){
                    vfvid.style.width = '100%';
                }
            }
        }
    }
    function modifyPosts(){
        if(post.classList.contains('is-photo')){
            return;
        }
        else if(!post.classList.contains('is-video')){
            var
            placement = content.previousElementSibling,
            placementContent = content.querySelector('.content-wrapper div:first-child'),
            clone = placementContent.cloneNode(true);
            placement.insertBefore(clone, placement.firstChild);
            placement.firstChild.className = 'thumb-content';
        }
    }
    function displayPosts(){
        let
        post = posts[i],
        content = post.querySelector('.content'),
        thumbs = post.querySelector('.thumbs'),
        trigger = post.getElementsByClassName('view-btn'),
        close = content.querySelector('.close-this');
        for (t = 0; t < trigger.length; t++){
        trigger[t].addEventListener('click', function(){
            post.classList.toggle('open');
            post.style.marginBottom = content.offsetHeight + 'px';
            var
            siblings = Array.prototype.filter.call(post.parentNode.children, function(child){ return child !== post;}),
            removeSiblingClass = siblings.forEach(function(item){
                item.classList.remove('open');
                item.removeAttribute('style');
            });
            window.scrollTo({
                top: post.offsetTop + thumbs.offsetHeight,
                left: 0,
                behavior: 'smooth'
            });   
        });
        }
        close.addEventListener('click', function(e){
            post.classList.remove('open');
            post.removeAttribute('style');
            e.preventDefault();
            window.scrollTo({
                top: post.offsetTop,
                left: 0,
                behavior: 'smooth'
            });
        });
    }
    pisPod('theme','body','append');
    initPhotosets();
	feather.replace();
    var 
    inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
    document.querySelector('.controls').addEventListener('click', function(){
        document.body.classList.toggle('show-tc');
    });
    
    if(document.getElementsByTagName('main')[0].classList.contains('is-index')){
        for (i = 0; i < posts.length; i ++){
        var 
        post = posts[i],
        content = post.querySelector('.content');
        modifyPosts();
        displayPosts();
        audioPlayers();
        resizeVideos();
        }    
    }
    else{
        for (i = 0; i < posts.length; i ++){
        var 
        post = posts[i],
        content = post.querySelector('.content');
        audioPlayers();
        resizeVideos();
        }
    }
});
window.onload = function() {
    document.body.classList.add('loaded');
}