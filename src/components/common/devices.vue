<template>
    <div class="devices-box"> 
            <div class="panel panel-default col-xs-12 col-sm-5" v-for="Device in Devices">
              <div class="panel-heading" role="tab" :id="'Device'+Device.Id">
                  <a class="collapsed" data-toggle="collapse" data-parent="#accordion" :href="'#DeviceID'+Device.Id" aria-expanded="true" :aria-controls="'DeviceID'+Device.Id">
                <h4 class="panel-title">
                    <span class="glyphicon glyphicon-magnet" ></span> ID:{{Device.Id}}  {{Device.Title}}
                </h4>
                </a>
                <button class="btn btn-success" style="float:right;padding:4px;z-index: 10;margin-top:-5px;" @click="showManageBtn('#mBtn'+Device.Id)">管 理 枢 纽 <span class="glyphicon glyphicon-collapse-down"></span></button>
              </div>
              <div class="hubManage" :id="'mBtn'+Device.Id">
                  <button class="btn btn-info btn-lg" @click="showManageBox('editHub',Device)">修改枢纽</button><button class="btn btn-warning btn-lg" @click="showManageBox('addDevice',Device)">添加节点</button><button class="btn btn-danger btn-lg" @click="showManageBox('delHub',Device)">删除枢纽</button>
              </div>
              <div :id="'DeviceID'+Device.Id" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'Device'+Device.Id">
                <div class="panel-body" >
                  <ul>
                      <li v-for="item in Device.RNodes" >
                            <div v-if="item.Type===1" class="deviceItem">
                                <span style="float:left;">{{item.Title}}:</span>
                                <span style="float:right;"><input type="checkbox" data-on-color="info" data-off-color="warning" id="joinSwitch" ></span>
                                <div style="clear:both;border:none;"></div>
                            </div>
                            <div v-if="item.Type===2" class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">{{item.Title}}:</span>
                                    <input type="text" class="form-control" placeholder="填写指令!">
                                    <span class="input-group-addon" style="padding:0px;"><button style="border: 0;background-color:#f0ad4e;height: 32px;width: 50px;color:#fff">发 送</button></span>
                                 </div>
                                <div v-if="item.Type===3" class="deviceItem">{{item.Title}}: LED-可调灯 当前值：{{item.CtrlerVal}}<input type="range" style="display: block;" :max="item.CtrlerVal.split(',')[2]" :min="item.CtrlerVal.split(',')[1]" :step="item.CtrlerVal.split(',')[3]" :value="item.CtrlerVal.split(',')[0]"> </div>
                                <div v-if="item.Type===4" class="deviceItem"><img src="../../assets/images/val.png" class="DeviceImg">ID:{{item.Id}} 名称：{{item.Title}} 
                                <router-link :to="{path:'/index/devices/nodeNum',query: {hubID:Device.Id,node:item}}">查看</router-link>
                                </div>
                                <div v-if="item.Type===5" class="deviceItem"><img src="../../assets/images/gps.png" class="DeviceImg">ID:{{item.Id}} 名称：{{item.Title}} 
                                <router-link :to="{path:'/index/devices/nodeGps',query: {hubID:Device.Id,node:item}}">查看</router-link>
                                </div>
                                <div v-if="item.Type===6" class="deviceItem"><img src="../../assets/images/gen.png" class="DeviceImg">ID:{{item.Id}} 名称：{{item.Title}} 
                                <router-link :to="{path:'/index/devices/nodeCustom',query: {hubID:Device.Id,node:item}}">查看</router-link>
                                </div>
                                <div v-if="item.Type===7" class="deviceItem"><img src="../../assets/images/img.png" class="DeviceImg">ID:{{item.Id}} 名称：{{item.Title}} 
                                <router-link :to="{path:'/index/devices/nodeImages',query: {hubID:Device.Id,node:item}}">查看</router-link>
                                </div>
                      </li>
                  </ul>
                </div>
              </div>
      </div>
            <div class="modal fade" id="devicesMbox">
                <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4 modal-box">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title"><span class="glyphicon glyphicon-floppy-open"></span> {{this.manageHubEv.MassageTitle}}</h4>
                        </div>
                        <div class="modal-body">
                            {{manageHubEv.Massage}}
                            <div v-if="this.manageHubEv.Type=='editHub'||this.manageHubEv.Type=='addHub'">
                                <div  class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">枢纽ID:</span>
                                    <input type="text" class="form-control" placeholder="" disabled v-model="manageHubEv.HubID">
                                 </div>
                                 <div  class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">枢纽名称:</span>
                                    <input type="text" class="form-control" placeholder="填写枢纽名称!" v-model="manageHubEv.HubTitle">
                                 </div>
                                 <div  class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">枢纽描述:</span>
                                    <input type="text" class="form-control" placeholder="填写枢纽描述!" v-model="manageHubEv.HubAbout">
                                 </div>
                                 <div  class="input-group" style="margin:3px 0 5px 0">
                                    <span class="input-group-addon">枢纽标签:</span>
                                    <input type="text" class="form-control" placeholder="填写枢纽标签!" id="HubTagInput">
                                    <span class="input-group-addon" @click="addTag" style="cursor:pointer;">添加标签</span>
                                 </div>
                                 <div ><ul><li v-for="(tag,index) in manageHubEv.HubTags">{{tag}}<a @click="deleteTag(index)" id="tag"> X</a></li></ul>
                                 <div style="clear:both"></div>
                                 </div>
                            </div>
                             <div v-if="this.manageHubEv.Type=='addDevice'">
                                 {{manageHubEv.DeviceType}}
                                        <div  class="input-group" style="margin:3px 0 5px 0">
                                            <span class="input-group-addon">节点ID:</span>
                                            <input type="text" class="form-control" placeholder="" disabled v-model="manageHubEv.DeviceID">
                                        </div>
                                        <div  class="input-group" style="margin:3px 0 5px 0">
                                            <span class="input-group-addon">节点名称:</span>
                                            <input type="text" class="form-control" placeholder="填写节点名称!" v-model="manageHubEv.DeviceTitle">
                                        </div>
                                        <div  class="input-group" style="margin:3px 0 5px 0">
                                            <span class="input-group-addon">节点描述:</span>
                                            <input type="text" class="form-control" placeholder="填写节点描述!" v-model="manageHubEv.DeviceAbout">
                                        </div>
                                        <div  class="input-group" style="margin:3px 0 5px 0">
                                            <span class="input-group-addon">节点类型:</span>
                                            <select class="form-control" v-model="manageHubEv.DeviceType">
                                                <option value="1">控制器-开关</option>
                                                <option value="2">控制器-自定义型</option>
                                                <option value="3">控制器-约束型</option>
                                                <option value="4">传感器-数值型</option>
                                                <option value="5">传感器-GPS</option>
                                                <option value="6">传感器-自定义型</option>
                                                <option value="7">传感器-图片</option>
                                            </select>
                                        </div>
                                        <div  class="input-group" style="margin:3px 0 5px 0">
                                            <span class="input-group-addon">节点标签:</span>
                                            <input type="text" class="form-control" placeholder="填写节点标签!" id="DeviceTagInput">
                                            <span class="input-group-addon" @click="addTag" style="cursor:pointer;">添加标签</span>
                                        </div>
                                        <div ><ul><li v-for="(tag,index) in manageHubEv.DeviceTags">{{tag}}<a @click="deleteTag(index)" id="tag"> X</a></li></ul>
                                        <div style="clear:both"></div>
                                        </div>
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
                <a @click="showManageBox('addHub','0')"><h4 class="addHub-font"> 添加枢纽</h4>
                <div class="addHub-btn"><span class="glyphicon glyphicon-plus"></span></div>
                </a>
            </div>
            
                <router-view ></router-view>
           
            
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
                    Massage: '',
                    MassageTitle: '',
                    HubTitle: '',
                    HubTags: [],
                    HubAbout: '',
                    DeviceID: '',
                    DeviceType: '',
                    DeviceTitle: '',
                    DeviceAbout: '',
                    DeviceTags: [],

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
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + self.identity)
                    },

                    success: function(result) {
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
            showManageBox: function(type, dev) {
                this.manageHubEv.HubID = dev.Id;
                this.manageHubEv.Type = type;
                if (this.manageHubEv.Type == 'delHub') {
                    this.manageHubEv.MassageTitle = '删除枢纽!';
                    this.manageHubEv.Massage = '你确认要删除ID为：' + this.manageHubEv.HubID + '的枢纽吗？ 请谨慎，此操作将会把选中枢纽相关的节点、数据结点全部删除!';
                } else if (this.manageHubEv.Type == 'addDevice') {
                    this.manageHubEv.MassageTitle = '添加控制节点！';
                    this.manageHubEv.Massage = '';
                } else if (this.manageHubEv.Type == 'editHub') {
                    this.manageHubEv.HubTitle = dev.Title;
                    this.manageHubEv.HubAbout = dev.About;
                    this.manageHubEv.HubTags = dev.Tags;
                    this.manageHubEv.MassageTitle = '编辑枢纽!';
                    this.manageHubEv.Massage = '';
                } else if (this.manageHubEv.Type == 'addHub') {
                    this.manageHubEv.MassageTitle = '添加枢纽!';
                    this.manageHubEv.Massage = '';
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
                    let hubObj = {
                        Title: self.manageHubEv.HubTitle,
                        About: self.manageHubEv.HubAbout,
                        Tags: self.manageHubEv.HubTags
                    };
                    if (hubObj.Title && hubObj.About) {
                        $.ajax({
                            url: window.API_URL + '/api/hub/' + self.manageHubEv.HubID,
                            dataType: 'json',
                            type: 'put',
                            data: JSON.stringify(hubObj),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic ' + self.identity
                            },
                            success: function(result) {
                                //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                                if (result.ok == 1) {
                                    alert("修改成功!");
                                } else {
                                    alert("提交错误");
                                }
                                self.getDevices();
                            },
                            error: function(err) {
                                alert("请求出错！")
                            }
                        })
                    } else {
                        alert("请填写枢纽名称和描述!");
                        return false;
                    }

                } else if (type == 'addDevice') { //添加枢纽中的控制节点！
                    let DeviceObj = {
                        Title: self.manageHubEv.DeviceTitle,
                        About: self.manageHubEv.DeviceAbout,
                        Tags: self.manageHubEv.DeviceTags,
                        Type: Number(self.manageHubEv.DeviceType)
                    };
                    if (DeviceObj.Title && DeviceObj.About && DeviceObj.Type) {
                        $.ajax({
                            url: window.API_URL + '/api/hub/' + self.manageHubEv.HubID + '/nodes',
                            dataType: 'json',
                            type: 'post',
                            data: JSON.stringify(DeviceObj),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic ' + self.identity
                            },
                            success: function(result) {
                                //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                                if (result.ok == 1) {
                                    alert("添加成功!");
                                } else {
                                    alert("提交错误");
                                }
                                self.getDevices();
                            },
                            error: function(err) {
                                alert("请求出错！")
                            }
                        })
                    } else {
                        alert("请填写 节点名称,节点描述,节点类型!");
                        return false;
                    }
                } else if (type == 'addHub') { //添加枢纽！
                    let hubObj = {
                        Title: self.manageHubEv.HubTitle,
                        About: self.manageHubEv.HubAbout,
                        Tags: self.manageHubEv.HubTags
                    };
                    if (hubObj.Title && hubObj.About) {
                        $.ajax({
                            url: window.API_URL + '/api/hubs',
                            dataType: 'json',
                            type: 'post',
                            data: JSON.stringify(hubObj),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic ' + self.identity
                            },
                            success: function(result) {
                                //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                                if (result.ok == 1) {
                                    alert("添加成功!");
                                } else {
                                    alert("提交错误");
                                }
                                self.getDevices();
                            },
                            error: function(err) {
                                alert("请求出错！")
                            }
                        })
                    } else {
                        alert("请填写枢纽名称和描述!");
                        return false;
                    }

                }
                $('#devicesMbox').modal('hide');
                $('.hubManage').hide();
            },
            addTag: function() {
                if (this.manageHubEv.Type == "addHub" || this.manageHubEv.Type == "editHub") {
                    let value = $('#HubTagInput').val();
                    if ($.trim(value) != "") {
                        this.manageHubEv.HubTags.push($.trim(value));
                        $('#HubTagInput').val('');
                    }
                } else if (this.manageHubEv.Type == "addDevice") {
                    let value = $('#DeviceTagInput').val();
                    if ($.trim(value) != "") {
                        this.manageHubEv.DeviceTags.push($.trim(value));
                        $('#HubTagInput').val('');
                    }
                }
            },
            deleteTag: function(index) {

                if (this.manageHubEv.Type == "addHub" || this.manageHubEv.Type == "editHub") {
                    this.manageHubEv.HubTags.splice(index, 1);
                } else if (this.manageHubEv.Type == "addDevice") {
                    this.manageHubEv.DeviceTags.splice(index, 1);
                }
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
    a:active,
    a:link,
    a:visited {
        text-decoration: none;
    }
    
    .devices-box {
        padding: 10px;
        .panel {
            box-shadow: 0px 1px 5px #cdcdcd;
            padding: 1px;
            margin-right: 5%;
            .panel-title {
                width: 65%;
                height: 100%;
                display: inline-block;
            }
            .panel-collapse {
                .panel-body {
                    padding: 5px;
                    ul {
                        li {
                            list-style: none;
                            border: 0;
                            .deviceItem {
                                border: 1px solid #dedede;
                                margin-bottom: 4px;
                                line-height: 35px;
                                padding: 3px;
                                border-radius: 5px;
                                box-shadow: 0px 0px 7px #dedede inset;
                                .DeviceImg {
                                    height: 35px;
                                    width: auto;
                                }
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
            top: 0px;
            z-index: 10;
            right: 5px;
            line-height: 40px;
            .addHub-font {
                display: inline-block;
                text-shadow: 1px 1px 2px #428bca;
            }
            .addHub-btn {
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                margin-left: 5px;
                border: 1px solid #dedede;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                float: right;
                display: inline-block;
                box-shadow: 0px 0px 7px #ddd inset;
            }
        }
        #devicesMbox {
            margin-top: 40px;
            .modal-box {
                .modal-content {
                    .modal-body {
                        ul {
                            li {
                                list-style: none;
                                float: left;
                                background-color: #dedede;
                                margin-right: 2px;
                                padding: 2px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>