<template>
  <table 
    class="v-table__header"
    cellspacing="0"
    cellpadding="0"
    border="0">
    <colgroup>
      <col v-for="(col, index) in columns" :width="setCellWidth(col)"></col>
    </colgroup>
    <thead>
      <tr>
        <th
          v-for="(column, cellIndex) in columns"
          :rowspan="column.rowSpan"
          :colspan="column.colSpan">
          <div class="cell">
            {{column.title}}
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
import Mixin from './mixin.js'
export default {
  mixins: [Mixin],
  data() {
    return {
    }
  },
  props: {
    columns: Array,
    columnsWidth: Object
  },
  computed: {
    table() {
      return this.$parent
    },
    layout() {
      return this.table.layout
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style>

</style>
