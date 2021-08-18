<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveImage from '@better-scroll/observe-image'
import Pullup from '@better-scroll/pull-up'
BScroll.use(ObserveImage)
BScroll.use(Pullup)
export default {
  name:"Scroll",
  props:{
      probeType:{
          type:Number,
          default:0
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
  methods:{
    backTop(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
        this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll.refresh()
    }
  },
  mounted(){
      this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        observeImage: true,
        probeType:this.probeType,
        pullUpLoad:true
  })
  this.scroll.on('scroll',(position)=>{
    this.$emit('scroll',position)
  })
  this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
  })

  }
  
  
}

</script>

<style scoped>

</style>