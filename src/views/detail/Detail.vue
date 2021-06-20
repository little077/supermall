<template>
  <div id='detail'>
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
    <detail-base-info  :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import {getDetail,Goods,Shop,GoodsParam} from 'network/detail.js'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import Scroll from 'components/common/scroll/Scroll'
export default {
  components: { DetailNavBar,
  DetailSwiper ,
  DetailBaseInfo,
  DetailShopInfo,
  DetailGoodsInfo,
  DetailParamInfo,
  Scroll},
  name:'Detail',
  methods:{
    imageLoad(){
    //  this.$refs.scroll.scroll.refresh()
    }
  } ,
  data(){
      return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{}
      }
  },
  created(){
    // 保存传入的iid
      this.iid=this.$route.params.iid
    //  根据iid请求数据
    getDetail(this.iid).then(res=>
    {
      const data=res.result
      this.topImages=data.itemInfo.topImages
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shop=new Shop(data.shopInfo)
      this.detailInfo=data.detailInfo
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
    })
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
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px);
}
</style>