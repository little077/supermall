<template>
<div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
     ref="backTo" 
     :probe-type='3'
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp='loadMore'
    >
              <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view />
    <tab-control :titles="['流行','新款','精选']"
     @tabClick='tabClick'
     class="tab-control" />
    <goods-list :goods='showGoods' />

    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FeatureView from "./childComps/FeatureView"
import TabControl from "components/content/tabControl/TabControl.vue"
import {getHomeMultidata,GetHomeGoods} from "network/home"
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop'

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
   computed:{
     showGoods(){
       return this.goods[this.currentType].list
     }
   },
   data(){
 
     return {
       banners:[],
       recommends:[],
       goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]},
       },
       currentType:'pop',
       isShowBackTop:false
     }
   },
    created(){
      //具体的逻辑代码放在methods里面
      //请求多个数据
      this.getHomeMultidata(),
      //请求商品数据
      this.GetHomeGoods('pop')
      this.GetHomeGoods('new')
      this.GetHomeGoods('sell')
       
    },
    methods:{ 
      /**
       * 下拉加载更多
       */
      loadMore(){
        this.GetHomeGoods(this.currentType)
      },
      /***
       * 事件监听方法
       */
      contentScroll(position){
        if(position.y<=-1000){
          this.isShowBackTop=true
        }
        else{
          this.isShowBackTop=false
        }

      },
      //回到顶部，父组件使用.native监听事件使用子组件中的方法
      backTop(){
        this.$refs.backTo.backTop(0,0)
      },
      //切换选框
      tabClick(index){
        if(index==0){
          this.currentType='pop'
        }
        else if(index==1){
          this.currentType='new'
        }
        else{
          this.currentType='sell'
        }
      },
      /**
       * 网络请求方法
       */
      getHomeMultidata(){  getHomeMultidata().then(res=>
        {
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })},
      GetHomeGoods(type){
        const page = this.goods[type].page+1
         GetHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          this.$refs.backTo.finishPullUp()} 
         )
      }
    }
   
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
  position: relative;
  height: 100vh;
  /* 百分之百视口*/
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
.content{
  overflow: hidden;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
  top:44px;
}
</style>
