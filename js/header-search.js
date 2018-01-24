!function(){
    let view = document.querySelector('header')
    let model = {
        init: function(){},
        fetch: function(){},
        save: function(){}
    }
    let controller = {
        view: null,
        model: null,
        picInput: null,
        userPic: null,
        newUserPic: null,
        search: null,
        google: null,
        baidu: null,
        searchContent: null,
        init: function(){
            this.view = view
            this.model = model
            this.picInput = view.querySelector('#picInput')
            this.search = view.querySelector('#search')
            this.google = view.querySelector('#google')
            this.baidu = view.querySelector('#baidu')
            this.newUserPic = view.querySelector('#logo > img')
            this.bindEvents()
        },
        bindEvents: function(){
            this.search.addEventListener('keyup',(event) => {
                event.stopPropagation()
                if(event.keyCode === 13){
                    this.gotoGoogle()
                }
            })
            this.google.addEventListener('click',() => {
               this.gotoGoogle()
            })
            this.baidu.addEventListener('click',() => {
                this.gotoBaidu()
            })
            this.picInput.addEventListener('change',(event) => {
                this.userPic = event.currentTarget.files[0]
                this.sendRequest()
            })
        },
        gotoGoogle: function(){
            this.searchContent = this.search.value
            window.open('http://www.google.com/search?q=' + this.searchContent, '_blank')
            this.search.value = ''
        },
        gotoBaidu: function(){
            this.searchContent = this.search.value
            window.open('http://www.baidu.com/s?wd=' + this.searchContent, '_blank')
            this.search.value = ''
        },
        sendRequest: function () {
            let formData = new FormData()
            formData.append('xxx', this.userPic)
            let request = new XMLHttpRequest()
            request.open('POST', '/yyy')
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        alert('上传成功')
                        // this.newUserPic.src = request.reponseText
                    } else {
                        alert('很抱歉，我并没有服务器去保存您的头像，所以您的头像不能保存')
                    }
                }
            }
            request.send(formData)
        }
    }

    controller.init(view,model)
}.call()