import Vue from 'vue'

let addEvent = function (element, event, handler){
  if(document.addEventListener) {
    addEvent = function (element, event, handler) {
      element.addEventListener(event, handler, false)
    }
  } else if(document.attachEvent) {
    addEvent = function (element, event, handler) {
      element.attachEvent(event, handler)
    }
  }
  addEvent(element, event, handler)
}


let removeEvent = function (element, event, handler){
  if(document.removeEventListener) {
    removeEvent = function (element, event, handler) {
      element.removeEventListener(event, handler, false)
    }
  } else if(document.detachEvent) {
    removeEvent = function (element, event, handler) {
      element.detachEvent(event, handler)
    }
  }
  removeEvent(element, event, handler)
}
let nodeList = []
let sid = 0
function documentHandler(el, binding, vnode) {
  return function(e) {
    if(vnode.context && !el.contains(e.target)) {
      vnode.context[el.__CLICKOUTSIDE__.methodName]()
    }
  }
}

!Vue.prototype.$isServer && addEvent(document, 'click', e => {
  nodeList.forEach(node => node.__CLICKOUTSIDE__.handler(e))
})

export default {
  bind(el, binding, vnode) {
    nodeList.push(el)
    const id = sid++
    el.__CLICKOUTSIDE__ = {
      id,
      handler: documentHandler(el, binding, vnode),
      methodName: binding.expression
    }
  },
  unbind(el) {
    let len = nodeList.length
    for (let i = 0; i< len; i++) {
      if (nodeList[i].__CLICKOUTSIDE__.id === el.__CLICKOUTSIDE__.id) {
        nodeList.splice(i, 1)
        break
      }
    }
    removeEvent(document, 'click', e => el.__CLICKOUTSIDE__.handler(e))
    delete el.__CLICKOUTSIDE__;
  }
}