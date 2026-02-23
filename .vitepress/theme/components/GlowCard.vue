<script setup lang="ts">
import { shallowRef } from "vue";

interface Props {
  /** Enable the glowing overlay effect */
  enableGlow?: boolean;
  /** Size of the glow effect radius in rem */
  glowRadius?: number;
  /** Color of the glow effect (CSS color) */
  glowColor?: string;
  /** Gap between cards */
  gap?: string;
  /** Tailwind responsive grid classes applied to the inner grids */
  gridClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  enableGlow: true,
  glowRadius: 12,
  glowColor: "rgba(0, 255, 133, 0.15)",
  gap: "1rem",
  gridClass: "grid-cols-1",
});

const overlayRef = shallowRef<HTMLElement | null>(null);
const isHovering = shallowRef(false);
const glowX = shallowRef(0);
const glowY = shallowRef(0);

function handleMouseMove(e: MouseEvent) {
  if (!props.enableGlow) return;
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  glowX.value = e.clientX - rect.left;
  glowY.value = e.clientY - rect.top;
  isHovering.value = true;
}

function handleMouseLeave() {
  isHovering.value = false;
}
</script>

<template>
  <div
    class="relative"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Base cards layer (always visible) -->
    <div class="grid" :class="gridClass" :style="{ gap: gap }">
      <slot />
    </div>

    <!-- Glow overlay layer (mouse-following mask) -->
    <div
      v-if="enableGlow"
      ref="overlayRef"
      class="absolute inset-0 pointer-events-none select-none transition-opacity duration-350 ease-out"
      :class="isHovering ? 'opacity-100' : 'opacity-0'"
      :style="{
        '-webkit-mask': `radial-gradient(${glowRadius}rem ${glowRadius}rem at ${glowX}px ${glowY}px, #000 1%, transparent 50%)`,
        mask: `radial-gradient(${glowRadius}rem ${glowRadius}rem at ${glowX}px ${glowY}px, #000 1%, transparent 50%)`,
      }"
    >
      <div class="grid" :class="gridClass" :style="{ gap: gap }">
        <slot name="glow" />
      </div>
    </div>
  </div>
</template>
