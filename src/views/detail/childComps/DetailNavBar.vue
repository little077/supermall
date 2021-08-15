<template>
   <nav-bar>
       <div slot="left" class="left" 
       @click="back"><img src="~assets/img/common/back.svg"></div>
      <div slot="center" class="detail">
          <div v-for="(item,index) in title" 
          :class="{active:index===currentIndex}"
          class="detail-item"
          @click="active(index)"
          :key="index">{{item}}</div>
      </div>
   </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name:'DetailNavBar',
  components:{
      NavBar

  },
  methods:{
      active(index){
          this.currentIndex=index
      },
      back(){
          this.$router.back()
      }
  },
  data(){
      return {
          title:['商品','评论','参数','推荐'],
          currentIndex:0
      }
  }
}
</script>

<style scoped>
.detail{
    display: flex;
    font-size: 13px;
}
.detail-item{
    flex: 1;
}
.left{
    margin-top: 9px;
}
.active{
    color:#ff5777;
}
</style>