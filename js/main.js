window.onload = function () {
    //初始化
    var init= init();
    var obj= init.obj;
    var hash = init.hash;
    //生成键盘
    generateKeyboard(obj)
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
            r: 'renren.com',
            t: 'taobao.com',
            a: 'alibabagroup.com',
            j: 'jd.com',
            z: 'zhihu.com',
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
    function generateKeyboard(obj) {
        var container = document.getElementById('container');
        for (var i = 0, len = obj.length; i < len; i++) {
            var div = createdNewElement('div', container, 'row');
            for (var j = 0, leng = obj[i].length; j < leng; j++) {
                var kbd = createdNewElement('kbd', div, 'key');
                if (obj[i][j] === '') {
                    var img = createdNewElement('img', kbd, 'icon', obj[i][j]);
                    img.src = '../shift.png';
                    img.parentNode.className = 'key shift';
                    var span = createdNewElement('span', kbd,'shiftContent');
                } else if(typeof obj[i][j] == 'number'){
                    var span = createdNewElement('span', kbd, 'number', obj[i][j]);
                }else {
                    var span = createdNewElement('span', kbd, 'letter', obj[i][j]);
                    var btn = createdNewElement('button', kbd, 'btn', 'E');
                    kbd.id = obj[i][j];
                    btn.onclick = function (event) {
                        changeUrl(event.target.parentNode.id);
                    }
                }
            }
        }
        var shiftContent = container.lastChild.lastChild.lastChild;
        shiftContent.textContent = 'Shift';

    }
    function listenerKeyboardEvent(hash) {
        document.onkeypress = function (event) {
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

    function createdNewElement(ele, parent, className,content) {
        var ele = document.createElement(ele);
        ele.className= className;
        parent.appendChild(ele);
        ele.textContent = content;
        return ele;
    }

    function changeUrl(key) {
        var userInput = window.prompt('请输入键位[ ' + key + ' ]对应的网站地址'); //正则　复制
        if ( userInput != null && userInput != '' && userInput.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) {
            hash[key] = userInput;
            localStorage.setItem('userKey', JSON.stringify(hash));
            window.open('http://' + userInput, '_blank');
        } else {
            alert('请输入有效的网站地址');
        }
    }
}