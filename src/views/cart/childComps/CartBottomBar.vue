<template>
  <div class="bottombar">
      <div class="inline">
          <check-button class="check2" :checked="isshow" @click.native="allcheck"></check-button>  
          <span>全选</span>
      </div> 
        <div class="center">合计{{totalPrice}}</div>
        <div class="right">去计算({{count}})</div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  name:'CartBottomBar',
  components:{
      CheckButton
  },
  methods:{
    allcheck(){
    if(this.isshow){
      for(let i of this.$store.state.cartList){
        i.checked = false
      }
    }
    else{
      for(let i of this.$store.state.cartList){
        i.checked = true
      }
    }

    }
 
  },
  computed:{
    totalPrice(){
      return '￥'+ this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((preValuce,item)=>{
        return preValuce + item.price*item.count
      },0)
    },
    count(){
      return this.$store.state.cartList.filter(item=>item.checked).length
    },
    isshow(){
      // if(this.$store.state.cartList.length==0) return false
      // return !this.$store.state.cartList.find(item=>!item.checked)
       if(this.$store.state.cartList.length==0) return false
       return !(this.$store.state.cartList.some(item=>!item.checked))

    }
  }
}

</script>
   

<style scoped>
.bottombar{
    /* background: red; */
    background: #eee;
    height: 40px;
    position: fixed;
    display: flex;
    bottom: 49px;
    right: 0;
    left: 0;
    color: red;
}
.inline{
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 10px;
}
.check2{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.center{
  margin-left: 10px;
  line-height: 40px;
}
.right{
 line-height: 40px;
 color: #fff;
 background: red;
 width: 90px;
 text-align: center;
 font-size: 10px;
}

</style>