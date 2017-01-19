<template>
    <div class="num-box">
        <div class="nav">
            <h4>ID:{{$route.query.node.Id}} 名称:{{$route.query.node.Title}} </h4>
        <router-link :to="{path:'/index/devices'}"><button class="btn btn-danger closeBtn">关 闭</button></router-link>
        </div>
        <div>
        <ul><li>节点标签:</li><li v-for="tag in $route.query.node.Tags">{{tag}}</li></ul>
        <div style="clear:both"></div>
        </div>
        <div>选择开始时间：<input type="datetime" name="user_date"  id="stTime" v-model="stTime"/></div>
        <div>选择结束时间：<input type="datetime" name="user_date"  id="endTime" v-model="endTime"/></div>
        <div  class="input-group">
            <span class="input-group-addon">数据量级:</span>
            <input type="text" class="form-control" placeholder="填写图表数量间距"  style="width:90%;">
        </div>
        <button class="btn btn-info" style="float:left;">查询数据</button>
    
        <div id="numChart-box"><h3>节点在所选时间段没有数据</h3></div>
    </div>

</template>

<script>
    import echarts from '../../assets/js/echarts.min.js'

    export default {
        name: 'charts',
        data() {
            return {
                numData: [],
                ApiKey: '',
                stTime: '2017-01-13T16:13:14Z',
                endTime: '2017-01-20T16:13:14Z',

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
                                /*alert("添加成功!");*/
                                self.numData = result.data;
                                let numChart = echarts.init(self.$el.children['numChart-box']);
                                numChart.setOption({
                                    title: {
                                        text: '所选时间段的数值',
                                    },
                                    tooltip: {
                                        trigger: 'axis'
                                    },
                                    legend: {
                                        data: ['数值']
                                    },
                                    toolbox: {
                                        feature: {
                                            saveAsImage: {}
                                        }
                                    },
                                    grid: {
                                        left: '3%',
                                        right: '4%',
                                        bottom: '3%',
                                        containLabel: true
                                    },
                                    xAxis: [{
                                        type: 'category',
                                        boundaryGap: false,
                                        axisTick: [{
                                            interval: 0
                                        }],
                                        data: result.data.map((Value) => Value.TimeStamp.substring(0, 19).replace('T', '\n'))
                                    }],
                                    yAxis: [{
                                        type: 'value'
                                    }],
                                    series: [{
                                        name: '值：',
                                        type: 'line',
                                        stack: '总量',
                                        areaStyle: {
                                            normal: {}
                                        },
                                        data: result.data.map((Value) => Value.Value)
                                    }]
                                });
                            } else {
                                //alert("提交错误");
                            }
                        },
                        error: function(err) {
                            alert("请求出错！")
                        }
                    })
                }
            }
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
    .num-box {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 999;
        padding: 60px 5px 5px 5px;
        div {
            margin: 10px 0;
        }
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
        .input-group {
            width: 70%;
            float: left;
            margin: 0;
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
        #numChart-box {
            margin-top: 80px;
            width: 100%;
            height: 200px;
        }
        h3 {
            text-align: center;
        }
    }
</style>