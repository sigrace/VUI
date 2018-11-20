<template>
  <div class="v-slider">
    <div class="v-slide__wrap" ref="slider">
      <div class="v-slider__bar" :style="barStyle"></div>
      <div 
        class="v-slider__button-wrap"
        :style="{left: minPosition + '%'}"
        @touchstart="onPointerDown($event, 'min')"
        @mousedown="onPointerDown($event, 'min')">
        <Tooltip :content="currentValue[0]">
          <div class="v-slider-button"></div>
        </Tooltip>
      </div>
      <template v-if="range">
        <div 
          class="v-slider__button-wrap"
          :style="{left: maxPosition + '%'}"
          @touchstart="onPointerDown($event, 'max')"
          @mousedown="onPointerDown($event, 'max')">
          <Tooltip :content="currentValue[1]">
            <div class="v-slider-button"></div>
          </Tooltip>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Tooltip from '../../tooltip'
export default {

  name: 'vSlider',
  data() {
    return {
      dragging: false,
      currentValue: this.findMinAndMax(Array.isArray(this.value) ? this.value : [this.value]),
      startX: 0,
      movingX: '',
      pointerType: '',
      startPosition: 0
    }
  },
  components: {
    Tooltip
  },
  props: {
    value: {
      type: [Array, Number],
      default: 0,
      required: true
    },
    disabled: Boolean,
    range: Boolean,
    max: {
      type: Number,
      default: 10,
    },
    min: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    range: Boolean,
    step: {
      type: Number,
      default: 1,
      validator: (val) => val % 1 === 0
    }
  },
  computed: {
    rangeValue() {
      return this.max - this.min
    },
    minPosition() {
      let val = this.currentValue
      return (val[0] - this.min) / this.rangeValue * 100
    },
    maxPosition() {
      let val = this.currentValue
      return (val[1] - this.min) / this.rangeValue * 100
    },
    barStyle() {
      let style = {
        width: (this.currentValue[0] - this.min) / this.rangeValue * 100 + '%'
      }
      if(this.range) {
        style.left = (this.currentValue[0] - this.min) / this.rangeValue * 100 + '%'
        style.width = (this.currentValue[1] - this.currentValue[0]) / this.rangeValue * 100 + '%'
      }
      return style
    }
  },
  watch: {
    value(newval) {
      newval = this.findMinAndMax(Array.isArray(newval) ? newval : [newval])
      if(newval[0] !== this.currentValue[0] || newval[1] !== this.currentValue[1]){
        this.currentValue = newval
      }
    }
  },
  methods: {
    getPointerClientX (event) {
      return event.type === 'touchmove' ? event.touches[0].clientX : event.clientX
    },
    findMinAndMax([min, max]) {
      min = Math.max(this.min, min)
      min = Math.min(this.max, min)

      max = Math.max(this.min, min, max)
      max = Math.min(this.max, max)
      return [min, max]
    },
    onPointerDown(event, type) {
      if(this.disabled) return;
      this.pointerType = type
      event.preventDefault()
      this.dragStart(event)
      window.addEventListener('mousemove', this.onPointerDraging)
      window.addEventListener('touchmove', this.onPointerDraging)
      window.addEventListener('mouseup', this.onPointerDragEnd)
      window.addEventListener('touchend', this.onPointerDragEnd)
    },
    dragStart(event) {
      this.dragging = false
      this.startX = this.getPointerClientX(event)
      this.startPosition = this[`${this.pointerType}Position`]
    },
    onPointerDraging(event) {
      this.dragging = true
      this.movingX = this.getPointerClientX(event)
      const sliderWidth = this.$refs.slider.clientWidth
      // console.log(this.movingX, this.startX)
      const diff = (this.movingX - this.startX) / sliderWidth * 100
      this.setPosition(this.startPosition + diff)
    },
    onPointerDragEnd(event) {
      this.pointerType = ''
      this.startX = 0
      window.removeEventListener('mousemove', this.onPointerDraging);
      window.removeEventListener('touchmove', this.onPointerDraging);
      window.removeEventListener('mouseup', this.onPointerDragEnd);
      window.removeEventListener('touchend', this.onPointerDragEnd);
    },
    setPosition(newPos) {
      if(newPos === null || isNaN(newPos)) return;
      newPos = newPos > 100 ? 100 : (newPos < 0 ? 0 : newPos)
      const perStepLength = 100 / (this.rangeValue / this.step)
      let steps = Math.round(newPos / perStepLength)
      // 百分比换算成数值
      let value = steps * perStepLength * this.rangeValue * 0.01 + this.min
      let curVal = [...this.currentValue]
      if(this.pointerType === 'min'){
        curVal[0] = this.findMinAndMax([value, this.max])[0]
      } else {
        curVal[1] = this.findMinAndMax([this.min, value])[1]
      } 
      this.$emit('input', this.range ? curVal.sort((a,b) => a-b) : curVal[0])
    }
  }
}
</script>

<style>

</style>
