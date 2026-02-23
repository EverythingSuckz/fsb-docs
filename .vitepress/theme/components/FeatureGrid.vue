<script setup lang="ts">
import { Zap, Link, Monitor, Package, Lock, Settings } from "lucide-vue-next";
import GlowCard from "./GlowCard.vue";
import { markRaw, type Component } from "vue";

interface Feature {
  icon: Component;
  title: string;
  description: string;
  tag: string;
}

const features: Feature[] = [
  {
    icon: markRaw(Zap),
    title: "Blazing Fast Streams",
    description:
      "Parallel block downloads with configurable concurrency. Prefetch buffers ensure smooth, uninterrupted playback.",
    tag: "Performance",
  },
  {
    icon: markRaw(Link),
    title: "Direct HTTP Links",
    description:
      "Clean, shareable URLs for any Telegram file. Works with video players, download managers, and browsers.",
    tag: "Core",
  },
  {
    icon: markRaw(Monitor),
    title: "Multi-Bot Workers",
    description:
      "Distribute API load across up to 50 bot tokens. Round-robin routing prevents rate limiting.",
    tag: "Scaling",
  },
  {
    icon: markRaw(Package),
    title: "One-Command Deploy",
    description:
      "Docker, Koyeb, Heroku, or bare metal. Single binary, minimal config. Running in under a minute.",
    tag: "Deploy",
  },
  {
    icon: markRaw(Lock),
    title: "Access Control",
    description:
      "Allowlist specific Telegram users. Session-based auth with optional userbot capabilities.",
    tag: "Security",
  },
  {
    icon: markRaw(Settings),
    title: "Fine-Grained Tuning",
    description:
      "Control concurrency, buffer depth, timeouts, and retries. Presets for every server size.",
    tag: "Config",
  },
];
</script>

<template>
  <section class="py-24 px-6 relative">
    <div class="max-w-300 mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2
          class="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.02em] leading-tight text-text-primary"
        >
          Features
        </h2>
      </div>

      <!-- Grid with glow overlay -->
      <GlowCard
        :glow-radius="12"
        glow-color="rgba(0, 255, 133, 0.15)"
        gap="1rem"
        grid-class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <!-- Base cards (default slot) -->
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="group relative p-7 rounded-2xl border border-border-subtle bg-white/1.5 overflow-hidden cursor-default"
        >
          <!-- Icon -->
          <div
            class="relative w-11 h-11 flex items-center justify-center rounded-xl bg-fsb/6 border border-fsb/10 mb-5 text-fsb/80 group-hover:text-fsb group-hover:border-fsb/20 transition-colors duration-300"
          >
            <component :is="feature.icon" :size="22" :stroke-width="1.5" />
          </div>

          <!-- Tag -->
          <div
            class="relative font-mono text-[0.62rem] tracking-widest uppercase text-fsb/50 mb-3"
          >
            {{ feature.tag }}
          </div>

          <!-- Title -->
          <h3
            class="relative text-[1.1rem] font-bold text-text-primary mb-2 tracking-[-0.01em]"
          >
            {{ feature.title }}
          </h3>

          <!-- Desc -->
          <p
            class="relative text-[0.88rem] leading-relaxed text-text-secondary"
          >
            {{ feature.description }}
          </p>
        </div>

        <!-- Glow overlay cards (glow slot) -->
        <template #glow>
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="relative p-7 rounded-2xl"
            style="
              background: rgba(0, 255, 133, 0.03);
              border: 1px solid rgba(0, 255, 133, 0.15);
            "
          >
            <!-- Icon -->
            <div
              class="w-11 h-11 flex items-center justify-center rounded-xl bg-fsb/6 border border-fsb/10 mb-5 text-fsb/80"
            >
              <component :is="feature.icon" :size="22" :stroke-width="1.5" />
            </div>

            <!-- Tag -->
            <div
              class="font-mono text-[0.62rem] tracking-widest uppercase text-fsb/50 mb-3"
            >
              {{ feature.tag }}
            </div>

            <!-- Title -->
            <h3
              class="text-[1.1rem] font-bold text-text-primary mb-2 tracking-[-0.01em]"
            >
              {{ feature.title }}
            </h3>

            <!-- Desc -->
            <p class="text-[0.88rem] leading-relaxed text-text-secondary">
              {{ feature.description }}
            </p>
          </div>
        </template>
      </GlowCard>
    </div>
  </section>
</template>
