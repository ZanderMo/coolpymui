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
                    <input type="text" class="form-control" placeholder="请输入用户名!">
                </div>
                <div class="input-group input-group-lg" style="margin-top:5px;">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                    <input type="password" class="form-control" placeholder="请输入密码！">
                    <span class="input-group-addon">查看</span>
                </div>
             </div>
      </div>
      <div class="modal-footer">
        <div  class="btn btn-default">自动登陆</div>
<input type="checkbox" data-on-color="info" data-off-color="warning">

        <button type="button" class="btn btn-primary login-bnt">登 陆</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</template>

<script>
    export default {
        name: 'LoginView',
        data() {
            return {

            }

        },
        mounted() {
            $(function(argument) {
                $('[type="checkbox"]').bootstrapSwitch();
            })
        }
    }
</script>
<style lang="less">
    .login-box {
        margin-top: 4em;
        .modal-content {
            .modal-footer {
                .login-bnt {
                    margin-left: 3em;
                    width: 6em;
                }
            }
        }
    }
</style>