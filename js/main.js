window.onload = function () {
    var obj = {
        0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        3: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
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
    var container = document.getElementById('container');
    for (var i = 0, len = obj.length; i < len; i++) {
        var div = createdNewElement('div', container);
        for (var j = 0, leng = obj[i].length; j < leng; j++) {
            var kbd = createdNewElement('kbd', div, obj[i][j]);
            kbd.id = obj[i][j];
            var btn = createdNewElement('button', kbd, 'Edit');
            btn.onclick = function (event) {
                changeUrl(event.target.parentNode.id);
            }
        }
    }
    document.onkeypress = function (event) {
        var key = event.key;
        if (hash[key] != undefined) {
            window.open('http://' + hash[key], '_blank');
        } else if (key.replace(/^[A-Za-z0-9]+$/)) { //　正则　复制
            changeUrl(key);
        } else {
            alert('请输入数字或者字母');
        }
    }

    function createdNewElement(ele, parent, content) {
        var ele = document.createElement(ele);
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