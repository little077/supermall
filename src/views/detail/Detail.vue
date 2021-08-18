<template>
  <div id="detail">
     <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar" />
     <scroll class="content" ref="backTo" @scroll="scroll">
     <detail-swiper :topImages=topImages></detail-swiper>
     <detail-base-info :goods="goods" />
     <detail-shop-info :shop="shop"></detail-shop-info>
     <detail-goods-info :detailInfo="detailInfo" @imgload="imageload"></detail-goods-info>
     <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
     <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
     <goods-list :goods="recommends" ref="goodlist" ></goods-list>
     </scroll>
     <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
     <back-top @click.native="backTop" v-show="isShowBackTop" ></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from "components/content/goods/GoodsList"
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import BackTop from 'components/content/backTop/BackTop.vue'


export default {
  name:'Detail',
  methods:{
     backTop(){
        this.$refs.backTo.backTop(0,0)
      },
    titleClick(index){
      this.$refs.backTo.backTop(0,this.themeTops[index]+44,300)
    },
    scroll(position){
     /**两个都是负值，tm的太不好判断了。这块有个问题，scroll方法调用太多，会影响性能 */
       if(((position.y<0)||(position.y>=0))&&position.y>this.themeTops[1]+44){
        this.Index=0
      }
      else if(position.y<=(this.themeTops[1]+44)&&position.y>(this.themeTops[2]+44)){
        this.Index=1
      }
       else if(position.y<=(this.themeTops[2]+44)&&position.y>(this.themeTops[3]+44)){
        this.Index=2
      }
      else{
        this.Index=3
      }
      this.$refs.navBar.currentIndex=this.Index
      if((-position.y>=1000)){
        this.isShowBackTop=true
      }
      else{
        this.isShowBackTop=false
      }
    },
    imageload(){
     this.themeTops=[]
     this.themeTops.push(0)
     this.themeTops.push(-this.$refs.param.$el.offsetTop)
     this.themeTops.push(-this.$refs.comment.$el.offsetTop)
     this.themeTops.push(-this.$refs.goodlist.$el.offsetTop)
    
    },
    addCart() {
        // 2.将商品信息添加到Store中
        const obj = {}
        obj.iid = this.iid
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.price = this.goods.realPrice
        // this.$store.dispatch('addToCart', obj).then(() => {
	       //  this.$toast({message: '加入购物车成功'})
        // })
        // this.addCart(obj).then(() => {
	      //   this.$toast({message: '加入购物车成功'})
        // })
         this.$store.commit('addCart',obj)
       
	    },
  },
  // updated(){

  // },
  // mounted(){
   
  // },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    commonInfo:{},
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,


  },
  data(){
      return {
         iid:null,
         topImages:[],
         goods:{},
         shop:{},
         detailInfo:{},
         paramInfo:{},
         commentInfo:{},
         recommends:[],
         themeTops:[],
         Index:0,
         isShowBackTop:false,
      }
  },
  created(){
     this.iid = this.$route.params.iid
      getDetail(this.iid).then(res=>{
       /**获取顶部轮播图数据 */
      const data = res.result
      this.topImages = data.itemInfo.topImages
      /**
       * 获取商品信息 ，类中给组件传递数据
       */
       this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
       this.shop = new Shop(data.shopInfo)
       /**商品详情信息 */
       this.detailInfo = data.detailInfo
       /**商品参数信息 */
       this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          /**
        * 取出评论信息
         */
        if(data.rate.cRate!== 0){
           this.commentInfo = data.rate.list[0]   }

           })  
      /**
       * 请求推荐数据
       */
      getRecommend().then(res=>this.recommends=res.data.list)
  },
  // mounted(){
  //   console.log(this.$refs.pinglun.$el.offsetTop)
  // }

}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 93px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>