// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-switch.min.css'


import login from './components/singleView/loginView.vue'
import index from './components/singleView/indexView.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/index', component: index },
        { path: '/login', component: login },
    ]
});


const app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app')