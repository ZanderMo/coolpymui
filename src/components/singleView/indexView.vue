<template>
    <div id="page">
        <transition>
        <router-view></router-view>
        </transition>
        <p><br></p><p><br></p>
        <div class="nav-bottom">
            <ul class="nav navbar-fixed-bottom" role="tablist">
                <li role="presentation" ><router-link to="/index/devices" active-class="active" transition="fade"><span class="glyphicon glyphicon-dashboard"></span> 我的设备</router-link></li>
                <li role="presentation" ><router-link to="/index/manage" active-class="active"><span class="glyphicon glyphicon-th-list"></span> 管理枢纽</router-link></li>
                <li role="presentation" ><router-link to="/index/setting" active-class="active"><span class="glyphicon glyphicon-cog"></span> 设置</router-link></li>
            </ul>
        </div>
    </div>
</template>

<style lang="less">
    #page {
        margin: 0px;
        padding: 0px;
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
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }
    
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active in <2.1.8 */
    
    {
        opacity: 0
    }
</style>