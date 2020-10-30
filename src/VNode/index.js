export default class VNode {
  constructor (tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag  //元素节点的名称
    this.data = data
    this.children = children //表示子节点
    this.text = text //文本节点的文本
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.functionalContext = undefined
    this.functionalOptions = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }
  get child () {
    return this.componentInstance
  }
}
// Vnode 只是一个名字  本质上其实是一个JavaScript普通对象，  vnode可以理解为节点描述对象，它描述了应该怎样去创建节点
//渲染视图的过程是先创建vnode，然后再使用vnode去生成真实的DOM元素，最后再插入页面  渲染视图

//vnode 类型
//   注释节点  文本节点  元素节点  组件节点 函数式组件  克隆节点

// patch  做的三件事
// 创建新增的节点
// 删除已经废除的节点
// 修改需要更新的节点


// 只有三种节点会被创建并被插入到DOM中： 元素节点  注释节点   文本节点

// 删除节点的过程
export function removeVnodes (vnodes, startIdx, endIdx) {
  for(;startIdx <= endIdx; ++startIdx){
    const ch = vnodes[startIdx]
    if(isDef(ch)){
      removeVnode(ch.elm)
    }
  }
}

const nodeOps = {
  removeChild (node, child) {
    node.removeChild(child)
  }
}

function removeNode (el) {
  const parent = nodeOps.parentNode(el)
  if(isDef(parent)){
    nodeOps.removeChild(parent,el)
  }
}