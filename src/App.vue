<template>
  <div id="app" >
    <div class="login-header">
        <img class="login-header-logo" />
        <span class="glyphicon glyphicon-chevron-left"></span>
        <slot>--</slot>
        <router-link to='/index'>index</router-link>
        <router-link to='/login'>login</router-link>
    </div>
    <div class="top-space"></div>
    <router-view></router-view>
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

<style>
    #app {
        /*background: url(./assets/images/wallpaper1_1_h800.jpg) 50% 20%;*/
        width: 100%;
        height: 100%;
        font-size: 14px;
    }
    
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
</style>