<template>
    <div class="modal fade" id="devicesMbox">
        <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4 modal-box">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title"><span class="glyphicon glyphicon-floppy-open"></span> {{$route.query.hub.MassageTitle}}</h4>
                </div>
                <div class="modal-body">
                    {{$route.query.hub.Massage}}

                    <div class="input-group" style="margin:3px 0 5px 0">
<span class="input-group-addon">枢纽ID:</span>
<input type="text" class="form-control" placeholder="" disabled v-model="manageHubEv.HubID">
</div>
<div class="input-group" style="margin:3px 0 5px 0">
<span class="input-group-addon">枢纽名称:</span>
<input type="text" class="form-control" placeholder="填写枢纽名称!" v-model="$route.query.manageHubEv.HubTitle">
</div>
<div class="input-group" style="margin:3px 0 5px 0">
<span class="input-group-addon">枢纽描述:</span>
<input type="text" class="form-control" placeholder="填写枢纽描述!" v-model="manageHubEv.HubAbout">
</div>
<div class="input-group" style="margin:3px 0 5px 0">
<span class="input-group-addon">枢纽标签:</span>
<input type="text" class="form-control" placeholder="填写枢纽标签!" id="HubTagInput">
<span class="input-group-addon" @click="addTag" style="cursor:pointer;">添加标签</span>
</div>
<div>
    <ul>
        <li v-for="(tag,index) in manageHubEv.HubTags">{{tag}}<a @click="deleteTag(index)" id="tag"> X</a></li>
    </ul>
    <div style="clear:both"></div>
</div>


</div>
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
    <button type="button" class="btn btn-primary" @click="manageHub(manageHubEv.Type)">提 交</button>
</div>
</div>
<!-- /.modal-content -->
</div>
<!-- /.modal-dialog -->
</div>
<!-- /.modal -->
</template>

<script>
    import { XSwitch, Group } from 'vux'
    export default {
        name: 'devices',
        components: {
            XSwitch,
            Group
        },
        data() {
            return {

            }
        }
    }
</script>