<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" style="flex-shrink:0;overflow:visible">
    <path
      v-for="(seg, i) in segments"
      :key="i"
      :d="seg.d"
      :fill="seg.color"
      opacity=".82"
      style="cursor:pointer;transition:opacity .2s"
      @mouseenter="hovered = i"
      @mouseleave="hovered = null"
      :style="{ opacity: hovered === null || hovered === i ? (i === hovered ? 1 : 0.82) : 0.45 }"
    >
      <title>{{ seg.label }}: {{ seg.pct }}%</title>
    </path>
    <!-- Centre text -->
    <text :x="cx" :y="cy - 7" text-anchor="middle" font-size="13" fill="var(--text)" font-family="JetBrains Mono, monospace" font-weight="300">₹2,847</text>
    <text :x="cx" :y="cy + 10" text-anchor="middle" font-size="9.5" fill="var(--text3)" font-family="Inter, system-ui, sans-serif" letter-spacing="1">Cr · Total</text>
  </svg>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ data: { type: Array, required: true } })
const size = 150
const cx = size / 2, cy = size / 2
const r = 58, ri = 36
const hovered = ref(null)

const segments = computed(() => {
  let angle = -Math.PI / 2
  return props.data.map(item => {
    const span = (item.pct / 100) * Math.PI * 2
    const x1 = cx + r * Math.cos(angle),   y1 = cy + r * Math.sin(angle)
    const x2 = cx + r * Math.cos(angle + span), y2 = cy + r * Math.sin(angle + span)
    const xi1 = cx + ri * Math.cos(angle), yi1 = cy + ri * Math.sin(angle)
    const xi2 = cx + ri * Math.cos(angle + span), yi2 = cy + ri * Math.sin(angle + span)
    const large = span > Math.PI ? 1 : 0
    const d = `M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large},1 ${x2.toFixed(2)},${y2.toFixed(2)} L${xi2.toFixed(2)},${yi2.toFixed(2)} A${ri},${ri} 0 ${large},0 ${xi1.toFixed(2)},${yi1.toFixed(2)} Z`
    angle += span
    return { d, color: item.color, label: item.label, pct: item.pct }
  })
})
</script>
