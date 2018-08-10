<template>
   <div class="content invite page-bottom">
      <v-nav :path="path" :title="title" :returnFlag="returnFlag"></v-nav>

      <div class="confDetail_main">
        <div class="wrapper-line">
                <div class="userHeadWrapper">
                <div v-for="(item,index) in users" class="userList-body" :key="index">
                    <span class="userHeader">
                        <img src="../assets/img/user.png" class="img-head-default" />
                        <p class="userName">{{item.name}}</p>
                    </span>
                </div>
            </div>
        </div>
      </div>

    </div>
</template>

<script>
import VNav from '../components/Nav'

export default {
    name:'memberList',
    data(){
        return{
            users:[
                    {name:'shelley',imgUrl:'../assets/img/adv.jpg'},
                    {name:'2',imgUrl:'../assets/img/adv.jpg'},
                    {name:'3',imgUrl:'../assets/img/adv.jpg'},
                    {name:'4',imgUrl:'../assets/img/adv.jpg'},
                    {name:'5',imgUrl:'../assets/img/adv.jpg'},
                    {name:'6',imgUrl:'../assets/img/adv.jpg'},
                    {name:'7',imgUrl:'../assets/img/adv.jpg'},
                    {name:'8',imgUrl:'../assets/img/adv.jpg'},
                    {name:'9',imgUrl:'../assets/img/adv.jpg'},
                    {name:'10',imgUrl:'../assets/img/adv.jpg'},
                    {name:'11',imgUrl:'../assets/img/adv.jpg'},
                    {name:'12',imgUrl:'../assets/img/adv.jpg'},
                    {name:'12',imgUrl:'../assets/img/adv.jpg'},
                    {name:'13',imgUrl:'../assets/img/adv.jpg'},
                    {name:'14',imgUrl:'../assets/img/adv.jpg'},
                    {name:'14',imgUrl:'../assets/img/adv.jpg'},
                    {name:'12',imgUrl:'../assets/img/adv.jpg'},
                    {name:'13',imgUrl:'../assets/img/adv.jpg'},
                    {name:'14',imgUrl:'../assets/img/adv.jpg'},
                    {name:'14',imgUrl:'../assets/img/adv.jpg'},
                    {name:'12',imgUrl:'../assets/img/adv.jpg'},
                    {name:'13',imgUrl:'../assets/img/adv.jpg'},
                    {name:'14',imgUrl:'../assets/img/adv.jpg'},
                    {name:'14',imgUrl:'../assets/img/adv.jpg'},
                    {name:'12',imgUrl:'../assets/img/adv.jpg'},
                    {name:'13',imgUrl:'../assets/img/adv.jpg'},
                    {name:'14',imgUrl:'../assets/img/adv.jpg'}
                ],
                returnFlag:true
        }
    },
    props:{
        title:{
            type:String,
            default:'会议详情'
        },
        path:{
            type:String,
            default:'/confDetail',
        }
    },
    components:{
        VNav
    }

}
</script>

