<template>
    <div id="page">
        <div class="login-header clearfix">
            <img class="login-header-logo" />
            <span class="glyphicon glyphicon-chevron-left"></span>
            <slot>此处为面包屑导航内容</slot>
        </div>
        <router-view></router-view>
        
        <div class="nav-bottom">
            <ul class="nav navbar-fixed-bottom" role="tablist">
                <li role="presentation" class="active"><a href="#"><span class="glyphicon glyphicon-dashboard"></span> 控制台</a></li>
                <li role="presentation" class="active"><a href="#"><span class="glyphicon glyphicon-th-list"></span> 中心管理</a></li>
                <li role="presentation" class="active"><a href="#"><span class="glyphicon glyphicon-cog"></span> 设置</a></li>
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
                background-color: rgb(204, 204, 204);
                li {
                    float: left;
                }
            }
        }
    }
</style>