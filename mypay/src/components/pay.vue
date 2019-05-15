<template>
  <div id="pay">
    <div class="header">
      <div class="back">
        <img :src="backSrc" alt="backSrc">
        <span>返回</span>
      </div>
      <p>临停缴费</p>
    </div>
    <div class="pay-show">
      <div class="pay-show-inner">
        <img :src="sTopBgSrc" alt="sTopBgSrc">
        <img :src="sBottomBgSrc" alt="sBottomBgSrc">
        <div class="pay-show-inner-content">
          <div class="content-header">
            <p>{{carid}}</p>
            <p v-if="!isPaid">
              未缴费
            </p>
            <p v-else>
              已缴费
            </p>
          </div>
          <div class="content-body">
            <div class="content-time">
              <div>
                <p>进场时间</p>
                <p><span>{{intimes.date}}</span><span>{{intimes.dateTime}}</span></p>
              </div>
              <div>
                <p>出场时间</p>
                <p><span>{{outtimes.date}}</span><span>{{outtimes.dateTime}}</span></p>
              </div>
            </div>
            <div class="content-price">
              <p>￥<span>{{paidPrice}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-choose-box" v-if="!isPaid">
      <div class="choose-radio-box" v-for="(item,index) in radios" :key="item.id">
        <div class="choose-radio-box-left"></div>
        <div class="choose-radio-box-right">
          <div class="radio-box-right-text">
            <p>{{item.title}}</p>
            <p>{{item.descript}}</p>
          </div>
          <input :checked="item.isChecked" @click="check(index)" type="radio">
        </div>
      </div>
    </div>
    <div class="pay-btn" @click="paidIt()" v-if="!isPaid">
      <p>支付</p>
    </div>
    <div class="mask" v-if="isClick"></div>
    <div class="dialog" v-if="isClick">
      <p>{{dialogMsg}}</p>
      <div class="dialogBtn" @click="agreeIt">
        <p>确定</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'Pay',
    data() {
      return {
        bgSrc: require('@/assets/bg.png'),
        sTopBgSrc:require('@/assets/s-top-bg.png'),
        sBottomBgSrc:require('@/assets/s-bottom-bg.png'),
        backSrc:require('@/assets/back.png'),
        carid:null,
        intimes:{
          date:null,
          dateTime:null
        },
        outtimes:{
          date:null,
          dateTime:null
        },
        paidPrice:null,
        nowindex:0,
        isClick:false,
        isPaid:false,
        dialogMsg:"",
        radios:[{
          id:0,
          title:"微信支付",
          descript:"推荐安装微信5.0以上版本用户使用银行",
          isChecked: true
        },
        {
          id:1,
          title:"支付宝",
          descript:"推荐有支付宝账号的用户使用",
          isChecked: false
        },
        {
          id:2,
          title:"浦发银行",
          descript:"推荐有浦发银行账号的用户使用",
          isChecked: false
        },
        {
          id:3,
          title:"运达一卡通",
          descript:"推荐有运达一卡通账号的用户使用",
          isChecked: false
        },
        {
          id:4,
          title:"银行卡支付",
          descript:"推荐有我家云钱包账号的用户使用",
          isChecked: false
        }]
      }
    },
    methods:{
      init(data){
        
        this.carid=data.carid;
        this.intimes.date=data.intimes.date;
        this.intimes.dateTime=data.intimes.dateTime;
        this.outtimes.date=data.outtimes.date;
        this.outtimes.dateTime=data.outtimes.dateTime;
        this.paidPrice=data.paidPrice
        console.log(data.intimes.date)
      },
       check(index) {
        let radiosArr=this.radios;
        for(var i=0;i<radiosArr.length;i++){
          radiosArr[i].isChecked=false;
        }
        radiosArr[index].isChecked=true;
        this.nowindex=index;
       },
       paidIt(){
        this.isClick=true;
        if(this.nowindex==0){
          this.dialogMsg="微信支付无法支付，重新选择"
        }else{
          this.dialogMsg="支付成功请点击确定";
          
        }
       },
       agreeIt(){
         this.isClick=false;
         if(this.nowindex != 0){
            this.$store.dispatch('paidMethod');
            this.isPaid=this.$store.getters.getPaidMethod;
            console.log(this.isPaid)
         }
       }
    }
    ,
    mounted() {
      
      axios.get('/api/myid').then( (res) =>{
        console.log(res.data.data)
        this.init(res.data.data)
      })
      .catch((error)=> {
      console.log(error)
      })
      this.isPaid=this.$store.state.isPaid;
    },
  }
</script>

<style scoped>
  .mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: rgba(0,0,0,.5);
  }
  .dialog{
    width: 70%;
    height: 25%;
    position: absolute;
    top:30%;
    left: 50%;
    transform: translate(-50%);
    z-index: 999;
    background:rgba(255,255,255,.9);
    border-radius: 10px;
  }
  .dialog>p{
    font-size: 36px;
    font-family: PingFangSC-Medium;
    color: #333333;
    margin-top: 23%;
  }
  .dialogBtn{
    width: 30%;
    height: 20%;
    background: #21C4B3;
    border-radius: 25px;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialogBtn>p{
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #ffffff;
  }
  #pay{
    width:100%;
    height: 100%;
    display: flex;
    flex-direction:column;
  }
 /* 头部部分 */
  .header{
    width: 100%;
    height:100px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .header>p{
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #333333;
    letter-spacing: 0.58px;
    margin: 0 auto;
  }
  .back{
    position: absolute;
    left: 4.3%;
    height: 34px;
  }
  .back img{
    width:34px;
    height: 27px;
  }
  .back span{
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #333333;
    letter-spacing: 0.58px;
    padding-bottom: 2px;
  }
  /* 停车缴费详细信息部分 */
  .pay-show{
    width: 100%;
    height: 405px;
    background: rgb(233,239,244);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pay-show-inner{
    width:686px;
    height:341px;
    background: linear-gradient(rgb(62,185,248), rgb(33,139,241));
    border-radius: 10px;
    position: relative;

  }
  .pay-show-inner img{
    position: absolute;
    
  }
  .pay-show-inner img:first-child{
    width: 534px;
    height: 341px;
    top: 0;
    right: 0;
  }
  .pay-show-inner img[alt="sBottomBgSrc"]{
     width: 310px;
     height: 200px;
     bottom: 0;
     right: 0;
     z-index: 1;
  }
 .pay-show-inner-content{
     width: 100%;
     height: 100%;
     position: absolute;
     top: 0;
     left: 0;
     z-index: 99;
 }
 .content-header{
    width: 100%;
    height: 24%;
    padding: 0 5%;
    border: 2px solid rgba(255,255,255,.3);
    box-sizing: border-box;
    display: flex;
    justify-content:space-between;
    align-items: center
 }
 .content-header>p{
    font-family: PingFangSC-Medium;
    font-size: 26px;
    color: #FFFFFF;
    letter-spacing: 0;
 }
 .content-header>p:last-child{
   width: 100px;
   height: 41px;
   opacity: 0.8;
   background: #FFFFFF;
   border-radius: 66px;
   font-family: PingFangSC-Regular;
   font-size: 24px;
   color: #1890FF;
  line-height: 41px;
 }
 .content-body{
   width: 100%;
   height:76%;
   display: flex;
   padding: 0 5%;
   box-sizing: border-box
 }
 .content-body>div{
   flex:1;
 }
 .content-time{
   width: 60%;
   height: 100%;
   display: flex;
   flex-direction: column;
  
 }
 .content-time>div{
   flex: 1;
   padding-top: 8%;
 }
 .content-time>div>p{
   font-family: PingFangSC-Regular;
   font-size: 26px;
   color:rgba(255,255,255,.8);
   letter-spacing: 0;
   padding-bottom: 10px;
   text-align: left
 }
 .content-time>div>p span{
  font-family: PingFangSC-Medium;
  font-size: 26px;
  color: #FFFFFF;
 }
 .content-time>div>p span:first-child{
   padding-right: 8px;
 }
 .content-price{
   display: flex;
   align-items: flex-end;
 }
 .content-price>p{
   font-family: PingFangSC-Medium;
   font-size: 96px;
   color: #FFFFFF;
   line-height: 68px;
   text-align: left;
   padding-bottom: 10%;
 }
 
  /* 选择支付方式部分 */
  .pay-choose-box{
   width: 100%;
   flex: 1;
   background: #FFFFFF;
   }
  .choose-radio-box{
    width: 100%;
    height: 138px;
    display: flex;
    
  }
  .choose-radio-box-left{
    width:44px;
    height: 44px;
    background: #D8D8D8;
    border-radius: 50%;
    margin: 4.3%;
    
  }
   .choose-radio-box-right{
     display: flex;
     justify-content: space-between;
     box-sizing: border-box;
     padding-right: 4.3%;
     padding-top:4.3%;
     flex: 1;
     border-bottom:1px solid #EEEEEE;
   }
   .radio-box-right-text>p:first-child{
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #333333;
      padding-bottom: 2px;
    }
  .radio-box-right-text>p{
     font-family: PingFangSC-Regular;
     font-size: 20px;
     text-align: left;
     color: #999999;
   }
   .choose-radio-box-right input{
     width:44px;
     height: 44px; 
   }
   /* 支付按钮部分 */
    .pay-btn{
    width: 686px;
    height: 88px;
    background: #21C4B3;
    border-radius: 4px;
    margin: 20px auto;
    }
    .pay-btn>p{
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #FFFFFF;
    letter-spacing: 0.58px;
    text-align: center;
    line-height: 88px;
    }
   
</style>