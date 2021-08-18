<template>
<div class="cart">
    <nav-bar class="navbar">
    <div slot="center"  class="cart">购物车({{getcurrent}})</div>
  </nav-bar>
  <cart-list></cart-list>
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar.vue'

export default {
  name:'Cart',
  computed:{
    getcurrent(){
      return this.$store.state.cartList.length
    }
  },
  data(){
    return {
      
    }
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar,

  }
}
</script>

<style scoped>
.navbar{
  background-color:#ff8198;
 
}
.cart{
  color: #fff;
  position: relative;
  height: 100vh;
}
</style>