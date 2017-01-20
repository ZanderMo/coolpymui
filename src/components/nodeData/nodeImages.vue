<template>
    <transition name="slide">
        <div class="node-box">
            <div class="nav">
                <h4>ID:{{$route.query.node.Id}} 名称:{{$route.query.node.Title}} </h4>
                <router-link :to="{path:'/index/devices'}"><button class="btn btn-danger closeBtn">关 闭</button></router-link>
            </div>
            <div class="nodeAbout">节点描述：{{$route.query.node.About}}</div>
            <ul>
                <li>节点标签:</li>
                <li v-for="tag in $route.query.node.Tags">{{tag}}</li>
            </ul>
            <div style="clear:both"></div>
<div class="nodeDivMargin">选择开始时间：<input type="datetime" name="user_date" id="stTime" v-model="stTime" /></div>
<div class="nodeDivMargin">选择结束时间：<input type="datetime" name="user_date" id="endTime" v-model="endTime" /></div>

<button class="btn btn-info" style="float:left;">查询数据</button>

<div id="allmap"></div>
</div>
</transition>
</template>


<script>

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
            getData: function () {
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
                        success: function (result) {
                            //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                            if (result.ok == 1) {
                                /*alert("添加成功!");*/
                                self.numData = result.data;
                            } else {
                                //alert("提交错误");
                            }
                        },
                        error: function (err) {
                            alert("请求出错！")
                        }
                    })
                }
            },
            showMap: function () {
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(113.123928, 23.014698);
                var point2 = new BMap.Point(113.21925, 22.880842);
                map.centerAndZoom(point, 10);

                var marker = new BMap.Marker(point);
                var marker2 = new BMap.Marker(point2);  // 创建标注
                map.addOverlay(marker);
                map.addOverlay(marker2);              // 将标注添加到地图中
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
                map.addControl(new BMap.NavigationControl());  //增加左上角缩放
                map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT })); //增加左下角标尺
            }
        },
        filters: {

        },
        mounted() {
            this.showMap();
        },
        watch() {

        }
    }
</script>

<style lang="less">
    .node-box {
        #allmap{
            width:100%;
            height:100%;
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