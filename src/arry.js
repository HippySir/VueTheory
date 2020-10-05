import {def,observe} from "./Observe";

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto);

[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function(method){
    const orignal = arrayProto[method]
    def(arrayMethods, method, function mutator(...args){
        const result = orignal.apply(this,args)
        let ob = this.__ob__
        let insert 
        switch (method) {
            case 'push':
            case 'unshift':
                insert = args
                break;
            case 'splice':
                insert = args.slice(2)
                break
        }
        if(insert) observe(insert)//新增
        ob.dep.notify()
        return result
    })
})