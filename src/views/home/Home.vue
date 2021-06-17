<template>
<div id="home">
   <!-- 顶部 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 滚动托管部分 -->
    <scroll class="content" 
    ref="scroll" :probe-type='3'
     @scrollevent="scrollcontent"
     :pull-up-load="true" 
    @pullingUp='loadMore' 
     >
       <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view />
    <tab-control :titles="['流行','新款','精选']"
    @tabClick="tabClick"
     class="tab-control" />
    <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"/>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FeatureView from "./childComps/FeatureView"
import TabControl from "components/content/tabControl/TabControl.vue"
import GoodsList from "components/content/goods/GoodsList.vue"
import Scroll from 'components/common/scroll/Scroll.vue'
import {getHomeMultidata,getHomeGoods} from "network/home"
import BackTop from "components/content/backTop/BackTop.vue"

  export default {
   name:"Home",
   components:{
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
     GoodsList,
     Scroll,
     BackTop
    
    
   },
   methods:{
     loadMore(){
      this.getHomeGoods(this.currentType)
     },
     scrollcontent(position){
      this.isShow=(-(position.y)>1000)
       
     },
     getHomeMultidata(){
        getHomeMultidata().then(res=>
        {
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })  },
        getHomeGoods(type){
         const page= this.goods[type].page+1
           getHomeGoods(type,page).then(res=>
        {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page++
          /**完成一次上拉加载更多，再次回调 */
          this.$refs.scroll.scroll.finishPullUp()
        })
        },
        backTop(){
           this.$refs.scroll.scrollTo(0,0)
        },
        // 事件监听
        tabClick(index){
         switch(index){
           case 0:
             this.currentType='pop'
             break
               case 1:
             this.currentType='new'
             break
               case 2:
             this.currentType='sell'
             break
         }
        }
   },
   data(){
 
     return {
       banners:[],
       isShow:false,
       recommends:[],
       currentType:'pop',
      //  请求的数据结构
       goods:{
           'pop':{page:0,list:[]},
           'new':{page:0,list:[]},
           'sell':{page:0,list:[]}
       }
     }
   },
   computed:{
      showGoods() {
      return  this.goods[this.currentType].list
      }
   },
    created(){
      this.getHomeMultidata(),
      this.getHomeGoods('pop')
       this.getHomeGoods('new')
        this.getHomeGoods('sell')
    
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
  position: relative;
  height: 100vh;
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
.tab-control{
  position: sticky;
  top:44px;
  z-index: 9;
}
/* .content{
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
} */
.content{
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
