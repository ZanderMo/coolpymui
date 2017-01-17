<template>
    <div class="devices-box container"> 
            <div class="panel panel-default col-xs-12 col-sm-5" v-for="Device in Devices">
              <div class="panel-heading" role="tab" :id="'Device'+Device.Id">
                <h4 class="panel-title">
                  <a class="collapsed" data-toggle="collapse" data-parent="#accordion" :href="'#DeviceID'+Device.Id" aria-expanded="true" :aria-controls="'DeviceID'+Device.Id">
                    <span class="glyphicon glyphicon-magnet" ></span> ID:{{Device.Id}}  {{Device.Title}}
                  </a>
                  <button class="btn btn-success" style="float:right;margin-top: -6px;padding:4px;" @click="showManageBtn('#mBtn'+Device.Id)">管 理 枢 纽 <span class="glyphicon glyphicon-collapse-down"></span></button>
                </h4>
              </div>
              <div class="hubManage" :id="'mBtn'+Device.Id">
                  <button class="btn btn-info btn-lg" @click="showManageBox('editHub',Device.Id)">修改枢纽</button><button class="btn btn-warning btn-lg" @click="showManageBox('addDevice',Device.Id)">添加节点</button><button class="btn btn-danger btn-lg" @click="showManageBox('delHub',Device.Id)">删除枢纽</button>
              </div>
              <div :id="'DeviceID'+Device.Id" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'Device'+Device.Id">
                <div class="panel-body" >
                  <ul>
                      <li v-for="item in Device.RNodes" >
                            <div v-if="item.Type===1" class="deviceItem"><span style="float:left;">{{item.Title}}:</span>
                                <span style="float:right;"><input type="checkbox" data-on-color="info" data-off-color="warning" id="joinSwitch" ></span>
                                <div style="clear:both;border:none;"></div>
                            </div>
                            <div v-if="item.Type===2" class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">{{item.Title}}:</span>
                                    <input type="text" class="form-control" placeholder="填写指令!">
                                    <span class="input-group-addon" style="padding:0px;"><button style="border: 0;background-color:#f0ad4e;height: 32px;width: 50px;color:#fff">发 送</button></span>
                                 </div>
                                <div v-if="item.Type===3" class="deviceItem">{{item.Title}}: LED-可调灯 当前值：{{item.CtrlerVal}}<input type="range" style="display: block;" :max="item.CtrlerVal.split(',')[2]" :min="item.CtrlerVal.split(',')[1]" :step="item.CtrlerVal.split(',')[3]" :value="item.CtrlerVal.split(',')[0]"> </div>
                                <div v-if="item.Type===4" class="deviceItem">{{item.Title+' '+item.Type+' '+item.CtrlerVal}}</div>
                                <div v-if="item.Type===5" class="deviceItem">{{item.Title+' '+item.Type+' '+item.CtrlerVal}}</div>
                                <div v-if="item.Type===6" class="deviceItem">{{item.Title+' '+item.Type+' '+item.CtrlerVal}}</div>
                                <div v-if="item.Type===7" class="deviceItem">{{item.Title+' '+item.Type+' '+item.CtrlerVal}}</div>
                      </li>
                  </ul>
                </div>
              </div>
      </div>
            <div class="modal fade" id="devicesMbox">
                <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4 login-box">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title"><span class="glyphicon glyphicon-floppy-open"></span> {{this.manageHubEv.Title}}</h4>
                        </div>
                        <div class="modal-body">
                            {{manageHubEv.massage}} {{manageHubEv.Type}}
                            <div v-if="this.manageHubEv.Type=='editHub'||this.manageHubEv.Type=='ddHub'">
                                <div  class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">枢纽ID:</span>
                                    <input type="text" class="form-control" placeholder="" disabled>
                                 </div>
                                 <div  class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">枢纽名称:</span>
                                    <input type="text" class="form-control" placeholder="填写枢纽名称!" :value="manageHubEv.Type">
                                 </div>
                                 <div  class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">枢纽标签:</span>
                                    <input type="text" class="form-control" placeholder="填写枢纽标签!">
                                 </div>
                                 <div  class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">枢纽描述:</span>
                                    <input type="text" class="form-control" placeholder="填写枢纽描述!">
                                 </div>
                            </div>
                            <div v-if="this.manageHubEv.Type=='addDevice'">

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary" @click="manageHub(manageHubEv.Type)">提 交</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
            <div class="addHub-box">
                <a><h4 class="addHub-font"><span class="glyphicon glyphicon-cloud-upload"></span> 添加枢纽</h4>
                <div class="addHub-btn"><span class="glyphicon glyphicon-plus"></span></div>
                </a>
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
                manageHubEv: {
                    HubID: '',
                    Type: '',
                    massage: '',
                    Title: '',

                }
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
                        //alert(result.data.title);
                        self.Devices = result.data;
                    },

                    error: function(err) {
                        //error 和.ajax()的.fail()二选一，都是处理请求失败后的回调
                        alert(err.responseText)
                    }
                });
            },
            showManageBtn: function(bnt) {
                $(bnt).toggle(100);
            },
            showManageBox: function(type, id) {
                this.manageHubEv.HubID = id;
                this.manageHubEv.Type = type;
                if (this.manageHubEv.Type == 'delHub') {
                    this.manageHubEv.Title = '删除枢纽!';
                    this.manageHubEv.massage = '你确认要删除ID为：' + this.manageHubEv.HubID + '的枢纽吗？ 请谨慎，此操作将会把选中枢纽相关的节点、数据结点全部删除!';
                } else if (this.manageHubEv.Type == 'addDevice') {
                    this.manageHubEv.Title = '添加控制节点！';
                    this.manageHubEv.massage = '';
                } else if (this.manageHubEv.Type == 'editHub') {
                    this.manageHubEv.Title = '编辑枢纽!';
                    this.manageHubEv.massage = '';
                } else if (this.manageHubEv.Type == 'addHub') {
                    this.manageHubEv.Title = '添加枢纽!';
                    this.manageHubEv.massage = '';
                }
                $('#devicesMbox').modal('show')
            },
            manageHub: function(type) {
                this.identity = sessionStorage.getItem('identity');
                let self = this;
                if (type == 'delHub') { //删除枢纽
                    $.ajax({
                        url: window.API_URL + '/api/hub/' + self.manageHubEv.HubID,
                        dataType: 'json',
                        type: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + self.identity
                        },
                        success: function(result) {
                            //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                            if (result.ok == 1) {
                                alert("删除成功!");
                            } else {
                                alert("提交错误");
                            }
                            self.getDevices();
                        },
                        error: function(err) {
                            alert("请求出错！")
                        }
                    })
                } else if (type == 'editHub') { //修改枢纽

                } else if (type == 'addDevice') { //添加枢纽中的控制节点！

                }
                $('#devicesMbox').modal('hide');
                $('.hubManage').hide();
            }
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
        .panel {
            box-shadow: 0px 2px 7px #cdcdcd;
            padding: 1px;
            margin-right: 8%;
            .panel-collapse {
                .panel-body {
                    padding: 5px;
                    ul {
                        li {
                            list-style: none;
                            .deviceItem {
                                border: 1px solid #dedede;
                                margin-bottom: 4px;
                                line-height: 35px;
                                padding: 3px;
                            }
                        }
                    }
                }
            }
            .hubManage {
                margin: 2px;
                display: none;
                button {
                    width: 33.3%;
                    padding: 3px;
                }
            }
        }
        .addHub-box {
            position: fixed;
            bottom: 50px;
            right: 5px;
            line-height: 40px;
            .addHub-font {
                display: inline-block;
            }
            .addHub-btn {
                text-align: center;
                line-height: 35px;
                font-size: 20px;
                margin-left: 5px;
                border: 1px solid #dedede;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                float: right;
                display: inline-block;
                box-shadow: -1px -3px 7px #999 inset;
            }
        }
    }
</style>