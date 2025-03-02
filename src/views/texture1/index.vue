<script setup lang="ts">
import { useWebGL } from '@/components/WebglView/composables/useWebGL'
import { TextureWebglViewer } from './index'
import WebglView from '@/components/WebglView/index.vue'

const viewer = useWebGL(TextureWebglViewer)
</script>

<template>
  <webgl-view :viewer="viewer" />
</template>

<style scoped></style>
