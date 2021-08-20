<template>
  <div :class="{show:isShow}">{{message}}</div>
</template>

<script>
export default {
  name:'Toast',
  data(){
      return {
          isShow:false,
          message:""
      }
  },
  methods:{
    show(message,time=2000){
      this.isShow=true
      this.message=message
      setTimeout(()=>{
          this.isShow=false
          this.message=''
      },time)
    }
  }
}
</script>

<style scoped>
.show{
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.7);
    z-index: 999;
    color: #fff;
    padding: 8px 10px;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 34px;
}
</style>