import {Dep} from "./dep";
import { arrayMethods } from "./arry";
import  {Watcher} from "./watcher"

//__proto__是否可用
const hasProto = '__proto__';
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export  class Observe {
    constructor(value){
        this.value = value;
        this.dep = new Dep();
        def(value, '__ob__', this)
        
        if(!Array.isArray(value)){
            this.walk(value);
        }else{
            
            const augment = hasProto ? protoAugment : copyAugment
            augment(value, arrayMethods, arrayKeys);
            this.observeArray(value)
        }
    }

    observeArray(items){
        for(let i = 0, l = items.length; i < l; i++){
            observe(items[i])
        }
    }

    walk (obj) {
        const keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++){
            defreactive(obj, keys[i], obj[keys[i]])
        }
    }

    //vue中的$watch API
    $watch(expOrFn, cb, options){
        const vm = this
        options = options || {}
        const watcher = new Watcher(vm, expOrFn, cb, options)
        if(options.imediate){
            cb.call(this,watcher.value);//以当前的值执行函数
        }
        return function unwatchFn(){//返回一个函数 取消对当前的观察
            watcher.teardown();
        }
    }

    //给队形设置动态属性
    $set(target, key,  value) {
        //首先对是数组的情况进行处理
        if(Array.isArray(target) && isVailArrayIndex(key)){
            target.length = Math.max(target.length, key + 1)
            target.splice(key, 1, value);
            return value;
        }
        //如果需要处理的key已经存在target中
        if(key in target && !(key in Object.prototype)){
            target[key] = value;
        }
        //新增
        const ob = target.__ob__
        if(target._isVue || (ob && ob.vmCount)){
            process.env.NODE_ENV !== 'production' && warn("This is do not allow");
            return val
        }
        if(!ob){//如果传入的对象不是相应式的数据  那么对于传入的对象不需要额外的处理
            target[key] = val;
            return val;
        }
        defreactive(ob.value, key, val)
        ob.dep.notify();
        return val;
    }


}


function defreactive (object, key, value) {
    
    let childOb = observe(value);
    let dep = new Dep();
    Object.defineProperty(object, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            dep.depend();
            return value;
        },
        set: function(newval) {
            if(value === newval) {
                return;
            }
            value = newval;
            dep.notify();
        }
    })
}

//判断所传入的的值在数组中是否为一个有效的索引
function isVailArrayIndex(key){
    if(Math.floor(key) === key){
        return true
    }else{
        return false
    }
}

function protoAugment (target, src, keys) {
    
    target.__proto__ = src;
}

function copyAugment (target, src, keys) {
    for(let i = 0, l = keys.length; i < l; i++){
        const key = keys[i];
        def(target, key, src[key])
    }
}

export function def (obj, key, val, enumerable) {
    if(typeof obj !== 'object'){
        return
    }
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

export function observe (value, asRootData) {
    if(typeof value !== "object"){
        return
    }
    let ob
    if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observe){
        ob = value.__ob__
    }else{
        ob = new Observe(value)
    }
    return ob
}

export function isObject (value) {
    return Object.prototype.toString.call(value) === "[object Object]"
}

function hasOwn (obj, key) {
    return obj.hasOwnProperty(key)
}

