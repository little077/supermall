<template>
  <div class="detail">
     <detail-nav-bar/>
     <detail-swiper :topImages=topImages></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import {getDetail} from 'network/detail.js'
import DetailSwiper from './childComps/DetailSwiper.vue';
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper

  },
  data(){
      return {
         iid:null,
         topImages:[]
      }
  },
  created(){
     this.iid = this.$route.params.iid
      getDetail(this.iid).then(res=>{
       /**获取顶部轮播图数据 */
      this.topImages = res.result.itemInfo.topImages
     })
  },

}
</script>

<style scoped>

</style>