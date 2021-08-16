<template>
  <div id="detail">
     <detail-nav-bar class="detail-nav"/>
     <scroll class="content">
     <detail-swiper :topImages=topImages></detail-swiper>
     <detail-base-info :goods="goods" />
     <detail-shop-info :shop="shop"></detail-shop-info>
     <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
     <detail-param-info :paramInfo="paramInfo"></detail-param-info>
     <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
     <goods-list :goods="recommends"></goods-list>
     </scroll>
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


export default {
  name:'Detail',
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
         recommends:[]
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
  height: calc(100% - 44px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>