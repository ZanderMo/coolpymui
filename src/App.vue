<template>
    <div id="app">
        <div class="login-header">
            <img class="login-header-logo" />
            <span class="glyphicon glyphicon-chevron-left"></span>
            <slot>--</slot>
            <router-link to='/'>index</router-link>
            <router-link to='/login'>login</router-link>
        </div>
        <div class="top-space"></div>
        <router-view></router-view>
        <p><br></p>
        <div class="nav-bottom">
            <ul class="nav navbar-fixed-bottom" role="tablist">
                <li role="presentation">
                    <router-link to="/devices" active-class="active"><span class="glyphicon glyphicon-dashboard"></span> 我的设备</router-link>
                </li>
                <li role="presentation">
                    <router-link to="/setting" active-class="active"><span class="glyphicon glyphicon-cog"></span> 设置</router-link>
                </li>
                <li role="presentation">
                    <router-link to="/aboutCP" active-class="active"><span class="glyphicon glyphicon-th-list"></span> 关于CP</router-link>
                </li>
            </ul>
        </div>
        <div class="top-space"></div>
    </div>
</template>

<script>
    import './assets/js/jquery-2.0.3.min.js';
    import './assets/js/bootstrap.min.js';

    export default {
        name: 'app',
        components: {

        }
    }
</script>

<style lang="less">
    #app {
        /*background: url(./assets/images/wallpaper1_1_h800.jpg) 50% 20%;*/
        width: 100%;
        height: 100%;
        font-size: 14px;
   
    .login-header {
        height: 40px;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: #f5f5f5;
        line-height: 40px;
        border-top: 1px solid #dedede;
        box-shadow: 0px 0px 7px #666;
        z-index: 9;
    }
    
    .top-space {
        height: 50px;
    }
        .nav-bottom {
            ul {
                background-color: #f5f5f5;
                border-top: 1px solid #ddd;
                li {
                    float: left;
                    width: 33%;
                    text-align: center;
                    font-size: 16px;
                }
                .active {
                    /*background-color: rgba(204, 204, 204, 0.8);*/
                    background-color: #ec971f;
                    border: 1px solid #fff;
                    color: #fff;
                    box-shadow: 0px 0px 5px #666 inset;
                    border-radius: 5px;
                }
            }
        }
}
</style>