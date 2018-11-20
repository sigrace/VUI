<template>
  <div class="v-image"
    :style="{
      width: width,
      height: height
    }">
    <img :src="src" alt="">
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    width: String,
    height: String
  }
}
</script>

<style>

</style>
