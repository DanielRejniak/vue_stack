import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Homepage from '@/components/Homepage'
import Submit from '@/components/Submit'
import Report from '@/components/Report'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/homepage'
    },
    {
      path: '/',
      redirect: '/homepage'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/homepage',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit
    },
    {
      path: '/report',
      name: 'Report',
      component: Report,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('homepage')
  else if (!requiresAuth && currentUser) next('report')
  else next()
})

export default router
