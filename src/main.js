// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'

Vue.use(MintUI);

import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-switch.min.css'

window.API_URL = 'http://192.168.2.71:6543';

import login from './components/singleView/loginView.vue'
import index from './components/singleView/indexView.vue'
import devices from './components/common/devices.vue'
import charts from './components/common/charts.vue'
import setting from './components/common/setting.vue'
import aboutCP from './components/common/aboutCP.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/index',
            component: index,
            children: [
                { path: "devices", component: devices },
                { path: "charts", component: charts },
                { path: "setting", component: setting },
                { path: "aboutCP", component: aboutCP },
            ]
        },
        { path: '/login', component: login },
    ]
});


const app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app')