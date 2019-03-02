<template>
    <el-form :label-position="labelPosition" label-width="68px" :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
            <el-form-item label="账号" prop="userName">
                <el-input type="text" v-model="ruleForm2.userName" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code" :inline="true">
                <el-input type="text" v-model="ruleForm2.code" auto-complete="off" placeholder="请输入验证码" style="width:50%; diaplay:inline-block" ></el-input>
                <img :src="validateCode" alt="点击重新获取验证码" class="validateCode" @click='sendCode()'>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            </el-form-item>
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
  </el-form>
</template>

<script>
// 获取登录接口
import { getValidatecode, login, getMenus } from '../api/login';
import { setRouter } from '../router/setRouter'
export default {
    data() {
        return {
            logining: false,
            validateCode: '',
            codeTime: 60,
            Timer: null,
            isDisabled: false,
            labelPosition: 'right',
            ruleForm2: {
                userName: 'admin',
                password: '',
                code:''
            },
            rules2: {
            userName: [
                { 
                    required: true, 
                    message: '请输入账号',
                    trigger: 'blur' 
                },
                //{ validator: validaePass }
            ],
            password: [
                { 
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                },
                //{ validator: validaePass2 }
            ],
            code: [
                {
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }
            ]
            },
            checked: true
        };
    },
    methods: {
        handleReset2() {
            this.$refs['ruleForm2'].resetFields();
        },
        // 发送验证码
        sendCode() {
            let _this = this;
            getValidatecode(_this);
        },
        // 处理登录
        handleSubmit2(ev) {
            let _this = this;
            _this.$refs.ruleForm2.validate((valid) => {
                // 如果都是正确
                if (valid) {
                    _this.logining = true;
                    // 调用登录接口
                    login(_this, {
                        userName: _this.ruleForm2.userName,
                        password: _this.ruleForm2.password,
                        validateCode: _this.ruleForm2.code
                    }).then((res) => {
                        if (!res.data.meta.success) {
                            // 提示错误信息
                            _this.$message({
                                message: res.data.meta.message,
                                type: 'warning'
                            })
                            _this.logining = false;
                            getValidatecode(_this);
                        } else {
                            // 告知成功信息
                            _this.$message({
                                message: res.data.meta.message,
                                type: 'success'
                            })
                            clearInterval(_this.Timer)
                            // 设置token值。
                            _this.$store.dispatch('login', res.data.data.token);
                            _this.$ajax.defaults.headers.common["X-SDX-Token"] = _this.$store.state.userToken;
                            // 获取菜单
                            getMenus(_this).then((res) => {
                                console.log(res);
                                let rows = res.data.data.rows
                                // 将目录存到Vuex中去
                                _this.$store.dispatch('getMenus', rows);
                                setRouter(_this, _this.$store.state.permissionList)
                            }).catch((err) => {
                                console.log(err)  
                            })
                            _this.$router.push('/');
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            });
        },
    },
    mounted() {
        let _this = this;
        // 获取验证码
        getValidatecode(_this);
        // 60秒自动刷新
        _this.Timer = setInterval( () => {
            _this.codeTime--
            if ( _this.codeTime === 0 ) {
                _this.codeTime = 60
                getValidatecode(_this)
            }
        }, 1000)
    }
}
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    overflow: hidden;
    padding: 35px 35px 30px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 0px 0px;
    }
  }
  .validateCode {
        width:45%; 
        vertical-align: middle;
        cursor: pointer;
  }
</style>