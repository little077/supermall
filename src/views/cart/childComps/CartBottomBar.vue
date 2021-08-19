<template>
  <div class="bottombar">
      <div class="inline">
          <check-button class="check2"></check-button>
          <div class="check1">全选</div>
      </div>
      <div>合计{{totalprice}}</div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  name:'CartBottomBar',
  components:{
      CheckButton
  },
  computed:{
    totalprice(){
    
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
    color: royalblue;
 
}
.inline{
    /* width: 20px; */
    display: flex;
    align-items: center;
}
.check2{
    width: 20px;
    height: 20px;
   line-height: 20px;
  margin-top: 10px;
}
.check1{
    margin-top: 10px;
}
</style>