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
        search: null,
        google: null,
        baidu: null,
        searchContent: null,
        init: function(){
            this.view = view
            this.model = model
            this.search = view.querySelector('#search')
            this.google = view.querySelector('#google')
            this.baidu = view.querySelector('#baidu')
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
        }
    }

    controller.init(view,model)
}.call()