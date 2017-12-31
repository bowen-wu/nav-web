window.onload = function () {
    //初始化
    var init= init();
    var obj= init.obj;
    var hash = init.hash;
    //生成键盘
    generateKeyboard(obj,hash)
    //监听键盘事件
    listenerKeyboardEvent(hash)
    
    //工具函数
    function init(){
        var obj = {
            0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            3: ['','z', 'x', 'c', 'v', 'b', 'n', 'm',''],
            length: 4
        }
        var hash = {
            q: 'qq.com',
            w: 'weibo.com',
            e: 'ele.me',
            i: 'iqiyi.com',
            o: 'opera.com',
            r: 'renren.com',
            t: 'tianya.com',
            y: 'youtube.com',
            t: 'taobao.com',
            a: 'alibabagroup.com',
            s: 'www.sina.com.cn/', 
            d: 'bbs.deepin.org',
            g: 'www.google.com',
            j: 'www.jd.com',
            k: 'kaola.com',
            z: 'zhihu.com',
            c: 'www.chinahr.com',
            v: 'www.vip.com',
            b: 'baidu.com',
            m: 'www.mcdonalds.com.cn'
        }
        var userDefined = JSON.parse(localStorage.getItem('userKey') || 'null');
        if (userDefined) {
            hash = userDefined;
        }
        return {
            obj: obj,
            hash:hash
        }
    }
    function generateKeyboard(obj,hash) {
        var container = document.getElementById('container');
        for (var i = 0, len = obj.length; i < len; i++) {
            var div = createdNewElement('div', container, 'row');
            for (var j = 0, leng = obj[i].length; j < leng; j++) {
                var kbd = createdNewElement('kbd', div, 'key');
                if (obj[i][j] === '') {
                    shiftKeyboard(kbd,obj[i][j]);
                } else if(typeof obj[i][j] == 'number'){
                    numberKeyboard(kbd,obj[i][j]);
                }else {
                    letterKeyboard(kbd,hash,obj[i][j]);
                }
            }
        }
        var shiftContent = container.lastChild.lastChild.lastChild;
        shiftContent.textContent = 'Shift';
    }
    

    function createdNewElement(ele, parent, className,content) {
        var ele = document.createElement(ele);
        ele.className= className;
        parent.appendChild(ele);
        ele.textContent = content;
        return ele;
    }
    function shiftKeyboard(parentElement,content){
        var shiftImg = createdNewElement('img', parentElement, 'icon', content);
        shiftImg.src = '../shift.png';
        shiftImg.parentNode.className = 'key shift';
        var span = createdNewElement('span', parentElement, 'shiftContent');
    }
    function numberKeyboard(parent,content){
        var span = createdNewElement('span', parent, 'number', content);
    }
    function letterKeyboard(parent,hash,content) {
        var span = createdNewElement('span', parent, 'letter', content);
        var btn = createdNewElement('button', parent, 'btn', 'E');
        var img = createdNewElement('img', parent, 'img');
        createKeyboardIcon(img, hash[content]);
        img.onerror = function(){
            img.src = '../笑脸1.png';
        };
        parent.id = content;
        btn.onclick = function (event) {
            var clickElement = event.target;
            var key = clickElement.parentNode.id;
            var image = clickElement.nextSibling
            changeUrl(key,image);
        }
    }
    function createKeyboardIcon(img,source) {
        if (source === undefined) {
            img.src = '../笑脸1.png';
        } else{
            img.src = 'http://' + source + '/favicon.ico';
        }
    }

    function listenerKeyboardEvent(hash) {
        document.onkeypress = function (event) {
            // console.log(event.key);
            var key = event.key;
            if (hash[key] != undefined) {
                window.open('http://' + hash[key], '_blank');
            } else if (key.match(/^[A-Za-z0-9]+$/)) { //　正则　复制
                if(+key.match(/^[0-9]+$/)){
                    alert('请输入字母');
                }else{
                    changeUrl(key);
                }
            } else {
                alert('请输入字母');
            }
        }
    }
    function changeUrl(key,image) {
        var userInput = window.prompt('请输入键位[ ' + key + ' ]对应的网站地址'); //正则　复制
        if ( userInput != null && userInput != '' && userInput.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) {
            hash[key] = userInput;
            image.src = 'http://' + userInput + '/favicon.ico';
            localStorage.setItem('userKey', JSON.stringify(hash));
            window.open('http://' + userInput, '_blank');
        } else {
            alert('请输入有效的网站地址');
        }
    }
}