import {Dep} from "./dep";
import { arrayMethods } from "./arry";

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

function isObject (value) {
    return Object.prototype.toString.call(value) === "[object Object]"
}

function hasOwn (obj, key) {
    return obj.hasOwnProperty(key)
}