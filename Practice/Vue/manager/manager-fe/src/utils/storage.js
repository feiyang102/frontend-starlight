import config from "../config";

export default {
    setItem(key, value) {
        const storage = this.getStorage();
        storage[key] = value;
        localStorage.setItem(config.nameSpace, JSON.stringify(storage));
    },
    getItem(key) {
        return this.getStorage()[key];
    },
    getStorage() {
        return JSON.parse(localStorage.getItem(config.nameSpace)) || {};
    },
    clearItem(key) {
        const storage = this.getStorage();
        delete storage[key];
        localStorage.setItem(config.nameSpace, JSON.stringify(storage));
    },
    clearAll() {
        localStorage.clear();
    },
};
