<template>
    <div class="login_wrapper">
        <div class="login_content">
            <div class="login_title">ERP 后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
                <el-form-item prop="userName">
                    <el-input
                        v-model="ruleForm.userName"
                        placeholder="用户名"
                        prefix-icon="UserFilled"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="ruleForm.password"
                        type="password"
                        placeholder="用户密码"
                        prefix-icon="View"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="login_button"
                        @click="submitForm(ruleFormRef)"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { login } from "../api";

const ruleFormRef = ref();
const ruleForm = reactive({
    userName: "",
    password: "",
});
const route = useRouter();
const store = useStore();

const rules = reactive({
    userName: [
        { require: true, message: "用户名不能为空", tirgger: "blur" },
        { min: 3, max: 6, message: "用户名3-6个字符", tirgger: "blur" },
    ],
    password: [
        { require: true, message: "密码不能为空", tirgger: "blur" },
        { min: 6, max: 12, message: "密码6-12个字符", tirgger: "blur" },
    ],
});

const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            login(ruleForm).then(res => {
                store.commit("saveUserInfo", res.data);
                // 登录成功我们直接跳转到 welcome 页面
                route.push("/welcome");
            });
        } else {
            console.log("error submit!", fields);
        }
    });
};
</script>

<style scoped>
.login_wrapper {
    width: 100%;
    height: 100vh;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login_content {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px 3px #999;
}

.login_title {
    font-size: 40px;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 25px;
}

.login_button {
    width: 100%;
}
</style>
