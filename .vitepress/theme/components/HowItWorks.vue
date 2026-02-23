<script setup lang="ts">
import { shallowRef } from "vue";
import { Video, ArrowRight } from "lucide-vue-next";

const hoverStates = shallowRef<Record<number, { x: number; y: number }>>({});

function handleMouseMove(e: MouseEvent, index: number) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  hoverStates.value = {
    ...hoverStates.value,
    [index]: {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    },
  };
}

function getMouse(index: number) {
  return hoverStates.value[index] || { x: 0, y: 0 };
}

const steps = [
  {
    number: "01",
    title: "Send a file",
    description:
      "Forward or send any file to your Telegram bot — videos, documents, archives, anything.",
    visual: "send",
  },
  {
    number: "02",
    title: "Get a link",
    description:
      "The bot instantly generates a direct HTTP streaming URL for your file.",
    visual: "link",
  },
  {
    number: "03",
    title: "Stream anywhere",
    description:
      "Open the link in any browser, video player, or download manager. No Telegram needed.",
    visual: "stream",
  },
];
</script>

<template>
  <section class="py-24 px-6 relative">
    <div class="max-w-300 mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2
          class="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.02em] text-text-primary"
        >
          Three steps. That's it.
        </h2>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="relative text-center px-6 py-8"
        >
          <!-- Step number -->
          <div
            class="font-mono text-[0.65rem] text-fsb/40 mb-5 tracking-[0.12em]"
          >
            {{ step.number }}
          </div>

          <!-- Visual -->
          <div class="h-20 flex items-center justify-center mb-5">
            <!-- Send -->
            <div
              v-if="step.visual === 'send'"
              class="group relative rounded-xl bg-surface-raised p-[1px] w-full max-w-[280px] h-[54px]"
              @mousemove="(e) => handleMouseMove(e, i)"
            >
              <!-- Static Border -->
              <div class="absolute inset-0 bg-border-subtle rounded-xl"></div>
              <!-- Reactive Glow -->
              <div
                class="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                :style="{
                  background: `radial-gradient(150px circle at ${getMouse(i).x}px ${getMouse(i).y}px, #00FF85, transparent 50%)`,
                }"
              ></div>
              <!-- Content -->
              <div
                class="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-raised h-full w-full"
              >
                <div class="flex items-center gap-1.5 shrink-0">
                  <Video :size="18" :stroke-width="1.5" class="text-fsb/60" />
                  <span class="text-[0.6rem] text-text-tertiary font-mono"
                    >346.6 MB</span
                  >
                </div>
                <div class="flex flex-col items-start gap-0.5 min-w-0 flex-1">
                  <span
                    class="font-mono text-[0.7rem] text-text-primary truncate w-full"
                    >Never Gonna Give You Up.mp4</span
                  >
                </div>
                <span class="text-fsb text-lg animate-nudge shrink-0">→</span>
              </div>
            </div>

            <!-- Link -->
            <div
              v-if="step.visual === 'link'"
              class="group relative rounded-xl bg-surface-raised p-[1px] w-full max-w-[280px] h-[54px]"
              @mousemove="(e) => handleMouseMove(e, i)"
            >
              <!-- Static Border -->
              <div class="absolute inset-0 bg-fsb/15 rounded-xl"></div>
              <!-- Reactive Glow -->
              <div
                class="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                :style="{
                  background: `radial-gradient(150px circle at ${getMouse(i).x}px ${getMouse(i).y}px, #00FF85, transparent 50%)`,
                }"
              ></div>
              <!-- Content -->
              <div
                class="relative flex items-center justify-center font-mono text-[0.68rem] px-4 py-2.5 rounded-xl bg-surface-raised h-full w-full"
              >
                <span class="text-text-tertiary">https://</span
                ><span class="text-text-secondary">yourdomain.com</span
                ><span class="text-fsb">/125?hash=4f345</span>
              </div>
            </div>

            <!-- Stream -->
            <div
              v-if="step.visual === 'stream'"
              class="group relative rounded-xl bg-surface-raised p-[1px] w-full max-w-[280px] h-[54px]"
              @mousemove="(e) => handleMouseMove(e, i)"
            >
              <!-- Static Border -->
              <div class="absolute inset-0 bg-border-subtle rounded-xl"></div>
              <!-- Reactive Glow -->
              <div
                class="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                :style="{
                  background: `radial-gradient(150px circle at ${getMouse(i).x}px ${getMouse(i).y}px, #00FF85, transparent 50%)`,
                }"
              ></div>
              <!-- Content -->
              <div
                class="relative w-full h-full px-4 py-3 rounded-xl bg-surface-raised flex items-center"
              >
                <div class="flex items-center gap-2.5 w-full">
                  <span class="text-fsb text-[0.7rem]">▶</span>
                  <div
                    class="flex-1 h-0.75 rounded-full bg-white/6 overflow-hidden"
                  >
                    <div
                      class="h-full rounded-full bg-fsb"
                      style="animation: progress-fill 8s ease-in-out infinite"
                    ></div>
                  </div>
                  <span class="font-mono text-[0.6rem] text-text-tertiary"
                    >1:42:18</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Title & desc -->
          <h3 class="text-[1.1rem] font-bold text-text-primary mb-2">
            {{ step.title }}
          </h3>
          <p class="text-[0.88rem] leading-relaxed text-text-secondary">
            {{ step.description }}
          </p>

          <!-- Connector arrow (desktop) -->
          <div
            v-if="i < steps.length - 1"
            class="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-fsb/15"
          >
            <ArrowRight :size="20" :stroke-width="2" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
