// night mode

function nightMode(selector, start, end, classname) {
    var currentTime = new Date().getHours();
    if (document.querySelector(selector).classList.contains('enable-nm')){
        if (start <= currentTime || currentTime < end) {
            document.querySelector(selector).classList.add(classname);
        }
    }else if (!document.querySelector(selector).classList.contains('enable-nm')){
        return;
    }
}

// header

function onMobile() {
    var header = document.getElementsByTagName('header')[0],
        height = header.offsetHeight + window.innerWidth / 14,
        holder = document.querySelector('.holder'),
        aside = document.getElementsByTagName('aside')[0];
    
    if (header.offsetWidth > 0 && header.offsetHeight > 0){
        holder.style.marginTop = height + "px";
    }else{
        holder.style.marginTop = 0;
    }
    if (window.innerWidth > 768){
        aside.classList.remove('slide-in');
    }
}

// audio players

function audioPlayers(x) {
    $('iframe.tumblr_audio_player').load(function() {
        $(this).parents('.acc-player').addClass('a');
        $(this).css("width","100%");
        $('iframe.tumblr_audio_player').contents().find("head").append($("<style type='text/css'>.audio-player {padding:0!important; width:100%; background:transparent!important; color:" + x + "!important;} .progress, .audio-info {display:none!important;} .play-pause {text-align:center; margin:auto;} </style>"));
    });
    $('.entry').find('iframe.soundcloud_audio_player').each(function(){
        var srcRep = $(this).attr('src').replace('&visual=true','&visual=false');
        $(this).attr({src: srcRep + '&color=' + x.split('#')});
    });
}

$(document).ready(function() {
	initPhotosets();
        
    var asideT = document.querySelector('.m-toggle'),
        hours = document.getElementById('hours').innerHTML,
        splitHours = hours.split('-');
        
    $(window).resize(function(){onMobile();}).resize();
    onMobile();
    nightMode('#target', splitHours[0], splitHours[1], "dark");
        
    asideT.addEventListener('click', function(e){
        document.getElementsByTagName('aside')[0].classList.toggle('slide-in');
        e.preventDefault();
    });
       

	if(document.querySelector('.pw-toggle')){
		document.querySelector('.pw-toggle').addEventListener('click', function(){
			document.querySelector('.page-wrap').classList.toggle('slide-up');
			this.classList.toggle('open');
			if(this.classList.contains('open')){
				this.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
			}else{
				this.innerHTML = '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>';
			}
		});
	}
    
    if(document.getElementById('target').classList.contains('dark')){
        audioPlayers(splitHours[3]);
    }else if (!document.getElementById('target').classList.contains('dark')){
        audioPlayers(splitHours[2]);
    }
                
    $('.holder').find('.video-container iframe, video').each(function(){
        $(this).css("width","100%").addClass('a');
        $(this).parent().addClass('a');
        $(this).parent().css("width", "100%");
    });
});
$(window).load(function(){
    $('body').addClass('a');
});