// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { AlertPlugin, ToastPlugin } from 'vux'

import './assets/css/bootstrap.min.css'


window.API_URL = 'http://192.168.2.73:6543';

import login from './components/singleView/loginView.vue'
import index from './components/singleView/indexView.vue'
import devices from './components/common/devices.vue'
import setting from './components/common/setting.vue'
import aboutCP from './components/common/aboutCP.vue'
import nodeNum from './components/nodeData/nodeNum.vue'
import nodeGps from './components/nodeData/nodeGps.vue'
import nodeImages from './components/nodeData/nodeImages.vue'
import nodeCustom from './components/nodeData/nodeCustom.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/index',
            component: index,
            children: [
                { path: "setting", component: setting },
                { path: "aboutCP", component: aboutCP },
                { path: "nodeGps", component: nodeGps },
                {
                    path: "devices",
                    component: devices,
                    children: [
                        { path: "nodeNum", component: nodeNum },
                        
                        { path: "nodeImages", component: nodeImages },
                        { path: "nodeCustom", component: nodeCustom },
                    ]
                },
            ]
        },
        { path: '/login', component: login },
    ]
});


const app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app');



