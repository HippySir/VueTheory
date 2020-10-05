import {Observe} from './Observe'

let a = new Observe({
    a: 1,
    b: 2,
    c: [1,2,3],
    d: {
        a: 'op',
        b: 'uo'
    }
})
a.value.c.push(9)
console.log(a)