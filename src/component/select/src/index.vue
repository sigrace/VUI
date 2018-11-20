<template>
  <div 
    :class="[
      'v-select',
      size ? 'v-select-' + size : '',
      {
        'is-focus': visible,
        'is-disabled': disabled
      }
    ]"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose">
    <div class="v-select__tags" v-if="multiple">
      <v-tag 
        closeable 
        :disabled="disabled"
        @close="deleteTag($event, tag)"
        v-for="(tag, index) in selected" :key="index">
        {{tag.label}}
      </v-tag>
    </div>
    <input
      class="v-input__inner"
      :style="inputHeight"
      v-model="selectedLabel"
      v-bind="$attrs"
      :readonly="readonly"
      autocomplete="off"
      @focus="handleFocus"
      @blur="handleBlur"/>
    <span class="v-input__suffix">
      <i :class="[
        'v-select__caret', 
        showClear ? 'v-icon-close' : 'v-icon-arrow-up', 
        {
          'is-reverse': visible && !showClear,
          'show-clear': showClear
        }
      ]"
      @click.native="clearSelected"></i>
    </span>
    <transition 
      name="zoom">
      <v-select-dropdown
        v-if="visible">
        <Menu :optionsData="optionsData" :cascader="cascader"></Menu>
      </v-select-dropdown>
    </transition>
  </div>
</template>

<script>
import vTag from '../../tag'
import Menu from './menu'
import vOption from './option'
import vInput from '../../input'
import vSelectDropdown from './select-dropdown.vue'
import clickoutside from '../../../utils/clickoutside.js'
export default {
  componentName: 'vSelect',
  name: 'vSelect',
  directives: { clickoutside },
  data() {
    return {
      visible: false,
      selectedLabel: '',
      multipleSelectedLabel: [],
      selected: [],
      optionsData: this.options,
    }
  },
  provide() {
    return {
      'select': this
    }
  },
  components: {
    Menu,
    vInput,
    vSelectDropdown,
    vTag,
    vOption
  },
  created() {
    this.$on('handleOptionClick', this.handleOptionClick)
    this.cascader && this.flattenOptions()
    console.log(vSelectDropdown)
  },
  props: {
    size: String,
    multiple: Boolean,
    value: [String, Number, Array],
    disabled: Boolean,
    clearable: Boolean,
    options: Array,
    cascader: Boolean
  },
  computed: {
    readonly() {
      return true
    },
    inputHeight() {
      if(this.multiple) {
        return {}
      }
    },
    showClear() {
      if(this.clearable && !this.multiple && this.value != '' && this.value != undefined && this.value != null ) {
        return true
      }
      return false
    },
    
  },
  watch: {
    options: {
      immediate: true,
      handler(newOptions) {
        let selected
        if(!this.multiple) {
          selected = newOptions.find(option => option.value === this.value)
          this.selectedLabel = selected ? selected.label : ''
        } else {
          selected = newOptions.filter(option => this.value.indexOf(option.value) > -1)
          this.selected = selected
        }
      }
    }
  },
  methods: {
    handleFocus(event) {
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.$emit('blur', event)
    },
    toggleMenu() {
      if(this.disabled) return
      this.visible = !this.visible
    },
    clearSelected() {
      if(this.showClear) {
        event.stopPropagation()
        this.$emit('input', '')
        this.$emit('change', '')
        this.visible = false
      }
    },
    flattenOptions() {
      let findChildren = function (node) {
        if(!node.children || !node.children.length) return [node]
        node._value = node._value || [node.value]
        node._label = node._label || node.label
        const children = node.children.map(child => {
          child._value = node._value.concat(child.value)
          child._label = node._label + ' / ' + child.label
          return child
        })
        const options = children.reduce((arr, el) => {
          return arr.concat(findChildren(el)).filter(Boolean)
        }, [])
        return options
      }
      return this.options.reduce((opts, slot) => {
        return opts.concat(findChildren(slot))
      }, [])
    },
    handleOptionClick(option, visible) {
      if(this.multiple) {
        let value = this.value.slice()
        let optionIndex = value.indexOf(option.value)

        if(optionIndex > -1) {
          value.splice(optionIndex, 1)
          this.selected.splice(optionIndex, 1)
        } else {
          value.push(option.value)
          this.selected.push(option)
        }

        this.$emit('input', value)
        this.$emit('change', value)
      } 
      else {
        this.selectedLabel = option._label || option.label
        this.$emit('input', option._value || option.value)
        this.$emit('change', option._value || option.value)
        this.$nextTick(() => this.visible = false)
      }
    },
    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag) 
      if(index > -1) {
        this.selected.splice(index, 1)
        this.value.splice(index, 1)
        this.$emit('input', this.value)
        this.$emit('change', this.value)
      }
    },
    handleClose() {
      this.visible = false
    }
  }
}
</script>

<style>

</style>
