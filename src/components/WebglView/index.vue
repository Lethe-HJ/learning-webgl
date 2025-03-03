<template>
  <canvas ref="canvas" width="400" height="400" style="border: 1px solid grey">
    此浏览器不支持canvas
  </canvas>
</template>
<script setup lang="ts">
import { ref, onMounted, type PropType } from 'vue'
import { WebglViewer } from '.'

const props = defineProps({
  viewer: {
    type: Function as PropType<(canvas: HTMLCanvasElement) => WebglViewer>,
    required: true,
  },
})

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  props.viewer(canvas.value!)
})
</script>
