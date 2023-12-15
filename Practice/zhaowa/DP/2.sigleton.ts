export class Singleton {
    static instance: Singleton | null = null;

    prop1 = "value1"
    prop2 = "value2"
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
    }
}