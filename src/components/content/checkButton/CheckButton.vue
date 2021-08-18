<template>
  <div class="check-button" :class="{check:isShow}"
  @click="show">
      <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  data(){
    return {
      isShow:false
    }
  },
  methods:{
    show(){
      this.isShow=!this.isShow
    }
  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid rebeccapurple;
  }
  .check{
    background: red;
  }
</style>