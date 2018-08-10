import {setFromatParam} from './global.js'
import router from '../../router/index.js'

//router拦截器
(function(){
    router.beforeEach((to,from,next) =>{
        //console.log('------to.path--2------',to.path)
        if(Object.is(to.path,'/conferences')){
            let param = true
            setFromatParam('isShowNav',param)
            next()
        } else {
            let param = false
            setFromatParam('isShowNav',param)
            next()
        }
        next()
     })
})()