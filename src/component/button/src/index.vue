<template>

	<button 
		:class="[
			'v-button',
			'v-button--' + size,
			{
				'is-loading': loading,
				'is-disabled': disabled
			}
		]"
		:disabled="disabled"
		:type="nativeType"
		@click="handleClick">

		<i class="v-icon-loading" v-if="loading">Loading...</i>
		<span v-if="$slots.default"><slot></slot></span>

	</button>

</template>

<script>
export default {
  props: {
		type: {
			type: [String],
			default: 'primary'
		},
		disabled: Boolean,
		loading: Boolean,
		size: {
			type: String,
			default: 'medium'
		},
		nativeType: {
			type: String,
			default: 'button'
		}
  },

  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
}
</script>
