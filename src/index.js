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

// const ncname = `[a-zA-Z][\\w\\-\\.]`
// const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// const startTagOpen = new RegExp(`^<${qnameCapture}`)

// let start = `<div></div>`.match(startTagOpen)
// if(start){
//     const match = {
//         tagName: start[1],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
//         attrs: []
//     }
// }

// const attribute = /^\s*([^\s"'<div>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<div>`]+)))?/
// const startTagClose = /^\s*(\/?)>/
// let html = ` class="box" id="el"></div>`
// let attr, end
// const match = {tagName: 'div', attrs: []}
// while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
//     html = html.substring(attr[0].length)
//     match.attrs.push(attr)
// }

// console.log(match)

// function parseStartTagEnd (html) {
//     const starTagClose = /^\s*(\/?)>/
//     const end = html.match(startTagClose)
//     const match = {}

//     if(end){
//         match.unarySlash = end[1]
//         html = html.substring(end[0].length)
//         return match
//     }
// }

// console.log(parseStartTagEnd('></div>'))
// console.log(parseStartTagEnd('/><div></div>'))

//vue中的真实源码
const ncname = `[a-zA-Z][\\w\\-\\.]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const startTagClose = /^\s*(\/?)>/
function advance (n){
    html = html.substring(n)
}

function parseStartTag(){
    //解析标签名称， 判断模板是否符合开始标签的特征
    const start = html.match(startTagOpen)
    if(start){
        const match = {
            tagName: start[1],
            attrs: []
        }
        advance(start[0].length)

        let end, attr
        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            advance(attr[0].length)
        }
        if(end){
            match.unarySlash = end[1]
            advance(end[0].length)
            return match
        }
    }
}

// while(html){
//     let text
//     let textEnd = html.indexOf('<')

//     if(textEnd > 0){
//         text = html.substring(0,textEnd)
//         html = html.substring(textEnd)
//     }

//     if(textEnd < 0){
//         text = html
//         html = ""
//     }

//     if(options.chars && text){
//         options.chars(text)
//     }
// }

while(html){
    let text, rest, next
    let textEnd = html.indexOf('<')
    
    if(textEnd >= 0){
        rest = html.slice(textEnd)
        while(
            !endTag.test(rest) && 
            !startTagOpen.test(rest) &&
            !comment.test(rest) &&
            !conditionalComment.test(rest)
        ){
            next = rest.indexOf('<',1)
            if(next < 0) break
            textEnd +=next
            rest = html.slice(textEnd)
        }
        text = html.substring(0,textEnd)
        html = html.substring(textEnd)
    }

    if(textEnd < 0){
        text = html
        html = ''
    }

    if(options.chars && text){
        options.chars(text)
    }

}

