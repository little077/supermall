<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <div  v-for="(item,index) in titles" 
              :key="index" 
              class="title-item"
              @click="activetitle(index)"
              :class="{active:currentIndex===index}">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar" 
export default {
  name:'DetailNavBar',
  components:{
      NavBar,
  },
  
    data (){
      return {
          currentIndex:0,
          titles:['商品','参数','评论','推荐']
      }
  },
  methods:{
      activetitle(index){
            this.currentIndex=index
      },
      backClick(){
          this.$router.back()
      }
  }
}
</script>

<style scoped>
.title{
    display: flex;
    font-size:13px;
}
.title-item{
    flex: 1;
}
.active{
    color:var(--color-high-text)
}
.back img {
     margin-top: 10px;
}
</style>