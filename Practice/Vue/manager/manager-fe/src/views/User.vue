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
            <el-button size="small" type="primary" @click="handleDialog(null)"
                >新增</el-button
            >
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
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleDialog(scope.row)"
                        >编辑</el-button
                    >
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

    <el-dialog
        v-model="dialogFormVisible"
        :title="dialogInfo[dialogType]"
        :close-on-click-modal="false"
    >
        <el-form
            ref="dialogFormRef"
            :model="dialogForm"
            :rules="dialogFormRules"
            label-width="100px"
        >
            <el-form-item label="用户名" prop="userName">
                <el-input
                    v-model="dialogForm.userName"
                    :disabled="dialogType == 'edit'"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="邮箱" prop="userEmail">
                <el-input
                    v-model="dialogForm.userEmail"
                    :disabled="dialogType == 'edit'"
                    autocomplete="off"
                >
                    <template #append>@qq.com</template>
                </el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="dialogForm.mobile" autocomplete="off" />
            </el-form-item>
            <el-form-item label="岗位" prop="job">
                <el-input v-model="dialogForm.job" autocomplete="off" />
            </el-form-item>
            <el-form-item label="状态" prop="state">
                <el-select v-model="dialogForm.state" placeholder="请选择状态">
                    <el-option label="在职" :value="1" />
                    <el-option label="离职" :value="2" />
                    <el-option label="试用期" :value="3" />
                </el-select>
            </el-form-item>
            <el-form-item label="系统角色" prop="roleList">
                <el-select
                    v-model="dialogForm.roleList"
                    placeholder="请选择系统角色"
                    multiple
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in dialogRolesList"
                        :key="item._id"
                        :label="item.roleName"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门" prop="deptId">
                <el-cascader
                    v-model="dialogForm.deptId"
                    :options="dialogDept.options"
                    :props="dialogDept.props"
                    style="width: 100%"
                    placeholder="请选择部门"
                    @change="handleDeptChange"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleDialogSubmit(dialogFormRef)"
                >
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, toRaw } from "vue";
import { ElMessage } from "element-plus";
import _ from "lodash";

import {
    usersList,
    usersDelete,
    rolesList,
    deptList,
    userOperate,
} from "../api/index";
const user = reactive({
    userId: "",
    userName: "",
    state: 1,
});
const ruleFormRef = ref();
const tableData = ref([]);
const pager = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
});
const chooseRows = ref([]);
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
        width: 120,
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
        userIds = data;
        ``;
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

// #region 编辑和新增功能 START
let dialogForm = reactive({
    state: 3,
});
let dialogFormVisible = ref(false);
const dialogFormRules = ref({
    userName: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 1, max: 5, message: "用户名1-5个字符", trigger: "blur" },
    ],
    userEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
    mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { pattern: /1\d{10}/, message: "手机号格式不正确", trigger: "blur" },
    ],
    roleList: [{ required: true, message: "请选择系统角色", trigger: "blur" }],
    deptId: [{ required: true, message: "请选择部门", trigger: "blur" }],
});
const dialogFormRef = ref();
const dialogInfo = {
    edit: "用户编辑",
    create: "用户新增",
};
const dialogType = ref("create");
const dialogDept = reactive({
    props: {
        expandTrigger: "hover",
        label: "deptName",
        value: "_id",
    },
    options: [],
});
const dialogRolesList = reactive([]);

async function handleDialog(row) {
    dialogFormVisible.value = true;
    handleDialogReset();
    await getRolesList();
    await getDeptList();
    if (row) {
        Object.assign(dialogForm, row);
        dialogType.value = "edit";
    } else {
        dialogType.value = "create";
    }
}

/**
 * 重置dialog弹框中的Form
 */
function handleDialogReset() {
    handleReset(dialogFormRef.value);
}
async function handleDialogSubmit(elForm) {
    if (!elForm) return;
    elForm.validate(async (valid) => {
        if (valid) {
            const params = toRaw(dialogForm);
            params.userEmail += "@qq.com";
            params.action = dialogType.value;
            const { code, data } = await userOperate(params);
            if (code == 200) {
                dialogFormVisible.value = false;
                ElMessage.success(`${dialogInfo[dialogType.value]}成功！`);
                getUsersList();
            } else {
                ElMessage.error(data);
            }
        }
    });
}
function handleDeptChange(value) {
    console.log(value);
}
async function getRolesList() {
    if (Object.keys(dialogRolesList).length == 0) {
        const {
            data: { list },
        } = await rolesList();
        dialogRolesList.push(...list);
    }
}
async function getDeptList() {
    if (Object.keys(dialogDept.options).length == 0) {
        const { data } = await deptList();
        dialogDept.options.push(...data);
    }
}

// #endregion 编辑和新增功能 END

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
