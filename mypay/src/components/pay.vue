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
      </div>
    </div>
    <div class="pay-choose-box">
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
    <div class="pay-btn">
      <p>支付</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Pay',
    data() {
      return {
        bgSrc: require('@/assets/bg.png'),
        sTopBgSrc:require('@/assets/s-top-bg.png'),
        sBottomBgSrc:require('@/assets/s-bottom-bg.png'),
        backSrc:require('@/assets/back.png'),
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
       check(index) {
        console.log(index);
        let radiosArr=this.radios;
        for(var i=0;i<radiosArr.length;i++){
          radiosArr[i].isChecked=false;
        }
        radiosArr[index].isChecked=true;
       }
    }
  }
</script>

<style scoped>
  #pay{
    width:100%;
    height: 100%;
    display: flex;
    flex-direction:column;
  }
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
  .pay-show-inner img:last-child{
     width: 310px;
     height: 200px;
     bottom: 0;
     right: 0;
  }
 
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
</style>