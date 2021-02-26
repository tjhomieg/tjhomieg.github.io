function pisPod(type, x, y, z){
    var
    nt = document.createElement('div'),
    ntA = document.createElement('a'),
    ntAImg = '<img class="svg" src=""/><img class="text" src="" />',
    target = document.querySelector(x),
    method = y,
	typeOfWork = type,
        
    //secondary
	secText = 'made with luv by ',
    secText_2 = 'urs truly'
    secCont = document.createElement('span'),
    secLink = document.createElement('a'),
    secTgt = document.querySelector(z);

    // main
    nt.setAttribute('id', 'nt');
    ntA.setAttribute('href', '');
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
    secLink.setAttribute('href', '');
    secLink.innerHTML = secText_2;
    secCont.className = 'cr';
    secCont.innerHTML = secText;
    secCont.appendChild(secLink);
    if(secTgt){secTgt.appendChild(secCont);}
    else {
        var newSecTgt = document.createElement('div');
        newSecTgt.setAttribute('id', 'cr');
        newSecTgt.appendChild(secCont);
        document.querySelector('.wrapper').appendChild(newSecTgt);
    }
}
function adjustBlogrolls(){
    var 
    w = window.innerWidth,
    links = document.getElementsByClassName('more'),
    link = links[0],
    count = document.querySelector('.br-list').children;
    if (links.length > 0){
        if(w < 480 && count.length < 5){
            link.style.display = 'none'
        }else if(w > 480 && count.length < 7){
            link.style.display = 'none'
        }
        else if(w > 768 && count.length < 11){
            link.style.display = 'none'        
        }
        else{
            link.style.display = 'inline-block'
        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    var
    isTruncated = document.querySelector('.is-blogroll'),
    isCollapsible = document.querySelector('.is-collapsible');
	
    if(isTruncated){
        var
        blogroll = document.querySelector('.br-list'),
        blogrollChild = blogroll.children,
        parent = blogroll.parentElement,
        clone = parent.cloneNode(true),
        pop = document.querySelector('.pop');
        
        window.addEventListener('resize', adjustBlogrolls);
        if(blogrollChild.length > 4){
            var
            moreLink = document.createElement('a');
            parent.appendChild(moreLink);
			
            parent.lastElementChild.classList.add('more', 'cap');
            parent.lastElementChild.setAttribute('href','javascript:;');
            parent.querySelector('.more.cap').innerHTML = pop.getAttribute('data-blogroll');
            pop.querySelector('.pop-content').appendChild(clone);
            pop.querySelector('.section-title').innerHTML += ' (' + blogrollChild.length + ')';
			blogroll.style.maxHeight = blogrollChild[0].offsetHeight * 2 + 'px';
        }
        adjustBlogrolls();
        if(document.querySelector('.more')){
            document.querySelector('.more').addEventListener('click',function(){
                pop.classList.add('show');
                pop.addEventListener('click',function(e){
                    if(e.target == this){
                        this.classList.remove('show')
                    }else return;
                });
            });
        }
    }
    if(isCollapsible){
        var questions = document.querySelectorAll('.questions');
        questions.forEach(function(q){
            var
            question = q.querySelector('.q'),
            answer = q.querySelector('.a');
            question.addEventListener('click', function(){
                if(!q.classList.contains('active')){
                    q.classList.add('active');
                    answer.style.height = 'auto';
                    var height = answer.clientHeight + 'px';
                    answer.style.height = '0px';
                    setTimeout(function(){
                        answer.style.height = height;
                    },0);
                }else{
                    answer.style.height = '0px';
                    answer.addEventListener('transitionend', function(){
                        q.classList.remove('active');
                    },{once:true});
                }
            });
        });
    }
    pisPod('page', 'body','append','footer');
    tippy('[data-tippy-content]',{
        offset: "30, 20",
        followCursor: 'true',
        animation: 'shift-with-inertia',
        placement: 'top-end',
        duration: 300,
        delay: 150
    });
});
window.onload = function(){
    document.body.classList.add('loaded');
}