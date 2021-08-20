import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
let obj = {
  count:1
}
let obj1 = {
  count:1
}
let a = [obj,obj1]
console.log(a.filter(item=>item.count)) 