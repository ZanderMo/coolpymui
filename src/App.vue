<template>
  <div id="app" class="container">
    <router-link to='/index'>index</router-link>
    <router-link to='/login'>login</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
    import './assets/js/jquery-2.0.3.min.js';
    import './assets/js/bootstrap.min.js';
    import './assets/js/bootstrap-switch.min.js';

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
</style>