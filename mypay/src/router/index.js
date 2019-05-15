import Vue from 'vue'
import Router from 'vue-router'
import Pay from '@/components/pay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/id=粤B12344',
      name: 'Pay',
      component: Pay
    }
  ]
})
