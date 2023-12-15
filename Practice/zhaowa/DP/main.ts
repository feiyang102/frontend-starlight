// 2、单例模式
import { Singleton } from './2.sigleton';
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2);


