<template>
        <transition name="slide">
    <div class="node-box">
        <div class="nav">
            <h4>ID:{{$route.query.node.Id}} 名称:{{$route.query.node.Title}} </h4>
        <router-link :to="{path:'/devices'}"><button class="btn btn-danger closeBtn">关 闭</button></router-link>
        </div>
        <div class="nodeDivMargin">节点描述：{{$route.query.node.About}}</div>
        <ul class="nodeDivMargin"><li>节点标签:</li><li v-for="tag in $route.query.node.Tags">{{tag}}</li></ul>
        <div style="clear:both"></div>
        <div class="nodeDivMargin">选择开始时间：<input type="datetime" name="user_date"  id="stTime" v-model="stTime"/></div>
        <div>选择结束时间：<input type="datetime" name="user_date"  id="endTime" v-model="endTime"/></div>
        <button class="btn btn-info" style="float:left;" @click="getData">查询数据</button>
    
        <div id="custom-box">
            <h3 v-if="!nodeData">节点在所选时间段没有数据</h3>
        <ul>
        <li v-for="data in nodeData">
            时间:{{data.TimeStamp.substring(0,19).replace('T',' ')}} 数量:{{data.Value}}</li>
        </ul>
        </div>
    </div>
</transition>
</template>


<script>
    export default {
        name: 'charts',
        data() {
            return {
                nodeData: [],
                ApiKey: '',
                stTime: '2017-01-13T16:13:14Z',
                endTime: '2017-01-16T16:13:14Z',

            }

        },
        methods: {
            getData: function() {
                this.ApiKey = sessionStorage.getItem('ApiKey');
                let self = this;
                if (true) {
                    $.ajax({
                        url: window.API_URL + '/api/hub/' + self.$route.query.hubID + '/node/' + self.$route.query.node.Id + '/json?start=' + self.stTime + '&end=' + self.endTime + '&interval=0&page=10',
                        dataType: 'json',
                        type: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'U-ApiKey': self.ApiKey
                        },
                        success: function(result) {
                            //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                            if (result.ok == 1) {
                                self.nodeData = result.data;

                            } else {
                                alert(result.err);
                                self.nodeData = result.data;
                            }
                        },
                        error: function(err) {
                            alert("请求出错！")
                        }
                    })
                }
            },
        },
        filters: {

        },
        mounted() {
            this.getData();
        },
        watch() {

        }
    }
</script>

<style lang="less">
    .node-box {

        ul {
            margin-left: 0px;
            float: left;
            li {
                float: left;
                margin: 0px 2px 10px 0px;
                background-color: #dedede;
                padding: 5px;
                list-style: none;
            }
        }
        .nav {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            margin-top: 0px;
            border-bottom: 1px solid #ddd;
            background-color: #f5f5f5;
            box-shadow: 0px 0px 7px #ccc;
            padding: 5px 20px;
            h4 {
                display: inline-block;
            }
            .closeBtn {
                float: right;
            }
        }
        #custom-box {
            margin-top: 80px;
            width: 100%;
            height: 200px;
        }
        h3 {
            text-align: center;
        }
    }
    
    .slide-enter-active,
    .slide-leave-active {
        transition: all .5s;
    }
    
    .slide-enter,
    .slide-leave-to
    /* .component-fade-leave-active for <2.1.8 */
    
    {
        opacity: 0.6;
        transform: translateX(-100%);
    }
</style>