<template>
  <li 
    class="dropdown-list-item"
    @click.stop="selectOption"
    :class="{
      'is-disabled': disabled,
      'selected': isSelected,
    }">
    {{data.label}}
    <i v-if="showArrow" class="v-icon-arrow-forward">></i>
  </li>
</template>

<script>
export default {
  inject: ['select'],
  data() {
    return {
      active: false,
      cached: {}
    }
  },
  props: {
    data: Object,
    disabled: {
      type: Boolean,
      default: false
    },
    tempItemVal: [Number, String]
  },
  computed: {
    isSelected() {
      if(this.select.multiple) {
        return this.select.value.indexOf(this.data.value) > -1
      } else {
        return (this.tempItemVal || this.select.value) === this.data.value
      }
    },
    showArrow() {
      return (this.data.children && this.data.children.length)
    },
  },
  created() {
    
  },
  methods: {
    selectOption() {
      if(this.disabled) return
      this.$parent.$emit('selectOption', this.showArrow, this.data)
    }
  }
}
</script>

