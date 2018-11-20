<template>
  <div class="v-select__dropdown" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: 'vSelectDropdown',
  data() {
    return {

    }
  },
  computed: {
    styles() {
      return {
        zIndex: '1000'
      }
    }
  }
}
</script>

<style>

</style>
