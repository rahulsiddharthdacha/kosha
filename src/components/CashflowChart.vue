<template>
  <svg width="100%" :viewBox="`0 0 ${w} ${h}`" style="overflow:visible">

    <!-- Y-axis grid lines + labels -->
    <g v-for="tick in yTicks" :key="tick">
      <line :x1="padL" :x2="w - padR" :y1="yPos(tick)" :y2="yPos(tick)"
            stroke="var(--border)" stroke-width="0.8" stroke-dasharray="4 4"/>
      <text :x="padL - 4" :y="yPos(tick)" text-anchor="end" dominant-baseline="middle"
            font-size="8" fill="var(--text3)" font-family="Inter,system-ui,sans-serif">
        {{ tick }}L
      </text>
    </g>

    <!-- Bars -->
    <g v-for="(v, i) in vals" :key="i">
      <rect
        :x="padL + i * (bw + gap)"
        :y="bottom - (v / maxVal) * barH"
        :width="bw"
        :height="(v / maxVal) * barH"
        fill="var(--green)"
        opacity=".65"
        rx="2"
        style="cursor:pointer;transition:opacity .2s"
        @mouseenter="tip = `${months[i]}: ₹${v}L`"
        @mouseleave="tip = ''"
        @mouseover="$event.target.setAttribute('opacity','1')"
        @mouseout="$event.target.setAttribute('opacity','.65')"
      />
      <text
        :x="padL + i * (bw + gap) + bw / 2"
        :y="h - 4"
        text-anchor="middle"
        font-size="8.5"
        fill="var(--text3)"
        font-family="Inter,system-ui,sans-serif"
      >{{ months[i] }}</text>
    </g>

    <!-- Hover tooltip -->
    <text v-if="tip" :x="w / 2" :y="10" text-anchor="middle"
          font-size="10" fill="var(--text2)" font-family="Inter,system-ui,sans-serif"
          font-weight="500">{{ tip }}</text>
  </svg>
</template>

<script setup>
import { ref } from 'vue'

const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar']
const vals   = [142,168,134,188,212,154,178,201,145,224,168,189]
const maxVal = Math.max(...vals)

const w = 380, h = 130
const padL = 28, padR = 6
const bw = 20, gap = 7
const bottom = h - 20
const barH = bottom - 14

const yTicks = [50, 100, 150, 200]
const yPos = v => bottom - (v / maxVal) * barH

const tip = ref('')
</script>
