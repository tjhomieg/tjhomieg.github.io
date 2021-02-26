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
function quoteFix(quote){
    var quoteSource = document.querySelectorAll(quote);
    if(quoteSource.length > 0){
        quoteSource.forEach(function(e){
            var
            child = e.querySelector('.tumblr_blog');
            if(child) {
                var newSrc = e.removeChild(child);
                e.innerHTML = e.innerHTML.replace('(via )','');
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
    // tmblr-embed > embed_iframe
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
            scp.height = '20';
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
            audioplayer.children[1].style.cssText = 'margin:auto; padding:0!important; font-size:18px!important; line-height:1em!important;';
            audioplayer.style.cssText = 'padding:0!important; height:100%!important; width:100%!important; background:transparent!important;';
            cp.classList.add('loaded');
            }
        });
    }
}
function posts(){
    var
    sw = document.documentElement.clientWidth,
    main = document.querySelector('main'),
    container = main.querySelector('.holder'),
    posts = document.querySelectorAll('.entry'),
    isSquare = container.classList.contains('thumb-square'),
    isPortrait = container.classList.contains('thumb-portrait'),
    isLandscape = container.classList.contains('thumb-landscape'),
    isIndex = main.classList.contains('is-index');
    if(sw > 1100){
        posts.forEach(function(i){
            var
            width = i.clientWidth;
            content = i.querySelector('.entry-content');
            if(isIndex && isSquare){
                content.firstElementChild.style.height = width + 'px';
            }
            else if(isIndex && isLandscape){
                content.firstElementChild.style.height = 0.67 * width + 'px';
            }
            else if(isIndex && isPortrait){
                content.firstElementChild.style.height = 1.25 * width + 'px';
            }
        });
    }else{
        posts.forEach(function(i){
            var content = i.querySelector('.entry-content');
            content.firstChild.style.height = 'auto';
        });
    }
}
function extLightbox(target){
    var
    posts = document.querySelectorAll(target);
    posts.forEach(function(i){                    
        let npfRows = i.querySelectorAll('.npf_row');
        if(npfRows){
            npfRows.forEach(function(row){
                var childCount = row.childElementCount;
                row.setAttribute('data-child-count', parseInt(childCount));
            });
        }
                
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
    window.addEventListener('resize', function(){
        posts();
        resizeVideos('.video-container');
    });

    var 
	href = window.location.pathname,
	loaderEnabled = document.querySelector('.loader');
    if(loaderEnabled && href === '/'){
        document.querySelector('.loader').classList.add('i');
    }

    quoteFix('.quote-source');
    initPhotosets();
    posts();
    audioPlayers();
    resizeVideos('.video-container');
    extLightbox('.entry');
    feather.replace();
    pisPod('theme','body','append');

    var
    holder = document.querySelector('.holder'),
    loadMore = document.querySelector('#load-more'),
    count = document.querySelector('.total-pages'),
	isInfiniteScrolling = holder.classList.contains('iscroll'),
	isIndexPage = holder.parentElement.classList.contains('is-index'),
    start,
    addr = window.location.pathname;
    if(addr === '/'){
        start = 1;
    }else{
        start = addr.split('/')[2];
    }
	
    if(isInfiniteScrolling && isIndexPage){
        var
        infScroll = new InfiniteScroll(holder, {
            path: '#next-page',
            append: '.entry',
            hideNav: '.normal-pagination',
            button: loadMore
        });
        if(holder.classList.contains('manual-load')){
            infScroll.on('load', onPageLoad);
            function onPageLoad() {
                if (infScroll.loadCount == 1) {
                    infScroll.options.loadOnScroll = false;
                    loadMore.parentElement.style.display = 'block';
                    infScroll.off(onPageLoad);
                }
            }
        }
        infScroll.on('append', function(response, path, items){
            items.forEach(function(item){
                item.classList.add('append');
            });
            var
            postArray = Array.from(items),
            postIds = postArray.map(function(e){return e.getAttribute('id');});
            Tumblr.LikeButton.get_status_by_post_ids(postIds);
            quoteFix('.quote-source');
            initPhotosets();
            posts();
            audioPlayers();
            resizeVideos('.video-container');
            feather.replace();
            count.firstChild.innerHTML = infScroll.loadCount + parseInt(start);
        });
    }
});
window.onload = function(){
    document.body.classList.add('loaded');
}