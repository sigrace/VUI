export function findParentComponentByName(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.componentName

  while(parent && (!name || name !== componentName)){
    parent = parent.$parent
    if (parent) name = parent.$options.componentName
  }
  return parent
}
