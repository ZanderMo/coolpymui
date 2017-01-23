<template>
    <div class="devices-box">
        <button class="btn btn-info" @click="logout">退出登陆</button>
    </div>
</template>

<script>

    export default {
        name: 'devices',
        data() {
            return {
                identity: '',
                Devices: [],
            }

        },
        methods: {
            logout:function(){
                sessionStorage.removeItem('identity');
                sessionStorage.removeItem('ApiKey');
                this.$router.push({path:'/login'});

            }
        },
        filters: {

        },
        mounted() {


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