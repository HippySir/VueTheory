
import {isObject} from './Observe'

const seenObjects = new Set();

export function traverse (val) {
    _traverse(val,seenObjects);
    seenObjects.clear();
}

function _traverse (val,seen) {
    let i, keys
    const isA = Array.isArray(val)
    if((!isA && !isObject(val)) || Object.isFrozen(val)){//如果是被冻结的对象的属性或者不是数组对象则退出执行
        return
    }

    if(val.__ob__){
        const depId = val.__ob__.dep.id;
        if(seen.has(depId)){
            return
        }
        seen.add(depId)
    }
    if(isA){
        i = val.length;
        while(i--) _traverse(val[i], seen)
    }else{
        keys = Object.keys(val)
        i = keys.length
        while(i--) _traverse(val[keys[i]],seen)
    }
}