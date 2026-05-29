<template>
  <svg
    :width="size"
    :height="size" 
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Kosha"
  >
    <!-- Outer precision ring -->
    <circle cx="40" cy="40" r="37.5" stroke="currentColor" stroke-width="0.8" opacity="0.75"/>

    <!-- 60 chronometer-style tick marks -->
    <line
      v-for="t in ticks" :key="t.i"
      :x1="t.x1" :y1="t.y1"
      :x2="t.x2" :y2="t.y2"
      stroke="currentColor"
      :stroke-width="t.major ? 1.1 : 0.5"
      :opacity="t.major ? 0.65 : 0.28"
      stroke-linecap="round"
    />

    <!-- Cardinal diamonds at 12, 3, 6, 9 o'clock -->
    <polygon v-for="d in cardinals" :key="d.angle"
      :points="d.pts"
      fill="currentColor"
      opacity="0.55"
    />

    <!-- Inner guide ring -->
    <circle cx="40" cy="40" r="29.8" stroke="currentColor" stroke-width="0.45" opacity="0.22"/>

    <!-- ─── K letterform ─── -->
    <!-- Vertical stem -->
    <line x1="33.5" y1="24" x2="33.5" y2="56"
          stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
    <!-- Upper arm — meets stem above centre, creating a refined gap -->
    <line x1="33.5" y1="36" x2="52" y2="24"
          stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
    <!-- Lower arm — mirror of upper arm -->
    <line x1="33.5" y1="44" x2="52" y2="56"
          stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>

    <!-- Subtle mid-bar connecting arm origins (refined, not a full serif) -->
    <line x1="33.5" y1="36" x2="33.5" y2="44"
          stroke="currentColor" stroke-width="2.3" stroke-linecap="round" opacity="1"/>

    <!-- Tiny centre accent dot -->
    <circle cx="40" cy="40" r="1.1" fill="currentColor" opacity="0.35"/>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

defineProps({ size: { type: [Number, String], default: 40 } })

/* 60 tick marks — every 6°, major every 30° */
const ticks = computed(() =>
  Array.from({ length: 60 }, (_, i) => {
    const a = (i * 6 - 90) * (Math.PI / 180)
    const major = i % 5 === 0
    /* skip the 4 cardinal positions — replaced by diamonds */
    if (i % 15 === 0) return null
    const r0 = 37.5
    const r1 = major ? 33.2 : 35.6
    return {
      i,
      x1: +(40 + r0 * Math.cos(a)).toFixed(2),
      y1: +(40 + r0 * Math.sin(a)).toFixed(2),
      x2: +(40 + r1 * Math.cos(a)).toFixed(2),
      y2: +(40 + r1 * Math.sin(a)).toFixed(2),
      major
    }
  }).filter(Boolean)
)

/* Small diamond markers at N / E / S / W */
const cardinals = computed(() =>
  [0, 90, 180, 270].map(deg => {
    const a = (deg - 90) * (Math.PI / 180)
    const cx = +(40 + 35.5 * Math.cos(a)).toFixed(2)
    const cy = +(40 + 35.5 * Math.sin(a)).toFixed(2)
    const s = 2.2   // half-size of diamond
    /* rotated square (diamond) around cx,cy */
    return {
      angle: deg,
      pts: `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`
    }
  })
)
</script>
