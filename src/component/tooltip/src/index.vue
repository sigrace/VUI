<template>
  <div class="v-tooltip">
    <div class="v-tooltip-rel">
      <slot></slot>
    </div>
    <div class="v-tooltip-popper">
      <div class="v-tooltip-content">
        <div class="v-tooltip-arrow"></div>
        <div class="v-tooltip-inner">{{content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: [String, Number]
  }
}
</script>

<style>

</style>
