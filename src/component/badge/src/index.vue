<template>

	<span class="v-badge">
		<slot></slot>
		<sup v-if="!hidden" class="is-dot"></sup>
	</span>

</template>

<script>
export default {
	props: {
		hidden: Boolean
	}
}
</script>
