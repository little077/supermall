import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addcartnum(state,payLoad){
     payLoad.count+=1
    },
    addcart(state,payLoad){
      payLoad.count=1
      payLoad.checked=true
      state.cartList.push(payLoad)
    }
  },
  actions: {
    addCart(content,payLoad){
      return new Promise((resolve,reject)=>{
        let obj = null
        for(let i of content.state.cartList){
          if(i.iid==payLoad.iid){  obj=i }  }
          if(obj){
            content.commit("addcartnum",obj)
            resolve('数量+1')
          }
          else{
            content.commit('addcart',payLoad) 
            resolve('添加商品')
          }
      })
    } 
  

  },
  modules: {
  }
})
