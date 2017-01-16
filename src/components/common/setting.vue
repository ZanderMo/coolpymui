<template>
    <div class="devices-box">
        
            <div class="panel panel-default col-xs-12 col-sm-6" v-for="Device in Devices">
              <div class="panel-heading" role="tab" :id="'Device'+Device.Id">
                <h4 class="panel-title">
                  <a class="collapsed" data-toggle="collapse" data-parent="#accordion" :href="'#DeviceID'+Device.Id" aria-expanded="true" :aria-controls="'DeviceID'+Device.Id">
                    控制点：{{Device.Title}}
                  </a>
                </h4>
              </div>
              <div :id="'DeviceID'+Device.Id" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'Device'+Device.Id">
                <div class="panel-body">
                  <ul>
                      <li v-for="item in Device.RNodes" >
                            <div v-if="item.Type==1"><span style="float:left;">{{item.Title}}:</span>
                                <span style="float:right;"><input type="checkbox" data-on-color="info" data-off-color="warning" id="joinSwitch" ></span>
                                {{item.CtrlerVal}}
                            </div>
                            <div v-if="item.Type==2">{{item.Title}}:<input type="text" :value="item.CtrlerVal"> <button>发送</button></div>
                            <div v-if="item.Type==3">{{item.Title}}: led <input type="range" style="width:50%;display: inline-block;" max="100" min="0" step="5"> 可调灯
                            <div v-if="item.Type==4">{{item.Title+' '+item.Type+' '+item.CtrlerVal}}</div>
                            <div v-if="item.Type==5">{{item.Title+' '+item.Type+' '+item.CtrlerVal}}</div>
                            <div v-if="item.Type==6">{{item.Title+' '+item.Type+' '+item.CtrlerVal}}</div>
                            <div v-if="item.Type==7">{{item.Title+' '+item.Type+' '+item.CtrlerVal}}</div>
                      </li>
                  </ul>
                </div>
              </div>
            
      </div>
    </div>
</template>

<script>
    $('[type="checkbox"]').bootstrapSwitch();
    export default {
        name: 'devices',
        data() {
            return {
                identity: '',
                Devices: [],
            }

        },
        methods: {
            getDevices() {
                this.identity = sessionStorage.getItem('identity');
                let self = this;
                $.ajax({
                    url: window.API_URL + '/api/hubs/all',
                    type: 'GET',
                    //context: document.getElementById('input1'),
                    //这个对象用于设置 Ajax 相关回调函数的上下文。也就是说，让回调函数内 this 指向这个对象（如果不设定这个参数，那么 this 就指向调用本次 AJAX 请求时传递的 options 参数）
                    beforeSend: function(xhr) {
                        //在发送请求之前调用，并且传入一个 XMLHttpRequest 作为参数。
                        //xhr.setRequestHeader("U-ApiKey", "key-value"),
                        //xhr.setRequestHeader("Content-Type", "application/octet-stream")
                        xhr.setRequestHeader('Authorization', 'Basic ' + self.identity)
                    },

                    complete: function(XHR, TS) {
                        //请求完成后回调函数 (请求成功或失败之后均调用)
                        //TS is 'success' or 'error',
                        //XHR包含是否成功信息的对象.返回数据在responseText字符串内，
                        //字符串用JSON.parse转为json对象才能以.形式读取里面对象。
                        //input1.value = JSON.parse(XHR.responseText).data.title;
                    },

                    success: function(result) {
                        //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                        let DATA = result.data;
                        //alert(result.data.title);
                        self.Devices = DATA;
                    },

                    error: function(err) {
                        //error 和.ajax()的.fail()二选一，都是处理请求失败后的回调
                        alert(err.responseText)
                    }
                });
            },
        },
        filters: {
            typeSwitch: function(value) {
                switch (value) {
                    case 1:
                        return "<input type='checkbox' data-on-color='info' data-off-color='warning'>"
                        break;
                }
            }
        },
        mounted() {
            this.getDevices();
            setTimeout(function() {
                $('[type="checkbox"]').bootstrapSwitch()
            }, 200)

        },
        watch() {

        }
    }
</script>

<style lang="less">
    .devices-box {
        clear: both;
        .panel {
            .panel-collapse {
                ul {
                    margin: 0px;
                    padding: 0px;
                    li {
                        list-style: none;
                        border-bottom: 1px solid #dedede;
                        margin-top: 0px;
                    }
                }
            }
        }
    }
</style>