import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Questionnaire from '@/components/Questionnaire'
import Responses from '@/components/Responses'
import Options from '@/components/Options'
import EditQuestion from '@/components/EditQuestion'
import NewQuestion from '@/components/NewQuestion'
import Login from '@/components/Login'
import Navbar from '@/components/Navbar'
import Test from '@/components/Test'
import Chart from '@/components/Chart'

import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
    	path: '/questionnaire',
    	name: 'Questionnaire',
    	component: Questionnaire
    },
    {
    	path: '/responses',
    	name: 'Responses',
    	component: Responses,
    	props: true
    },
    {
    	path: '/options',
    	name: 'Options',
    	component: Options,
    	meta: {
    		requiresAuth: true
    	}
    },
    {
    	path: '/edit-question/:question_slug',
    	name: 'EditQuestion',
    	component: EditQuestion,
    	meta: {
    		requiresAuth: true
    	}
    },
    {
    	path: '/new-question',
    	name: 'NewQuestion',
    	component: NewQuestion,
    	meta: {
    		requiresAuth: true
    	}
    }
    ,
    {
    	path: '/login',
    	name: 'Login',
    	component: Login
    },
    {
        path: '/test',
        name: 'Test',
        component: Test,
        props: true,
        meta: {
            requiresAuth: true
        }
    }
  ],
  scrollBehavior() {
    return {x: 0, y: 0}
    }
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(rec => rec.meta.requiresAuth)){
        firebase.auth().onAuthStateChanged(user => {
              if (user) {
                next()
              } else {
                next({name: 'Login'})
              }
            })
	}
    else {
		next()
	}
})

export default router;






