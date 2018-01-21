!function () {
    let view = document.querySelector('#container')
    let model = {
        init: function () {
            var obj = {
                0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                3: ['', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ''],
                length: 4
            }
            var hash = {
                q: 'qq.com',
                w: 'weibo.com',
                e: 'ele.me',
                r: '',
                t: 'taobao.com',
                y: 'youtube.com',
                u: '',
                i: 'iqiyi.com',
                o: 'opera.com',
                p: '',
                a: 'alibabagroup.com',
                s: 'www.sina.com.cn/',
                d: 'bbs.deepin.org',
                f: '',
                g: 'www.google.com',
                h: 'hao123.com',
                j: 'www.jd.com',
                k: 'kaola.com',
                l: '',
                z: 'zhihu.com',
                x: 'xiedaimala.com',
                c: 'www.chinahr.com',
                v: 'www.vip.com',
                b: 'baidu.com',
                n: '',
                m: 'developer.mozilla.org'
            }
            return {
                obj: obj,
                hash: hash
            }
        },
        fetch: function () {
            var userDefined = JSON.parse(localStorage.getItem('userKey') || 'null');
            if (userDefined) {
                return userDefined
            }
        },
        save: function (key,image) {
            var userInput = window.prompt('请输入键位[ ' + key + ' ]对应的网站地址'); //正则　复制
            if (userInput != null && userInput != '' && userInput.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) {
                this.hash[key] = userInput;
                image.src = 'http://' + userInput + '/favicon.ico';
                localStorage.setItem('userKey', JSON.stringify(this.hash));
                window.open('http://' + userInput, '_blank');
            } else {
                alert('请输入有效的网站地址');
            }
        }
    }
    let controller = {
        view: null,
        obj: null,
        hash: null,
        init: function () {
            this.view = view
            this.model = model
            this.obj = this.model.init().obj
            if (this.model.fetch()) {
                this.hash = this.model.fetch()
            } else {
                this.hash = this.model.init().hash
            }
            this.generateKeyboard()
            this.bindEvents()
        },
        bindEvents: function () {
            document.onkeypress = (event) => {
                var key = event.key;
                if (this.hash[key] != undefined) {
                    window.open('http://' + this.hash[key], '_blank');
                } else if (key.match(/^[A-Za-z0-9]+$/)) { //　正则　复制
                    if (+key.match(/^[0-9]+$/)) {
                        alert('请输入字母');
                    } else {
                        this.model.save(key);
                    }
                } else {
                    alert('请输入字母');
                }
            }
        },
        generateKeyboard: function () {
            for (var i = 0, len = this.obj.length; i < len; i++) {
                var div = this.createdNewElement({
                    ele: 'div', 
                    parentEle: this.view,
                    className: 'row'
                })
                for (var j = 0, leng = this.obj[i].length; j < leng; j++) {
                    var kbd = this.createdNewElement({
                        ele: 'kbd', 
                        parentEle: div, 
                        className: 'key'
                    });
                    if (this.obj[i][j] === '') {
                        this.shiftKeyboard({
                            parentElement: kbd,  
                            content: this.obj[i][j]
                        });
                    } else if (typeof this.obj[i][j] == 'number') {
                        this.numberKeyboard({
                            parent: kbd, 
                            content: this.obj[i][j]
                        });
                    } else {
                        this.letterKeyboard({
                            parent: kbd, 
                            hash: this.hash, 
                            content: this.obj[i][j]
                        });
                    }
                }
            }
            var shiftContent = this.view.lastChild.lastChild.lastChild;
            shiftContent.textContent = 'Shift';
        },
        createdNewElement: function ({ele, parentEle, className, content}) {
            var element = document.createElement(ele);
            element.className = className;
            parentEle.appendChild(element);
            element.textContent = content;
            return element;
        },
        shiftKeyboard: function ({parentElement, content}) {
            var shiftImg = this.createdNewElement({
                ele: 'img', 
                parentEle: parentElement, 
                className: 'icon', 
                content: content
            });
            shiftImg.src = './image/shift.png';
            shiftImg.parentNode.className = 'key shift';
            var span = this.createdNewElement({
                ele: 'span', 
                parentEle: parentElement, 
                className: 'shiftContent'
            });
        },
        numberKeyboard: function ({parent, content}) {
            var span = this.createdNewElement({
                ele: 'span', 
                parentEle: parent, 
                className: 'number', 
                content: content
            });
        },
        letterKeyboard: function ({parent, hash, content}) {
            var span = this.createdNewElement({
                ele: 'span', 
                parentEle: parent, 
                className: 'letter', 
                content: content
            })
            var btn = this.createdNewElement({
                ele: 'button', 
                parentEle: parent, 
                className: 'btn', 
                content: 'E'
            })
            var img = this.createdNewElement({
                ele: 'img', 
                parentEle: parent, 
                className: 'img'
            })
            this.createKeyboardIcon({
                img: img, 
                source: hash[content]
            })
            img.onerror = function () {
                img.src = './image/smilingFace.png'
            }
            parent.id = content;
            btn.onclick = (event) => {
                var clickElement = event.target
                var key = clickElement.parentNode.id
                var image = clickElement.nextSibling
                this.model.save(key, image)
            }
        },
        createKeyboardIcon: function ({img, source}) {
            if (source === undefined) {
                img.src = './image/smilingFace.png'
            } else {
                img.src = 'http://' + source + '/favicon.ico'
            }
        },
    }
    controller.init(view, model)

}.call()