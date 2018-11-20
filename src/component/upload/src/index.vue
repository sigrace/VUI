<template>
  <div class="v-upload">
    <div 
      class="v-upload__trigger"
      @click="handleClick">
      <input 
        type="file" 
        ref="input"
        :name="name"
        class="v-upload__input"
        @change="handleChange"
        :multiple="multiple"
        :accept="accept">
      <slot></slot>
    </div>
    <slot name="tip"></slot>
    <upload-list
      :files="fileList"></upload-list>
  </div>
</template>

<script>
import UploadList from './upload-list'
import ajax from './ajax.js'
export default {
  data() {
    return {
      fileList: [],
      tempIndex: 0,
      reqs: {}
    }
  },
  components: {
    UploadList,
  },
  props: {
    name: {
      type: String,
      default: 'file'
    },
    headers: Object,
    withCredentials: Boolean,
    data: Object,
    multiple: {
      type: Boolean,
      default: false
    },
    accept: String,
    beforeUpload: {
      type: Function,
      default() {
        return {}
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    action: {
      type: String,
      required: true
    },
  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },
    handleChange(e) {
      const files = e.target.files
      if (!files) return
      this.uploadFiles(files)
    },
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files)

      if(!this.multiple) postFiles = postFiles.slice(0,1)

      if(!postFiles.length) return
      postFiles.forEach((rawFile) => {
        this.onStart(rawFile)
        this.autoUpload && this.upload(rawFile)
      })
    },
    onStart(file) {
      file.uid = Date.now() + this.tempIndex++
      let _file = {
        status: 'ready',
        percentage: 0,
        name: file.name,
        size: file.size,
        uid: file.uid
      }
      this.fileList.push(_file)
    },
    upload(rawFile) {
      if(!this.beforeUpload) {
        this.post(rawFile)
      }
      const before = this.beforeUpload(rawFile)
      if(before && before.then) {

      } else if (before !== false) {
        this.post(rawFile)
      } else {
        // remove
      }
    },
    post(rawFile) {
      const { uid } = rawFile
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.handleProgress(e, rawFile)
        },
        onSuccess: res => {
          this.hanleSuccess(res, rawFile)
          delete this.reqs[uid]
        },
        onError: err => {
          this.handleError(err, rawFile)
          delete this.reqs[uid]
        }
      }
      const req = ajax(options)
      this.reqs[uid] = req;
      if(req && req.then) {
        req.then(options.onSuccess, options.onError)
      }
    },
    handleProgress(e, file) {},
    hanleSuccess() {},
    handleError() {},
  }
}
</script>

<style>

</style>
