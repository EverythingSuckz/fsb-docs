<script setup lang="ts">
import { type Component } from "vue";
import { useMouseGlow } from "../composables/useMouseGlow";

interface Props {
  href: string;
  text: string;
  icon?: Component;
  accentColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  accentColor: "#00FF85",
});

// Button border glow (percent-based for radial-gradient %)
const {
  mouseX,
  mouseY,
  onMouseMove: handleMouseMove,
  onMouseLeave: handleMouseLeave,
} = useMouseGlow({ mode: "percent" });
</script>

<template>
  <a
    :href="href"
    target="_blank"
    class="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-[0.95rem] border border-white/10 bg-transparent transition-all duration-300 no-underline cursor-pointer overflow-hidden"
    :class="[
      'text-text-primary',
      accentColor === '#00FF85' ? 'hover:text-text-primary' : '',
    ]"
    :style="
      accentColor !== '#00FF85'
        ? {
            backgroundColor: `${accentColor}10`,
            borderColor: `${accentColor}20`,
            color: accentColor,
          }
        : {}
    "
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Reactive Border Glow (Masked) -->
    <div
      class="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
      :style="{
        padding: '1px',
        background: `radial-gradient(120px circle at ${mouseX}% ${mouseY}%, ${accentColor}, transparent 60%)`,
        '-webkit-mask':
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        '-webkit-mask-composite': 'xor',
        'mask-composite': 'exclude',
      }"
    ></div>

    <component v-if="icon" :is="icon" :size="18" class="relative z-10" />
    <span class="relative z-10">{{ text }}</span>
  </a>
</template>
