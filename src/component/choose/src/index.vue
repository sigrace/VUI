<template>
	<label class="v-choose">
		<span 
			class="v-choose__input"
			:class="{
				'is-disabled': disabled,
				'is-checked': isChecked,
			}">
			<span 
				:class="'v-choose__' + type + '--inner'">
			</span>
			<input 
				class="v-choose__original"
				v-model="model"
				:value="label"
				:type="type"
				:disabled="disabled"
				@change="onChange">
		</span>
		<slot><span v-if="!$slots.default">{{label}}</span></slot>
	</label>
</template>

<script>
import { findParentComponentByName } from '../../../utils/helper.js'
export default {
	data() {
		return {
			parent: undefined
		}
	},
	props: {
		type: {
			type: String,
			default: 'checkbox'
		},
		disabled: Boolean,
		checked: Boolean,
		label: [String, Number, Boolean],
		disabled: Boolean,
		value: {},
	},
	computed: {
		isGroup() {
			return this.parent !== undefined
		},
		model: {
			get() {
				return this.isGroup ? this.parent.value : this.value
			},
			set(val) {
				if(this.isGroup) {
					this.parent.$emit('input', this.type === 'checkbox' ? [].concat.apply(val) : [val])
				} else {
					this.$emit('input', val)
				}
			}
		},
		isChecked() {
			if({}.toString.call(this.model) === '[object Boolean]') {
				return this.model
			} else if(Array.isArray(this.model)) {
				return this.model.indexOf(this.label) > -1
			} 
		}
	},
	mounted () {
		this.parent = findParentComponentByName(this, 'vChooseGroup') 
	},
	methods: {
		onChange(event) {
			if(this.disabled) return

			let currentValue = event.target.checked

			this.$emit('change', currentValue)
			if(this.isGroup) {
				this.parent.$emit('change', this.parent.value)
			}
		}
	}
}
</script>
