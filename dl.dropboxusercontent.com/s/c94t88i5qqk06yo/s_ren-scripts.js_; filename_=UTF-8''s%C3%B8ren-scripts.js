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
function resizeVideos(selector){
    var
    videos = document.querySelectorAll(selector);
    videos.forEach(function(i){
        var
        parentWidth = i.clientWidth,
        bound = i.firstChild,
        vidFrames = i.querySelector('iframe'),
        vwidth = parseInt(vidFrames.getAttribute('data-width')),
        vheight = parseInt(vidFrames.getAttribute('data-height')),
        vaspect = parentWidth / vwidth;
        vidFrames.width = parentWidth + 'px';
        vidFrames.height = vheight * vaspect + 'px';
        if(vidFrames.parentElement === bound){
            i.classList.add('loaded');
        }
        else{
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
    scplayers = document.querySelectorAll('iframe[src*=soundcloud]'),
    cplayers = document.querySelectorAll('.tumblr_audio_player');
    if(scplayers){
        scplayers.forEach(function(scp){
            var
            scpsource = scp.src,
            left_half = document.body.getAttribute('data-accent-left'),
            right_half = document.body.getAttribute('data-accent-right'),
            parent = scp.parentElement.parentElement,
            color;
            if(parent.classList.contains('o')){
                color = left_half.split('#')[1];
            }else{
                color = right_half.split('#')[1];
            }
            nsrc = scpsource.split('&')[0] + '&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=false&amp;origin=tumblr&amp;color=' + color;
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
            cpframe = cp.contentDocument || cp.contentWindow.document,
            audioplayer = cpframe.querySelector('.audio-player');

            audioplayer.parentElement.style.height = '100%';
            audioplayer.children[0].style.display = 'none';
            audioplayer.children[2].style.display = 'none';
            audioplayer.children[1].style.cssText = 'padding:1em!important; width:100%; height:100%; box-sizing:border-box; display:flex; display:-webkit-flex; align-items:center; justify-content:center;';
            audioplayer.style.cssText = 'padding:0!important; height:100%!important; width:100%!important; background:transparent!important;';
            cp.classList.add('loaded');
            }
        });
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    window.addEventListener('resize', function(){
        resizeVideos('.video-container');
    });
    var elements = document.getElementsByTagName('input');
    for (var i = 0; i < elements.length; i++) {
        elements[i].checked = false;
    }
    var tc = document.getElementById('tc');
    if(tc){
        tc.addEventListener('click',function(){
            document.body.classList.toggle('tc-view');
        });
    }
    
    initPhotosets();
    audioPlayers();
    resizeVideos('.video-container');
    pisPod('theme','body','append');
});
window.onload = function(){
    document.body.setAttribute('data-loaded','loaded');
}