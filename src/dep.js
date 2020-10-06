let uid = 0;
export  class Dep {
    constructor () {
        this.id = uid++;
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub)
    }
    removeSub (sub) {
        const index = this.subs.indexOf(sub);
        if(index > -1){
            return this.subs.splice(index,1)
        }
    }
    depend () {
        if(window.target){
            // this.addSub(window.target);
            window.target.addDep(this);
        }
    }
    notify(){
        const subs = this.subs.slice();
        for(let i = 0, l = subs.length; i < l; i++){
            subs[i].update()
        }
    }
}
