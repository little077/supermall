<template>
<div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control :titles="['流行','新款','精选']"
     v-show="tabcontrolfixed"
     @tabClick='tabClick'
     class="tab-control" ref="tabControl1" />
    <scroll class="content"
     ref="backTo" 
     :probe-type='3'
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp='loadMore'
    >
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
    <recommend-view :recommends="recommends"/>
    <feature-view />
    <tab-control :titles="['流行','新款','精选']"
     @tabClick='tabClick'
     class="tab-control" ref="tabControl" />
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
       isShowBackTop:false,
       tabcontrolfixed:false
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
       * 加载轮播图是否完成的方法
       */
      swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop)
        /**
         * 轮播图加载完成发现对offsetTop判断影响小，所以放在滚动位置直接判断
         */
      },
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
        /**
         * 判断返回顶部是否显示
         */
        if(position.y<=-1000){
          this.isShowBackTop=true
        }
        else{
          this.isShowBackTop=false
        }
        /**
         * 判断tabcontrol是否显示
         */
        if(-position.y>=this.$refs.tabControl.$el.offsetTop){
           this.tabcontrolfixed=true
        }
        else{
          this.tabcontrolfixed=false
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
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl.currentIndex=index
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
.content{
  overflow: hidden;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
  top:44px;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
