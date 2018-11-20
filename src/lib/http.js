import axios from 'axios'

const config = {
  // baseURL: 'http://gateway-sit.baozun.com/',
  headers: {
    ['Content-Type']: 'application/json',
    ['client-id']: 'vssystem',
    ['client-secret']: 'vspass001'
  }
}
const instance = axios.create(config)

function fetch(method, path, params) {
  return new Promise((resolve, reject) => {
    instance[method](path, params)
      .then(({ data: response }) => {
        console.info(response, params)
        if (response.code === 'success') {
          resolve(response)
        } else {
          this.$message.error(response.msg)
          reject(response)
        }
      })
      .catch(response => {
        this.$message.error(response.msg)
        reject(response)
      })
  })
}

const post = function(path, params) {
  return fetch.call(this, 'post', path, params)
}

const get = function(path, params) {
  return fetch.call(this, 'get', path, params)
}

export { post, get }
