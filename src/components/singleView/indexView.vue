<template>
    <div id="page">
        <div class="login-header ">
            <img class="login-header-logo" />
            <span class="glyphicon glyphicon-chevron-left"></span>
            <slot>此处为面包屑导航内容</slot>
        </div>
        
        <router-view></router-view>
        <p><br></p><p><br></p>
        <div class="nav-bottom">
            <ul class="nav navbar-fixed-bottom" role="tablist">
                <li role="presentation" ><router-link to="/index/devices" active-class="active"><span class="glyphicon glyphicon-dashboard"></span> 我的设备</router-link></li>
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
                background-color: rgba(204, 204, 204, 0.5);
                li {
                    float: left;
                    width: 33%;
                    text-align: center;
                    font-size: 16px;
                }
                .active {
                    background-color: rgba(204, 204, 204, 0.8);
                }
            }
        }
    }
</style>