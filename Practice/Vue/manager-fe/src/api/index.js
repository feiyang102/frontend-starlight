/**
 * API管理
 */
import request from "../utils/request";
export function login(data) {
    return request.post("/user/login", data);
}

export function notify() {
    return request.get("/notify/count", true);
}

export function getMenuList() {
    return request.get("/menu/list", true);
}

export function usersList(params) {
    return request.get("/users/list", params, true);
}

export function usersDelete(params) {
    return request.post("/users/delete", params, true);
}

export function rolesList() {
    return request.get("/roles/list", true);
}

export function deptList() {
    return request.get("/dept/list", true); 
}

export function userCreate(params) {
    return request.post("/users/create", params, true);
}