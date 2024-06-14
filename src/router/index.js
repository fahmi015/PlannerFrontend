import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/user/auth';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { defineAsyncComponent } from 'vue';

const scrollBehavior = (to, from, savedPosition) => {
  return savedPosition ||
      {
          top: to.meta?.scrollTop || 0,
          left: 0
      }
}

function isAuth() {
    const auth = useAuthStore();
    if (! auth.user) return { path: '/login'}
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/:pathMatch(.*)',
      component: defineAsyncComponent(()=>import('@/views/user/NotFound.vue')),
    },
    {
      path: '/login',
      component: defineAsyncComponent(()=>import('@/views/Auth/Login.vue'))
    },
    {
      path: '/',
      redirect: '/user'
    },
    {
      path: '/user',
      component: defineAsyncComponent(() => import('../views/user/layouts/Master.vue')),
      beforeEnter: [ isAuth ],
      children: [     
        {
            path: 'dashboard',
            component: defineAsyncComponent(() => import('@/views/user/Index.vue')),
        },
        {
          path: 'profile',
          component: defineAsyncComponent(() => import('@/views/user/profile/Index.vue')),
        },
        // budgets routes
        {
          path: 'budgets',
          children: [
            {
              path: '',
              component: defineAsyncComponent(() => import('@/views/user/budgets/List.vue')),
              meta: {
                  title: "budgets",
              },
            },
            {
              path: 'create',
              component: defineAsyncComponent(() => import('@/views/user/budgets/Create.vue')),
              meta: {
                  title: "create budget",
              },
            },
            {
              path: 'edit/:id',
              component: defineAsyncComponent(() => import('@/views/user/budgets/Edit.vue')),
              meta: {
                  title: "edit budget",
              },
            }
          ] 
        },

         // team routes
        {
          path: 'team',
          children: [
            {
              path: 'edit/:id',
              component: defineAsyncComponent(() => import('@/views/user/users/Edit.vue')),
              meta: {
                  title: "edit user",
              },
            },
            {
              path: 'create',
              component: defineAsyncComponent(() => import('@/views/user/users/Create.vue')),
              meta: {
                  title: "add user",
              },
            },
            {
              path: '',
              component: defineAsyncComponent(() => import('@/views/user/users/List.vue')),
              meta: {
                  title: "team",
              },
            }
            
          ]
          
        },

        // project routes
        {
          path: 'projects',
          children: [
            {
              path: 'edit/:id',
              component: defineAsyncComponent(() => import('@/views/user/projects/Edit.vue')),
              meta: {
                  title: "edit project",
              },
            },
            {
              path: 'create',
              component: defineAsyncComponent(() => import('@/views/user/projects/Create.vue')),
              meta: {
                  title: "add project",
              },
            },
            {
              path: '',
              component: defineAsyncComponent(() => import('@/views/user/projects/List.vue')),
              meta: {
                  title: "projects",
              },
            }
            
          ]
          
        },

        // task routes
        {
          path: 'tasks',
          children: [
            {
              path: '',
              component: defineAsyncComponent(() => import('@/views/user/tasks/Index.vue')),
              meta: {
                  title: "Tasks",
              },
            },
            {
              path: 'create',
              component: defineAsyncComponent(() => import('@/views/user/tasks/Create.vue')),
              meta: {
                  title: "add task",
              },
            },
            
          ]
          
        },
      ]
    }
  ],
  scrollBehavior
})

router.beforeResolve((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  document.title = to.meta.title ? import.meta.env.VITE_App_Name+' | '+to.meta.title : import.meta.env.VITE_App_Name;
  NProgress.done()
})

export default router
