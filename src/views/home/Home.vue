<template>
<div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view />
    <tab-control :titles="['流行','新款','精选']"
    @tabClick="tabClick"
     class="tab-control" />
    <goods-list :goods="showGoods" />
   <ul>
     <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>
      <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>
      <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>
      <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>
      <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>
      <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>

      <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>
      <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>
      <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>v <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li> <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     <li>5</li>
     <li>6</li>
   </ul>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FeatureView from "./childComps/FeatureView"
import TabControl from "components/content/tabControl/TabControl.vue"
import GoodsList from "components/content/goods/GoodsList.vue"

import {getHomeMultidata,getHomeGoods} from "network/home"

  export default {
   name:"Home",
   components:{
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
     GoodsList
   
   },
   methods:{
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
        })
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
</style>
