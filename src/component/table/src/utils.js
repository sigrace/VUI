export const getRandomStr = function (len) {
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const maxLen = chars.length
  let str = ''
  for(let i=0, j = len; i < j; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxLen))
  }
  return str
}

const deepCopy = function(data) {
  const t =  Object.prototype.toString.call(data);
  let o;

  if (t === '[object Array]') {
      o = [];
  } else if ( t === '[object Object]') {
      o = {};
  } else {
      return data;
  }
  if (t === '[object Array]') {
      for (let i = 0; i < data.length; i++) {
          o.push(deepCopy(data[i]));
      }
  } else if ( t === '[object Object]') {
      for (let i in data) {
          o[i] = deepCopy(data[i]);
      }
  }
  return o;
}
export {deepCopy}

const getAllColumns = function(cols) {
  let results = []
  let columns = deepCopy(cols)
  columns.forEach(column => {
    if(column.children){
      results.push.apply(results, getAllColumns(column.children))
    } else {
      results.push(column)
    }
  })
  return results
}

export {getAllColumns}