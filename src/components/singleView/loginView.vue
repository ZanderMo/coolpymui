<template>
<div class="modal show">
    <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4 login-box">
        <div class="modal-content">
        <div class="modal-header">
            <img src="../../assets/images/logo.png" style="height:30px;width:auto;"><h4 class="modal-title" style="display:inline;">酷痞物联</h4>
        </div>
        <div class="modal-body">
            <div class="">
                    <div class="input-group input-group-lg">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                        <input type="text" class="form-control" v-model="userName" placeholder="请输入用户名!">
                    </div>
                    <div class="input-group input-group-lg" style="margin-top:5px;">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                        <input type="password" class="form-control" v-model="passWord" placeholder="请输入密码！">
                        <span class="input-group-addon">查看</span>
                    </div>
                </div>
        </div>
        <div class="modal-footer">
            <div  class="autoJoin">自动登陆:
            <input type="checkbox" data-on-color="info" data-off-color="warning" id="joinSwitch"></div>
            <button type="button" class="btn btn-primary login-bnt" @click="login">登 陆</button>
        </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</template>

<script>
    import Base64 from 'js-base64'

    export default {
        name: 'LoginView',
        data() {
            return {
                identity: '',
                userName: '',
                passWord: '',
                onJoinSwitch: false,
            }

        },
        methods: {
            login() {
                this.identity = Base64.Base64.encode(this.userName + ':' + this.passWord);
                let self = this;
                $.ajax({
                    url: window.API_URL + '/api/user/' + this.userName,
                    type: 'GET',
                    beforeSend: function(xhr) {
                        //在发送请求之前调用，并且传入一个 XMLHttpRequest 作为参数。
                        //xhr.setRequestHeader("U-ApiKey", "key-value"),
                        //xhr.setRequestHeader("Content-Type", "application/octet-stream")
                        xhr.setRequestHeader('Authorization', 'Basic ' + self.identity)
                    },

                    complete: function(XHR, TS) {},

                    success: function(result) {
                        //success 和.ajax()的.done()二选一，都是处理成功后的回调。
                        //alert(result.data.Uid);
                        sessionStorage.setItem('identity', self.identity);
                        self.$router.push({
                            path: '/index'
                        });
                    },

                    error: function(err) {
                        //error 和.ajax()的.fail()二选一，都是处理请求失败后的回调
                        if (err.statusText == 'Unauthorized') {
                            alert("用户密码错误！")
                        } else if (err.statusText == 'error') {
                            alert("登陆失败！")
                        }

                    }
                })
            }
        },
        mounted() {
            var self = this;
            $('[type="checkbox"]').bootstrapSwitch();
            $('#joinSwitch').on('switchChange.bootstrapSwitch', function(event, state) {
                console.log(this); // DOM element
                console.log(event); // jQuery event
                console.log(state); // true | false
                self.onJoinSwitch = state;
            });

        }
    }
</script>
<style lang="less">
    .modal {
        /*background-image: url('../../assets/images/wallpaper1_1_h800.jpg');*/
        background-color: rgba(204, 204, 204, 0.7);
        .login-box {
            margin-top: 4em;
            .modal-content {
                .modal-footer {
                    .login-bnt {
                        margin-left: 1em;
                        width: 5em;
                        font-size: 16px;
                    }
                    .autoJoin {
                        border: 1px solid #dedede;
                        display: inline-block;
                        border-radius: 5px;
                        padding: 4px;
                    }
                }
            }
        }
    }
</style>