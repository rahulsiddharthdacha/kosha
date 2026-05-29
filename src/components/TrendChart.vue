<template>
  <div class="trend-wrap" @mouseleave="tooltip = null">
    <svg
      ref="svgEl"
      width="100%"
      :viewBox="`0 0 ${w} ${h}`"
      style="overflow:visible;display:block"
      @mousemove="onMove"
    >
      <defs>
        <linearGradient id="tgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--steel)" stop-opacity=".22"/>
          <stop offset="100%" stop-color="var(--steel)" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Grid lines + Y labels -->
      <g v-for="tick in yTicks" :key="tick">
        <line :x1="pad" :x2="w - pad" :y1="yScale(tick)" :y2="yScale(tick)"
              stroke="var(--border)" stroke-width="1"/>
        <text :x="pad - 4" :y="yScale(tick)" text-anchor="end" dominant-baseline="middle"
              font-size="8" fill="var(--text3)" font-family="Inter,system-ui,sans-serif">
          {{ tick }}
        </text>
      </g>

      <!-- Area fill -->
      <path :d="areaPath" fill="url(#tgrad)"/>
      <!-- Line -->
      <path :d="linePath" stroke="var(--steel)" stroke-width="1.8" fill="none" stroke-linejoin="round"/>

      <!-- X labels -->
      <text
        v-for="(l, i) in xLabels" :key="i"
        :x="pad + i * xStep * 3"
        :y="h - 6"
        text-anchor="middle"
        font-size="9"
        fill="var(--text3)"
        font-family="Inter,system-ui,sans-serif"
      >{{ l }}</text>

      <!-- Hover indicator -->
      <g v-if="tooltip">
        <line
          :x1="tooltip.x" :x2="tooltip.x"
          :y1="pad" :y2="h - 24"
          stroke="var(--steel)" stroke-width="1" stroke-dasharray="3 3" opacity=".5"
        />
        <circle :cx="tooltip.x" :cy="tooltip.y" r="4"
                fill="var(--steel)" stroke="var(--s1)" stroke-width="2"/>
        <!-- Tooltip box -->
        <g :transform="`translate(${Math.min(tooltip.x + 8, w - 88)}, ${Math.max(tooltip.y - 28, pad)})`">
          <rect width="80" height="22" rx="4"
                fill="rgba(255,253,249,0.95)" stroke="rgba(30,22,12,0.12)" stroke-width="1"/>
          <text x="8" y="9" font-size="9" fill="var(--text3)" font-family="Inter,system-ui,sans-serif">{{ tooltip.label }}</text>
          <text x="8" y="17" font-size="9.5" font-weight="600" fill="var(--text)" font-family="JetBrains Mono,monospace">₹{{ tooltip.val }} Cr</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const vals = [2102,2148,2190,2210,2244,2268,2290,2315,2350,2372,2398,2440,2480,2510,2550,2570,2600,2640,2680,2720,2770,2810,2840,2847]
const months = ['May 24','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan 25','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan 26','Feb','Mar','May 26']
const xLabels = ['May 24','Aug','Nov','Feb 25','May','Aug','Nov','Feb 26','May 26']

const w = 380, h = 140, pad = 28
const min = Math.min(...vals), max = Math.max(...vals)
const xStep = (w - pad * 2) / (vals.length - 1)
const yRange = h - pad - 30

const yScale = v => h - 24 - ((v - min) / (max - min)) * yRange
const yTicks = [2200, 2400, 2600, 2800]

const pts = computed(() => vals.map((v, i) => [pad + i * xStep, yScale(v)]))
const linePath = computed(() => pts.value.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '))
const areaPath = computed(() => {
  const last = pts.value[pts.value.length - 1]
  return linePath.value + ` L${last[0].toFixed(1)},${h - 24} L${pad},${h - 24} Z`
})

const svgEl = ref(null)
const tooltip = ref(null)

function onMove(e) {
  if (!svgEl.value) return
  const rect = svgEl.value.getBoundingClientRect()
  const scaleX = w / rect.width
  const mouseX = (e.clientX - rect.left) * scaleX

  let closest = 0
  let minDist = Infinity
  pts.value.forEach(([px], i) => {
    const d = Math.abs(px - mouseX)
    if (d < minDist) { minDist = d; closest = i }
  })

  const [cx, cy] = pts.value[closest]
  tooltip.value = { x: cx, y: cy, val: vals[closest].toLocaleString(), label: months[closest] }
}
</script>

<style scoped>
.trend-wrap { position: relative; }
</style>
