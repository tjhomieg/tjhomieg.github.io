
function appendToggleMenu(x, y){
    var 
    wrapper = document.createElement('section'),
    toggleWrapper = document.createElement('article'),
    toggle = document.createElement('button');
    wrapper.setAttribute(x, y);
    toggleWrapper.setAttribute('id', 'toggle-wrap');
    toggle.setAttribute('class','huh');
    toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="huh feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>';
    wrapper.appendChild(toggle);
    wrapper.appendChild(toggleWrapper);
    document.body.insertBefore(wrapper, document.body.lastChild);
}
function fixnbsp(string){
    if(string.includes(' ')){
        return string.replace(/\s+/g, '');
    }else{
        return string;
    }
}
function newToggleMenu(x,y){    
    var 
    items = y,
    target = document.querySelector(x),
    category = items.name,
    options = Array.from(items.options.split(',')),
    b = ['enable','disable'],
    menu, label;
    menu = document.createElement('div');
    menu.className = 'options ' + category;
    
    label = document.createElement('div');
    label.setAttribute('data-toggle-name', category);
    menu.appendChild(label);
    if(options[0].includes('boolean')){
        options = b;
    }
    options.forEach(function(i){
        var button = document.createElement('button');
        button.setAttribute('name', fixnbsp(i));
        button.setAttribute('class',category);
        menu.appendChild(button);
        menu.querySelector('button:first-of-type').classList.add('current');
    });
    target.querySelector('#toggle-wrap').appendChild(menu);
    document.body.classList.add(options[0] + '-' + items.className);
}
function toggleClick(){
    var 
    o = document.querySelectorAll('.options'),
    p = o[0].parentElement.parentElement,
    classes = Array.from(document.body.className.toString().split(' '));
    o.forEach(function(i){
        var
        type = fixnbsp(i.className.toString().split('options')[1]),
        match = classes.filter(function(a){return a.includes(type)}),
        matchStr = match.toString().substring(match.toString().indexOf(type, match.length));
        document.addEventListener('click', function(x){
            var body = document.body;
            if(x.target.matches('button.' + type)){
                var siblings = Array.from(x.target.parentElement.children);
                siblings.forEach(function(i){i.classList.remove('current')});
                x.target.classList.add('current');
                body.classList.add(x.target.name + '-' + matchStr);
                var
                removedClass = document.body.className.split(' '),
                blin = removedClass.filter(function(z){return z.includes(type)});
                if(x.target.name + '-' + matchStr == blin){
                    return;
                }
                body.classList.remove(blin[0]);
            }
        }, false);
    });
    
    document.addEventListener('click', function(y){
        if(y.target.matches('.huh')){
            p.classList.toggle('open');
        }
        if(y.target.matches('#toggle-wrap') || y.target.matches('body')){
            p.classList.remove('open');
        }
    }, false);
}