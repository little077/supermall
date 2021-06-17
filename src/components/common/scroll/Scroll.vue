<template>
  <div  class="wrapper" ref="wrapper">
  <div class='content'>
      <slot></slot>
  </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:1
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
      return {
          scroll:null,
      }
  },
  mounted(){
  this.scroll = new BScroll(this.$refs.wrapper,{
         click:true,
         observeDOM:true,
         mouseWheel:true,
         disableTouch:false,
         observeImage:true,
         probeType:this.probeType,
         pullUpLoad:this.pullUpLoad 
      }),
      this.scroll.on('scroll',position=>
        this.$emit('scrollevent',position))
        /** */
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style scoped>

</style>