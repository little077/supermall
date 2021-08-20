import Toast from './Toast.vue'
const obj = {}
/**
 * 默认传来Vue
 */
obj.install = function(Vue){
    /**创建组件构造器 */
  const toastContrustor = Vue.extend(Toast)
    /**new的方式，根据组件构造器，可以创建一个组件对象 */
  const toast = new toastContrustor()
   /**将组件对象，手动挂载在某一个节点上 */
  toast.$mount(document.createElement('div'))
  /**toast.$el对应的就是这个div */
  document.querySelector('body').appendChild(toast.$el)
  Vue.prototype.$toast = toast

}
export default obj