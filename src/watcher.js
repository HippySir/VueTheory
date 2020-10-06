export {traverse} from './Traverse'

export  class Watcher {
    constructor(vm, expOrFn, cb, options){
        this.vm = vm;
        if(options){
            this.deep = !!options.deep
        }else{
            this.deep = false;
        }
        this.deps = [];
        this.depIds = new Set();
        if(typeof expOrFn === "function"){
            this.getter = expOrFn
        }else{
            this.getter = function(){
                return this.value.expOrFn;
            };
        }
       
        this.cb = cb;
        this.value = this.get();
    }

    addDep(dep){
        const id = dep.id
        if(!this.depIds.has(id)){
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }

    /**
     * 从所有的依赖项的Dep列表中将自己移除
     */
    teardown () {
        let i = this.deps.length
        while(i--){
            this.deps[i].removeSub(this)
        }
    }

    get(){
        window.target = this;
        let value = this.getter().call(this.vm,this.vm);
        if(this.deep){
            traverse(value)
        }
        window.target = undefined;
        return value;
    }

    update () {
        const oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue)
    }
}