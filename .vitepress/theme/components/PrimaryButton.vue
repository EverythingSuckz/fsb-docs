<script setup lang="ts">
import { type Component } from "vue";

interface Props {
  href: string;
  text: string;
  icon?: Component;
}

defineProps<Props>();
</script>

<template>
  <a
    :href="href"
    class="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-fsb text-[#0a0a0a] font-semibold text-[0.95rem] border border-fsb hover:bg-fsb-dim hover:shadow-[0_0_40px_rgba(0,255,133,0.2)] transition-all duration-300 no-underline cursor-pointer"
  >
    {{ text }}
    <component
      v-if="icon"
      :is="icon"
      :size="18"
      class="group-hover:translate-x-1 transition-transform duration-200"
    />
  </a>
</template>
