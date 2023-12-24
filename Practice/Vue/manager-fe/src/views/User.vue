<template>
    <div class="query-form">
        <el-form :inline="true" :model="user" class="demo-form-inline">
            <el-form-item label="用户ID">
                <el-input
                    v-model="user.userId"
                    placeholder="用户ID"
                    clearable
                />
            </el-form-item>
            <el-form-item label="用户名">
                <el-input
                    v-model="user.userName"
                    placeholder="用户名"
                    clearable
                />
            </el-form-item>
            <el-form-item label="用户状态">
                <el-select
                    v-model="user.state"
                    placeholder="用户状态"
                    clearable
                >
                    <el-option label="所有" value="0" />
                    <el-option label="在职" value="1" />
                    <el-option label="离职" value="2" />
                    <el-option label="试用期" value="3" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="base-table">
        <div class="action">
            <el-button size="small" type="primary">新增</el-button>
            <el-button size="small" type="danger">批量删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                v-for="item in columns"
                :prop="item.prop"
                :label="item.label"
            ></el-table-column>
            <el-table-column label="操作" width="140">
                <template #default>
                    <el-button size="small" type="primary">编辑</el-button>
                    <el-button size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="query-pager">
        <el-pagination
            layout="prev, pager, next"
            :total="1000"
            class="pager"
        />
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const user = reactive({
    userId: "",
    userName: "",
    state: "",
});

const onSearch = () => {
    console.log("搜索！");
};

const tableData = reactive([
    {
        userId: "123123123",
        userName: "123123123",
        userEmail: "123123123",
        role: "123123123",
        state: "123123123",
        createTime: "123123123",
        lastLoginTime: "123123123",
    },

    {
        userId: "123123123",
        userName: "123123123",
        userEmail: "123123123",
        role: "123123123",
        state: "123123123",
        createTime: "123123123",
        lastLoginTime: "123123123",
    },
]);
// TODO   width="180"
const columns = reactive([
    { label: "用户ID", prop: "userId" },
    { label: "用户名", prop: "userName" },
    { label: "用户邮箱", prop: "userEmail" },
    { label: "用户角色", prop: "role" },
    { label: "用户状态", prop: "state" },
    { label: "注册时间", prop: "createTime" },
    { label: "最后登录时间", prop: "lastLoginTime" },
]);
</script>

<style scoped>
.query-form {
    background-color: #fff;
    padding: 22px 20px 0;
    border-radius: 5px;
}

.base-table {
    border-radius: 5px;
    background-color: #fff;
    margin: 20px 0 20px 0;
}

.action {
    border-radius: 5px 5px 0 0;
    padding: 20px;
    border-bottom: 1px solid #ece8e8;
}

.pager {
    margin-top: 20px;
}
</style>
