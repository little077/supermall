<template>
  <div class="check-button " :class="{check:checked}" >
        <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  data(){
    return {
      
    }
  },
  props:{
    /**不要在这里直接修改，应该由模型决定，也就是Vuex里面添加的属性，动态的去决定是否选中 */
    checked:{
      type:Boolean,
      default:false
    }
  },
  methods:{
  

  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
    
  }
  .check{
    border-color: red;
    background: red;
  }
</style>