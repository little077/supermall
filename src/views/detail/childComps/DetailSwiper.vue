<template>
    <swiper class="swipers">
      <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item" >
      </swiper-item>
    </swiper>   
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:'DetailSwiper',
  props:{
      topImages:{
      type:Array,
      default:[]
  }},
  components:{
      Swiper,
      SwiperItem

 
  }
}
</script>

<style scoped>
.swipers{
    height: 300px;
    overflow: hidden;
}
</style>