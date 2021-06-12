<template>
<div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view />
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import FeatureView from "./childComps/FeatureView"
import RecommendView from './childComps/RecommendView'
import {getHomeMultidata} from "network/home"
  export default {
   name:"Home",
   components:{
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView
   },
   data(){
     return {
       banners:[],
       recommends:[]
     }
   },
    created(){
      getHomeMultidata().then(res=>
        {
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
  font-size:16px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}

</style>
