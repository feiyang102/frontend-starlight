<template>
    <div class="query-form">
        <el-form
            ref="ruleFormRef"
            :inline="true"
            :model="user"
            class="demo-form-inline"
        >
            <el-form-item label="用户ID" prop="userId">
                <el-input v-model="user.userId" placeholder="用户ID" />
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="user.userName" placeholder="用户名" />
            </el-form-item>
            <el-form-item label="用户状态" prop="state">
                <el-select v-model="user.state" placeholder="用户状态">
                    <el-option label="所有" :value="0" />
                    <el-option label="在职" :value="1" />
                    <el-option label="离职" :value="2" />
                    <el-option label="试用期" :value="3" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button @click="handleReset(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="base-table">
        <div class="action">
            <el-button size="small" type="primary">新增</el-button>
            <el-button size="small" type="danger" @click="handleBatchDelete"
                >批量删除</el-button
            >
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                v-for="item in columns"
                :prop="item.prop"
                :label="item.label"
                :formatter="item.formatter"
                :width="item.width"
            ></el-table-column>
            <el-table-column label="操作" width="140">
                <template #default="scope">
                    <el-button size="small" type="primary">编辑</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row.userId)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="pager.total"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import _ from "lodash";

import { usersList, usersDelete } from "../api/index";
const user = reactive({
    userId: "",
    userName: "",
    state: 0,
});
const ruleFormRef = ref();
const tableData = ref([]);
const pager = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
});
const chooseRows = ref([]);
// TODO   width="180"
const columns = reactive([
    { label: "用户ID", prop: "userId", width: 90 },
    { label: "用户名", prop: "userName", width: 80 },
    { label: "用户邮箱", prop: "userEmail" },
    {
        label: "用户角色",
        prop: "role",
        formatter(row, column, value) {
            return { 1: "系统管理员", 2: "普通用户" }[value];
        },
        width: 80,
    },
    {
        label: "用户状态",
        prop: "state",
        formatter(row, column, value) {
            return { 1: "在职", 2: "离职", 3: "试用期" }[value];
        },
        width: 80,
    },
    {
        label: "注册时间",
        prop: "createTime",
        formatter(row, column, value) {
            let time = new Date(value);
            return time.toLocaleString();
        },
    },
    {
        label: "最后登录时间",
        prop: "lastLoginTime",
        formatter(row, column, value) {
            let time = new Date(value);
            return time.toLocaleString();
        },
    },
]);

/**
 * 获取用户列表
 */
async function getUsersList() {
    let params = { ...user, ...pager };
    const { data } = await usersList(params);
    tableData.value = data.list;
    pager.total = data.page.total;
}

// 查询按钮
function handleQuery() {
    getUsersList();
}
// 重置按钮
function handleReset(formEl) {
    if (!formEl) return;
    formEl.resetFields();
}
// 分页改变
function handleCurrentChange(val) {
    pager.pageNum = val;
    getUsersList();
}
// 删除，支持单个删除也批量删除
async function handleDelete(data) {
    console.log(data);
    let userIds;
    if (data instanceof Array) {
        if (data.length == 0) return;
        userIds = data;``
    } else {
        userIds = [data];
    }
    const res = await usersDelete({
        userIds,
    });

    if (res.code == 200) {
        ElMessage.success({
            // showClose: true,
            message: "删除成功",
        });
        getUsersList();
    } else {
        ElMessage.error({
            message: "删除失败",
        });
    }
}

function handleSelectChange(list) {
    chooseRows.value = list;
}

function handleBatchDelete() {
    const list = chooseRows.value.map((item) => item.userId);
    handleDelete(list);
}

getUsersList();
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

.pagination {
    padding: 14px;
    justify-content: flex-end;
}
</style>
