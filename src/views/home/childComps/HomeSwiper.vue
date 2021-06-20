<template>
      <swiper>
         <swiper-item v-for="(item,index) in banners" :key="index">  
             <a :href="item.link" >
             <img :src="item.image" alt="" @load="imgLoad">
             </a>
            </swiper-item>
  </swiper>
</template>
<script>
import {Swiper,SwiperItem} from  "components/common/swiper"
export default {
    name:'HomeSwiper',
    data(){
          return {
              istrue:false
          }
    },
    props:{
     banners:{
         type:Array,
         default(){
             return []
         }
     }
    },
    components:{
        Swiper,
        SwiperItem
   },
   methods:{
        imgLoad(){
            if(!this.istrue) {
                this.$emit('imgLoad') 
                this.istrue=true
            }
               
       }
   }
}
</script>

<style scoped>

</style>