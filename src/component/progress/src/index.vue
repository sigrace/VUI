<template>

	<div :class="['v-progress', status ? 'is-'+ status : '']">
		<div class="v-progress__wrapper">
			<div class="v-progress__inner">
				<div class="inner-base"></div>
				<div class="inner-progress" :style="styleObj"></div>
			</div>
		</div>
		<div class="v-progress__text">{{percent}}%</div>
	</div>

</template>

<script>
export default {
	data() {
		return {

		}
	},
	computed: {
		styleObj() {
			return {
				width: this.percent + '%',
				backgroundColor: this.color
			}
		}
	},
	props: {
		color: {
			type: String,
			default: ''
		},
		status: {
			type: String,
			default: 'normal',
			validator: val => ['normal', 'success', 'error'].indexOf(val) > -1
		},
		percent: {
			type: Number,
			default: 0,
			required: true,
			validator: val => val >=0 && val <=100
		},
	}
}
</script>
