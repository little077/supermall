import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCart(state,payLoad){
      let obj = null
      for(let i of state.cartList){
        if(i.iid==payLoad.iid){
         obj=i
        }
      }
      if(obj){
        obj.count+=1
      }
      else{
        payLoad.count=1
        payLoad.checked=true
        state.cartList.push(payLoad)
      }
    
    }
  },
  actions: {
  },
  modules: {
  }
})
