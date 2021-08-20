import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import obj from 'components/common/toast'
/**解决移动端300ms延迟问题 */
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
FastClick.attach(document.querySelector('body'))
Vue.use(obj)
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/bingdao.png')
})
new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
