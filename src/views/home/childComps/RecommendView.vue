<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
  </div>
</template>

<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            dafault(){
                return []
            }
        }
    }
}
</script>

<style>
 .recommend{
     display: flex;
  
     font-size: 12px;
     padding: 10px 0 20px;
     border-bottom: 8px solid #eee;
     width:100%;
 }
 .recommend-item{
     flex:1;
     text-align: center;
 }
 .recommend-item img{
     width: 60px;
     height: 70px;
     margin-bottom: 10px;
 }
</style>