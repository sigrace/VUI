<template>
  <span>
    <ul :class="[cascader ? 'cascader-dropdown-list': 'dropdown-list']">
      <v-option 
        v-for="(item, index) in optionsData" 
        :key="index"
        :data="item"
        :temp-item-val="tempItemVal"
        @click.native.stop="handleItemClick(item)"></v-option>
    </ul>
    <Menu v-if="subData && subData.length" :optionsData="subData" :cascader="cascader"></Menu>
  </span>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      subData: [],
      visible: false,
      tempItemVal: null
    }
  },
  props: {
    optionsData: Array,
    cascader: Boolean
  },
  created() {
    this.$on('selectOption', (showArrow, DATA) => {
      if(showArrow) {
        this.subData = DATA.children
      } else {
        this.subData = []
        let parent = this.$parent
        let name = parent.$options.componentName
        while(parent && (name !== 'vSelect')) {
          parent = parent.$parent
          if(parent){
            name = parent.$options.componentName
          }
        }
        if(parent) {
          parent.$emit('handleOptionClick', DATA, this.showArrow)
        }
      }
    })
  },
  methods: {
    handleItemClick(item) {
      this.tempItemVal = item.value
    }
  }
}
</script>

<style>

</style>
