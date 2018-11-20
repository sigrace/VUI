<template>
  <div :class="[
    'v-table',
    {
      'v-table__striped': striped,
      'v-table__border': border
    }
    ]">
    <div class="v-table__header-wrapper">
      <table-header
        :columns="cloneColumns"
        :columns-width="columnsWidth">
      </table-header>
    </div>
    <div class="v-table__body-wrapper">
      <table-body
        :columns="cloneColumns"
        :columns-width="columnsWidth"
        :striped="striped"
        :data="data"></table-body>
    </div>
  </div>
</template>

<script>
import TableHeader from './table-header'
import TableBody from './table-body'
import { getRandomStr, deepCopy, getAllColumns } from './utils.js'
import Vue from 'vue'
export default {
  data() {
    return {
      scrollY: false,
      scrollX: false,
      gutterWidth: 0,
      columnsWidth: {},
      cloneColumns: this.makeColumns()
    }
  },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    data: Array,
    striped: Boolean,
    border: Boolean
  },
  components: {
    TableHeader,
    TableBody
  },
  mounted() {
    this.updateColumnsWidth()
  },
  methods: {
    makeColumns() {
      let columns = getAllColumns(this.columns)
      columns.forEach((column, index) => {
        if(!column.minWidth) {
          column.minWidth = 0
        }
        column._index = index
      })
      return columns
    },
    updateColumnsWidth() {
      if(Vue.prototype.$isServer) return;
      let columnsWidth = {}
      let bodyWidth = this.$el.clientWidth // exclude border width

      let bodyMinWidth = 0
      const {cloneColumns} = this
      cloneColumns.forEach(column => {
        bodyMinWidth += (column.width || column.minWidth || 0)
      })

      let flexColumns = cloneColumns.filter(column => typeof column.width !== 'number')
      if(flexColumns.length) {
        const scrollYWidth = this.scrollY ? this.gutterWidth : 0
        if(bodyMinWidth <= bodyWidth - scrollYWidth) {
          this.scrollX = false

          const availableFlexWidth = bodyWidth - bodyMinWidth - scrollYWidth;

          const flexLen = flexColumns.length
          const perlColumnWidth = parseInt(availableFlexWidth / flexLen)
          flexColumns.forEach((column, index) => {
            let width = perlColumnWidth + (column.minWidth || 0)
            if(column.minWidth > width) {
              width = column.minWidth
            } else if(column.maxWidth < width) {
              width = column.maxWidth
            } 
            
            columnsWidth[column._index] = {
              realWidth: width
            }
          })
        } else {
          flexColumns.forEach(column => {
             columnsWidth[column._index] = {
              realWidth: column.minWidth || 0
            }
          })
        }
      } else {
        cloneColumns.forEach(column => {
          columnsWidth[column._index] = {
            realWidth: column.width || column.minWidth
          }
        })
      }
      this.$nextTick(() => {
        this.columnsWidth = columnsWidth
      })
    },
  },
}
</script>

<style>

</style>
