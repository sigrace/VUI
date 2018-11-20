<template>
  <table 
    class="v-table__body"
    cellspacing="0"
    cellpadding="0"
    border="0">
    <colgroup>
      <col v-for="(col, index) in columns" :width="setCellWidth(col)"></col>
    </colgroup>
    <tbody>
      <template v-for="(row, rowIndex) in data">
        <tr :class="getRowClass(row, rowIndex)">
          <td v-for="(column, cellIndex) in columns">
            <div class="cell">
              {{row[column.key]}}
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import Mixin from './mixin.js'
export default {
  mixins: [Mixin],
  props: {
    data: Array,
    columns: Array,
    columnsWidth: Object,
    striped: Boolean
  },
  methods: {
    getRowClass(row, rowIndex) {
      let classes = ['v-table']
      if(this.striped && rowIndex % 2 === 1) {
        classes.push('v-table__row--striped')
      }
      return classes.join(' ')
    }
  }
}
</script>

<style>

</style>
