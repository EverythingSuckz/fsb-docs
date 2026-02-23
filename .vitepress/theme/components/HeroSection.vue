<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  Star,
  Github,
  Maximize2,
  Minimize2,
  ArrowRight,
} from "lucide-vue-next";
import PrimaryButton from "./PrimaryButton.vue";
import SecondaryButton from "./SecondaryButton.vue";
import { useGitHubRepo } from "../composables/useGitHubRepo";
import { useMouseGlow } from "../composables/useMouseGlow";
import { formatStars } from "../utils/formatStars";

// GitHub data (shared singleton — no duplicate API call)
const { stars } = useGitHubRepo();

// Badge glow effect (percent-based for radial-gradient %)
const {
  mouseX: badgeMouseX,
  mouseY: badgeMouseY,
  isHovering: isBadgeHovering,
  onMouseMove: handleBadgeMouseMove,
  onMouseLeave: handleBadgeMouseLeave,
} = useMouseGlow({ mode: "percent" });

// Video card glow effect (pixel-based for radial-gradient px)
const {
  mouseX: videoMouseX,
  mouseY: videoMouseY,
  onMouseMove: handleVideoMouseMove,
} = useMouseGlow({ mode: "pixel" });

// Video fullscreen
const videoRef = ref<HTMLVideoElement | null>(null);
const isFullscreen = ref(false);

onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
});

function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    videoRef.value?.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
</script>

<template>
  <section
    class="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden px-6 py-20"
  >
    <!-- Background effects -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0"
        style="
          background-image:
            linear-gradient(rgba(0, 255, 133, 0.025) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(0, 255, 133, 0.025) 1px,
              transparent 1px
            );
          background-size: 72px 72px;
          mask-image: radial-gradient(
            ellipse 60% 50% at 50% 40%,
            black 20%,
            transparent 70%
          );
        "
      ></div>
      <div
        class="absolute -top-[10%] right-[10%] w-125 h-125 rounded-full opacity-30"
        style="
          background: radial-gradient(
            circle,
            rgba(0, 255, 133, 0.15),
            transparent 70%
          );
          filter: blur(100px);
          animation: float 8s ease-in-out infinite;
        "
      ></div>
      <div
        class="absolute bottom-[5%] left-[5%] w-100 h-100 rounded-full opacity-20"
        style="
          background: radial-gradient(
            circle,
            rgba(0, 180, 216, 0.12),
            transparent 70%
          );
          filter: blur(100px);
          animation: float 10s ease-in-out infinite reverse;
        "
      ></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 max-w-300 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      <!-- Left -->
      <div
        class="flex flex-col items-center lg:items-start text-center lg:text-left"
      >
        <!-- Stars badge -->
        <a
          href="https://github.com/EverythingSuckz/TG-FileStreamBot/stargazers"
          target="_blank"
          class="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-fsb/20 bg-fsb/3 hover:bg-fsb/6 hover:border-fsb/35 hover:shadow-[0_0_20px_rgba(0,255,133,0.15)] transition-all duration-300 mb-8 no-underline animate-fade-in-up cursor-pointer"
          style="animation-delay: 0s"
          @mousemove="handleBadgeMouseMove"
          @mouseleave="handleBadgeMouseLeave"
        >
          <!-- Ambient glow -->
          <div
            class="absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none"
            :style="{
              opacity: isBadgeHovering ? 1 : 0,
              background: `radial-gradient(60px circle at ${badgeMouseX}% ${badgeMouseY}%, rgba(0,255,133,0.12), transparent 70%)`,
            }"
          ></div>

          <!-- Pulsing star -->
          <span class="relative flex items-center justify-center w-3.5 h-3.5">
            <span
              class="absolute inline-flex w-3.5 h-3.5 text-fsb opacity-60 animate-ping"
            >
              <Star :size="14" fill="currentColor" :stroke-width="0" />
            </span>
            <span class="relative inline-flex w-3.5 h-3.5 text-fsb">
              <Star :size="14" fill="currentColor" :stroke-width="0" />
            </span>
          </span>
          <span
            v-if="stars !== null"
            class="relative font-semibold text-sm text-fsb"
          >
            {{ formatStars(stars) }}
          </span>
          <span
            v-else
            class="relative font-semibold text-sm text-fsb/50 animate-pulse"
          >
            ...
          </span>
          <span class="relative text-xs text-text-tertiary">stars</span>
          <span class="relative text-xs text-text-tertiary">on GitHub</span>
        </a>

        <!-- Title -->
        <h1
          class="font-display text-[clamp(2.6rem,5.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-primary mb-5 animate-fade-in-up"
          style="animation-delay: 0.1s"
        >
          Stream<br />
          <span class="text-fsb">Telegram Files</span><br />
          with direct links.
        </h1>

        <!-- Desc -->
        <p
          class="text-lg leading-relaxed text-text-secondary max-w-130 mb-8 animate-fade-in-up"
          style="animation-delay: 0.2s"
        >
          Generate instant download URLs for any Telegram file. Powered by a
          high-performance Go backend with multi-bot load balancing.
        </p>

        <!-- Buttons -->
        <div
          class="flex gap-3 flex-wrap items-center animate-fade-in-up"
          style="animation-delay: 0.3s"
        >
          <PrimaryButton
            href="/getting-started/"
            text="Get Started"
            :icon="ArrowRight"
          />
          <SecondaryButton
            href="https://github.com/EverythingSuckz/TG-FileStreamBot"
            text="GitHub"
            :icon="Github"
          />
        </div>
      </div>

      <!-- Right — demo video -->
      <div
        class="relative animate-fade-in-up lg:order-0 order-first w-full max-w-[600px] lg:max-w-[800px] mx-auto"
        style="animation-delay: 0.15s"
      >
        <!-- Slow pulsing green glow behind video (The ambient background glow) -->
        <div
          class="absolute -z-10 w-full h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style="
            background: radial-gradient(
              circle,
              rgba(0, 255, 133, 0.4),
              transparent 60%
            );
            filter: blur(120px);
            animation: float 8s ease-in-out infinite;
          "
        ></div>

        <!-- Card Container with Reactive Border -->
        <div
          class="group relative rounded-2xl bg-surface-raised/50 p-[1px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5),0_0_80px_rgba(0,255,133,0.05)]"
          @mousemove="handleVideoMouseMove"
        >
          <!-- Static border color -->
          <div class="absolute inset-0 bg-border-subtle rounded-2xl"></div>

          <!-- Reactive Border Glow (The Neon Green) -->
          <div
            class="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            :style="{
              background: `radial-gradient(300px circle at ${videoMouseX}px ${videoMouseY}px, #00FF85, transparent 40%)`,
            }"
          ></div>

          <!-- Video area (Inner Content, solid background covers the center) -->
          <div
            class="relative aspect-video flex items-center justify-center rounded-2xl overflow-hidden cursor-pointer h-full w-full z-10"
            style="background: #060d10"
          >
            <video
              ref="videoRef"
              autoplay
              loop
              muted
              playsinline
              class="w-full h-full object-cover mix-blend-screen"
              @click="toggleFullscreen"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>

            <!-- Grid overlay -->
            <div
              class="absolute inset-0 pointer-events-none opacity-[0.015]"
              style="
                background: repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 255, 255, 0.05) 2px,
                  rgba(255, 255, 255, 0.05) 4px
                );
              "
            ></div>

            <!-- Custom Fullscreen Toggle -->
            <button
              @click.stop="toggleFullscreen"
              class="absolute top-4 right-4 p-2 rounded-lg bg-black/40 text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:text-white z-40 opacity-100 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Toggle Fullscreen"
            >
              <Minimize2 v-if="isFullscreen" :size="20" />
              <Maximize2 v-else :size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
