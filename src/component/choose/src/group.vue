<template>
  <div class="choose-group">
    <slot></slot>
  </div>
</template>

<script>

export default {
  componentName: 'vChooseGroup',
  data() {
    return {

    }
  },
  props: {
    value: {
      type: Array,
      default () {
          return [];
      }
    }
  },
  methods: {
    onChange(value) {

    }
  }
}
</script>

<style>

</style>
