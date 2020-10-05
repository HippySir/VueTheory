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
    Object.defineProperty(arrayMethods,method, {
        value: function mutator (...args) {
            console.log(method)
            return orignal.apply(this, args)
            
        },
        enumerable: false,
        writable: true,
        configurable: true
    })
})