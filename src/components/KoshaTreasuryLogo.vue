<template>
  <!--
    Kosha Treasury Mark — "कोश"
    Concept: nested geometric chambers (circle → diamond → square → diamond → bindu)
    representing the Sanskrit layered-sheath philosophy — each shell protects
    the treasury at the centre. Inspired by Yantra sacred geometry, modernised.
  -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Kosha — कोश"
  >
    <!-- ─── Layer 0: Outermost containing circle ─── -->
    <circle cx="40" cy="40" r="36.5"
            stroke="currentColor" stroke-width="0.75" opacity="0.55"/>

    <!-- ─── Layer 1: Large diamond — first chamber ─── -->
    <polygon points="40,11 69,40 40,69 11,40"
             stroke="currentColor" stroke-width="0.75" opacity="0.42" fill="none"/>

    <!-- Bindu (sacred dot) at each diamond vertex -->
    <circle cx="40" cy="11"  r="1.5" fill="currentColor" opacity="0.48"/>
    <circle cx="69" cy="40"  r="1.5" fill="currentColor" opacity="0.48"/>
    <circle cx="40" cy="69"  r="1.5" fill="currentColor" opacity="0.48"/>
    <circle cx="11" cy="40"  r="1.5" fill="currentColor" opacity="0.48"/>

    <!-- Subtle arc quarters connecting circle to diamond corners (luxury detail) -->
    <path d="M 40 3.5 A 36.5 36.5 0 0 1 76.5 40" stroke="currentColor" stroke-width="0.4" opacity="0.18" fill="none"/>
    <path d="M 76.5 40 A 36.5 36.5 0 0 1 40 76.5" stroke="currentColor" stroke-width="0.4" opacity="0.18" fill="none"/>
    <path d="M 40 76.5 A 36.5 36.5 0 0 1 3.5 40" stroke="currentColor" stroke-width="0.4" opacity="0.18" fill="none"/>
    <path d="M 3.5 40 A 36.5 36.5 0 0 1 40 3.5" stroke="currentColor" stroke-width="0.4" opacity="0.18" fill="none"/>

    <!-- ─── Layer 2: Square — second chamber (rotated 0°) ─── -->
    <rect x="22.5" y="22.5" width="35" height="35" rx="1.5"
          stroke="currentColor" stroke-width="0.6" opacity="0.30" fill="none"/>

    <!-- Corner accent dots of the square -->
    <circle cx="22.5" cy="22.5" r="1.0" fill="currentColor" opacity="0.30"/>
    <circle cx="57.5" cy="22.5" r="1.0" fill="currentColor" opacity="0.30"/>
    <circle cx="57.5" cy="57.5" r="1.0" fill="currentColor" opacity="0.30"/>
    <circle cx="22.5" cy="57.5" r="1.0" fill="currentColor" opacity="0.30"/>

    <!-- ─── Layer 3: Inner diamond — third chamber ─── -->
    <polygon points="40,27 53,40 40,53 27,40"
             stroke="currentColor" stroke-width="0.6" opacity="0.40" fill="none"/>

    <!-- Bindu at inner diamond vertices -->
    <circle cx="40" cy="27" r="1.1" fill="currentColor" opacity="0.42"/>
    <circle cx="53" cy="40" r="1.1" fill="currentColor" opacity="0.42"/>
    <circle cx="40" cy="53" r="1.1" fill="currentColor" opacity="0.42"/>
    <circle cx="27" cy="40" r="1.1" fill="currentColor" opacity="0.42"/>

    <!-- ─── Layer 4: Innermost square chamber ─── -->
    <rect x="33" y="33" width="14" height="14" rx="1"
          stroke="currentColor" stroke-width="0.5" opacity="0.22" fill="none"/>

    <!-- ─── K letterform ─── -->
    <!-- The K emerges from within the innermost chamber outward -->

    <!-- Vertical stem -->
    <line x1="35.5" y1="25.5" x2="35.5" y2="54.5"
          stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>

    <!-- Upper arm — traditional single-junction K (arms meet at one point) -->
    <line x1="35.5" y1="39" x2="51.5" y2="25.5"
          stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>

    <!-- Lower arm -->
    <line x1="35.5" y1="39" x2="51.5" y2="54.5"
          stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>

    <!-- ─── Bindu — the central treasury point ─── -->
    <!-- The heart of the Kosha: the single point where all value originates -->
    <circle cx="40" cy="40" r="2.2"
            fill="currentColor" opacity="0.18"/>
    <circle cx="40" cy="40" r="1.0"
            fill="currentColor" opacity="0.55"/>
  </svg>
</template>

<script setup>
defineProps({ size: { type: [Number, String], default: 40 } })
</script>
