!function(){
    let view = document.getElementById('container')
    let model = {
        obj: {
            0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            3: ['', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ''],
            length: 4
        },
        hash: {
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
        },
        init: function(){
            return {
                keyboard: this.obj,
                website: this.hash
            }
        },
        fetch: function(){
            var userDefined = JSON.parse(localStorage.getItem('userKey'));
            if (userDefined) {
                return userDefined
            }
        },
        save: function(saveDate){
            localStorage.setItem('userKey', JSON.stringify(saveDate))
        }
    }
    let controller = {
        view: null,
        model: null,
        keyboard: null,
        website: null,
        row: null,
        webIcon: null,
        mask: null,
        edit: null,
        letterKeyboard: null,
        inputWebsite: null,
        userInput: null,
        confirm: null,
        reminder: null,
        cancel: null,
        modifyKey: null,
        modifyEle: null,
        init: function(){
            this.view = view
            this.model = model
            this.mask = this.view.querySelector('#mask')
            this.keyboard = this.model.init().keyboard
            if (this.model.fetch()) {
                this.website = this.model.fetch()
            } else {
                this.website = this.model.init().website
            }
            this.createKeyboard()
            this.webIcon = this.view.querySelectorAll('.webIcon')
            this.edit = this.view.querySelectorAll('.edit')
            this.letterKeyboard = this.view.querySelectorAll('.key.letterKey')
            this.inputWebsite = this.view.querySelector('#inputWebsite')
            this.confirm = this.view.querySelector('.confirm')
            this.reminder = this.view.querySelector('.reminder')
            this.cancel = this.view.querySelector('.cancel')
            this.bindEvents()
        },
        bindEvents: function(){
            document.addEventListener('keyup',(event) => {
                if (event.keyCode >= 65 && event.keyCode <= 90) {
                    if (this.website[event.key]) {
                        window.open('http://' + this.website[event.key], '_blank')
                    } else {
                        this.modifyKey = event.key
                        this.modifyEle = this.view.querySelector('#' + event.key)
                        this.view.querySelector('#pressupKeyboard').textContent = '[ ' + event.key + ' ]'
                        this.mask.classList.add('active')
                    }
                }
            })
            this.letterKeyboard.forEach((item) => {
                item.addEventListener('click',(event) => {
                    if(this.website[event.currentTarget.id]){
                        window.open('http://' + this.website[event.currentTarget.id],'_blank')
                    }else{
                        this.modifyKey = event.currentTarget.id
                        this.modifyEle = event.currentTarget
                        this.view.querySelector('#pressupKeyboard').textContent = '[ ' + event.currentTarget.id + ' ]'
                        this.mask.classList.add('active')
                    }
                })
            })
            this.edit.forEach((item) => {
                item.addEventListener('click', (event) => {
                    event.stopPropagation()
                    this.modifyKey = event.currentTarget.parentNode.id
                    this.modifyEle = event.currentTarget.parentNode
                    this.view.querySelector('#pressupKeyboard').textContent = '[ ' + event.currentTarget.parentNode.id + ' ]'
                    this.mask.classList.add('active')
                })
            })

            this.inputWebsite.addEventListener('keyup', (event) => {
                event.stopPropagation()
                this.inputWebsite.classList.remove('animated', 'shake')
                this.reminder.classList.remove('active')
                this.userInput = event.currentTarget.value
                if (event.keyCode === 13) {
                    if (this.userInput && this.userInput.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) {
                        this.inputWebsite.value = ''
                        this.mask.classList.remove('active')
                        let saveDate = JSON.parse(localStorage.getItem('userKey')) || this.website
                        saveDate[this.modifyKey] = this.userInput
                        this.modifyEle.querySelector('img').src = 'http://' + this.userInput + '/favicon.ico'
                        this, model.save(saveDate)
                        window.open('http://' + this.userInput, '_blank')
                        this.userInput = ''
                    } else {
                        this.inputWebsite.classList.add('animated', 'shake')
                            this.inputWebsite.value = ''
                            this.reminder.classList.add('active')
                    }
                }
            })
            this.confirm.addEventListener('click',() => {
                if (this.userInput && this.userInput.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)) {
                    this.inputWebsite.value = ''
                    this.mask.classList.remove('active')
                    let saveDate = JSON.parse(localStorage.getItem('userKey')) || this.website
                    saveDate[this.modifyKey] = this.userInput
                    this.modifyEle.querySelector('img').src = 'http://' + this.userInput + '/favicon.ico'
                    this,model.save(saveDate)
                    window.open('http://' + this.userInput, '_blank')
                    this.userInput = ''
                } else {
                    this.inputWebsite.classList.add('animated','shake')
                    this.inputWebsite.value = ''
                    this.reminder.classList.add('active')
                }
            })
            this.cancel.addEventListener('click',(event) => {
                this.mask.classList.remove('active')
            })

            this.webIcon.forEach((item) => {
                item.addEventListener('error', (event) => {
                    event.currentTarget.src = './image/smilingFace.png'
                })
            })
        },
        createKeyboard: function(){
            for (let i = 0, len = this.keyboard.length; i < len; i++) {
                let row = this.createEle({
                    ele: 'div',
                    klassName: 'row',
                    parent: this.view
                })
                for(let j = 0,len = this.keyboard[i].length; j < len; j++){
                    if(typeof this.keyboard[i][j] === 'number'){
                        this.row = row
                        this.createNumberKeyboard({textContent: this.keyboard[i][j]})
                    }else if(this.keyboard[i][j]){
                        this.row = row
                        this.createLetterKeyboard({contentAndId: this.keyboard[i][j]})
                    }else{
                        this.row = row
                        this.createShiftKeyboard()
                    }
                }
            }
            this.view.lastChild.lastChild.lastChild.textContent = 'Shift'

        },
        createEle: function ({ ele, klassName, parent }) {
            let element = document.createElement(ele)
            element.className= klassName
            parent.appendChild(element)
            return element
        },
        createNumberKeyboard: function ({textContent}) {
            let key = this.createEle({ele: 'kbd',klassName: 'key',parent: this.row})
            let number = this.createEle({ele: 'span',klassName: 'number',parent: key})
            number.textContent = textContent
        },
        createShiftKeyboard: function () {
            let key = this.createEle({ele: 'kbd',klassName: 'key shift',parent: this.row})
            let icon = this.createEle({ele: 'img',klassName: 'icon',parent: key})
            let shiftContent = this.createEle({ele: 'span',klassName: 'shiftContent',parent: key})
            icon.src = './image/shift.png'
        },
        createLetterKeyboard: function ({contentAndId}) {
            let key = this.createEle({ele: 'kbd',klassName: 'key letterKey',parent: this.row})
            key.setAttribute("id", contentAndId)
            let letter = this.createEle({ele: 'span',klassName: 'letter',parent: key})
            let edit = this.createEle({ele: 'button',klassName: 'edit',parent: key})
            let webIcon = this.createEle({ele: 'img',klassName: 'webIcon',parent: key})
            this.createLetterKeyboardWebsiteIcon({
                ele: webIcon,
                website: this.website[contentAndId]
            })
            letter.textContent = contentAndId
            edit.textContent = 'E'
        },
        createLetterKeyboardWebsiteIcon: function({ele,website}){
            if(website === ''){
                ele.src = './image/smilingFace.png'
            }else{
                ele.src = 'http://' + website + '/favicon.ico'
            }
        },
    }
    controller.init(view,model)
}.call()