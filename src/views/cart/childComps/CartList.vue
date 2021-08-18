<template>
  <div class="cart-list" >
       <scroll class="content" ref="scroll" > 
        <cart-list-item v-for="(item,index) in numdata" :key="index" :itemInfo="item"></cart-list-item>
       </scroll> 
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
export default {
  components: { Scroll,CartListItem },
  name:'CartList',
  data(){
    return {
      numdata: this.$store.state.cartList
    }
  },
  activated(){
      this.$refs.scroll.refresh()
  },
//   computed:{
//       getdata(){
//           return this.$store.state.cartList
//       }
//   },
//   created(){
      
//   },
}
</script>

<style scoped>
.cart-list{
    font-size: 20px;
    color: red;
    /* height: 100% ; */
}
.content{
    position: absolute;
    bottom: 79px;
    top:44px;
    right: 0;
    left: 0;
    overflow: hidden;
 }  
</style>