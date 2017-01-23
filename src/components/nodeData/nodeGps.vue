<template>
    <transition name="slide">
        <div class="node-box">
            <div class="nav">
                <h4>ID:{{$route.query.node.Id}} 名称:{{$route.query.node.Title}} </h4>
                <router-link :to="{path:'/devices'}"><button class="btn btn-danger closeBtn">关 闭</button></router-link>
            </div>
            <div class="nodeDivMargin">节点描述：{{$route.query.node.About}}</div>
            <ul class="nodeDivMargin">
                <li>节点标签:</li>
                <li v-for="tag in $route.query.node.Tags">{{tag}}</li>
            </ul>
            <div style="clear:both"></div>
<div class="nodeDivMargin">
    <group>
        <datetime v-model="stTime" format="YYYY-MM-DD HH:mm"  @on-change="" title="开始时间"></datetime>
        <datetime v-model="endTime" format="YYYY-MM-DD HH:mm" @on-change="" title="结束时间"></datetime>
    </group>
</div>
<div class="nodeDivMargin">选择结束时间：<input type="datetime" name="user_date" id="endTime" v-model="endTime" /></div>
<button class="btn btn-info nodeDivMargin" style="float:left;" @click="getData">查询数据</button>
<button class="btn btn-info nodeDivMargin" style="float:left;" @click="replay">回放</button>
<div id="map-box">
    <h3>节点没有GPS数据</h3>
</div>
</div>
</transition>
</template>


<script> 
    import moment from 'moment'
    import { Datetime, Group, XButton } from 'vux'

    export default {
        name: 'charts',
        components: {
            Datetime,
            Group,
            XButton
        },
        data() {
            return {
                numData: [],
                ApiKey: '',
                stTime:moment().format("YYYY-MM-DD 00:00"),
                endTime: moment().format("YYYY-MM-DD HH:mm"),
            }

        },
        methods: {
            getData: function () {
                let stTime=this.stTime.replace(' ','T')+':00.000Z';
                let endTime=this.endTime.replace(' ','T')+':00.000Z';
                alert(stTime);
                this.ApiKey = sessionStorage.getItem('ApiKey');
                let self = this;
                let map = new BMap.Map("map-box"); // 定义地图
                map.addControl(new BMap.NavigationControl()); //增加左上角缩放
                map.addControl(new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_BOTTOM_LEFT
                })); //增加左下角标尺

                $.ajax({
                    url: window.API_URL + '/api/hub/' + self.$route.query.hubID + '/node/' + self.$route.query.node.Id + '/json?start=' + stTime + '&end=' + endTime + '&interval=0&page=10',
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
                            let startPoint = new BMap.Point(result.data[0].Lng, result.data[0].Lat);
                            map.centerAndZoom(startPoint, 15);
                            for (let i = 0; i < result.data.length; i++) {
                                let val = result.data[i];
                                let point = new BMap.Point(val.Lng, val.Lat);
                                let marker = new BMap.Marker(point);
                                map.addOverlay(marker);
                                //marker.setAnimation(BMAP_ANIMATION_BOUNCE); 跳跳图标
                                var opts = {
                                    width: 160,     // 信息窗口宽度
                                    height: 80,     // 信息窗口高度
                                }
                                let infoWindow = new BMap.InfoWindow("时间：" + val.TimeStamp.substring(0, 19).replace('T', ' ') + "<br/> 位置：" + val.Lng + "," + val.Lat + "<br/> 速度：" + val.Speed + "<br/> 修正：" + val.Offset, opts);
                                marker.addEventListener("click", function () {
                                    map.openInfoWindow(infoWindow, point); //开启信息窗口
                                });

                            }

                        } else {
                            alert(result.err);
                        }
                    },
                    error: function (err) {
                        alert("请求出错！")
                    }
                })

            },
            replay: function () {
                let stTime=mountthis.stTime.replace(' ','T')+':00.000Z';
                let endTime=this.endTime.replace(' ','T')+':00.000Z';
                this.ApiKey = sessionStorage.getItem('ApiKey');
                let self = this;
                let map = new BMap.Map("map-box"); // 定义地图
                map.addControl(new BMap.NavigationControl()); //增加左上角缩放
                map.addControl(new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_BOTTOM_LEFT
                })); //增加左下角标尺
                let arrPois = [], arrshus = [], lushu;
                $.ajax({
                    url: window.API_URL + '/api/hub/' + self.$route.query.hubID + '/node/' + self.$route.query.node.Id + '/json?start=' + stTime + '&end=' + endTime + '&interval=0&page=10',
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
                            let startPoint = new BMap.Point(result.data[0].Lng, result.data[0].Lat);
                            map.centerAndZoom(startPoint, 15);
                            for (let i = 0; i < result.data.length; i++) {
                                let val = result.data[i];
                                let point = new BMap.Point(val.Lng, val.Lat);
                                let marker = new BMap.Marker(point);
                                arrPois.push(point);
                                arrshus.push({ lng: val.Lng, lat: val.Lat, pauseTime: 2 });
                                map.addOverlay(marker);
                                //marker.setAnimation(BMAP_ANIMATION_BOUNCE); 跳跳图标
                                var opts = {
                                    width: 160,     // 信息窗口宽度
                                    height: 80,     // 信息窗口高度
                                }
                                let infoWindow = new BMap.InfoWindow("时间：" + val.TimeStamp.substring(0, 19).replace('T', ' ') + "<br/> 位置：" + val.Lng + "," + val.Lat + "<br/> 速度：" + val.Speed + "<br/> 修正：" + val.Offset, opts);
                                marker.addEventListener("click", function () {
                                    map.openInfoWindow(infoWindow, point); //开启信息窗口
                                });
                            }
                            map.addOverlay(new BMap.Polyline(arrPois, { strokeColor: '#35b' }));
                            map.setViewport(arrPois);
                            lushu = new BMapLib.LuShu(map, arrPois, {
                                defaultContent: '',
                                autoView: true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                                icon: new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(57, 32), { anchor: new BMap.Size(27, 16) }),
                                speed: 1500,
                                enableRotation: true,//是否设置marker随着道路的走向进行旋转
                                landmarkPois: arrshus
                            });
                            setTimeout(function () { lushu.start() }, 3000);

                        } else {
                            alert(result.err);
                        }
                    },
                    error: function (err) {
                        alert("请求出错！")
                    }
                })

            }
        },
        filters: {

        },
        mounted() {

           // this.getData();
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
            padding: 0px;
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
        h3 {
            text-align: center;
        }
        #map-box {
            width: 98%;
            height: 75%;
            margin:0 auto;
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
        opacity: 0.7;
        transform: translateX(-100%);
    }
</style>