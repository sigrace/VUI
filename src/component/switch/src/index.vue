<template>
  <div 
    :class="[
      'v-switch',
      {
        'is-disabled': disabled,
        'is-checked': checked
      }
    ]"
    @click="handleSwitch">
    <input 
      class="v-switch__input"
      ref="input"
      @change="handleChange"
      type="checkbox">
    <span 
      :class="[
        'v-switch__thumb',
        checked ? 'checked-color': 'normal-color'
      ]" 
      :style="{width: width}"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  },
  props: {
    disabled: Boolean,
    width: {
      type: String,
      default: '40px'
    },
  },
  methods: {
    handleSwitch() {
      !this.disabled && this.handleChange()
    },
    handleChange() {
      this.checked = !this.checked
      this.$refs.input.checked = this.checked
      this.$emit('input', this.$refs.input.checked )
    }
  }
}
</script>

<style>

</style>
