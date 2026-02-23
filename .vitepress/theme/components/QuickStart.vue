<script setup lang="ts">
import { shallowRef, reactive, computed, watch, onMounted } from "vue";
import { ArrowRight } from "lucide-vue-next";
import { useMouseGlow } from "../composables/useMouseGlow";

const activeTab = shallowRef("script");
const copied = shallowRef(false);
const codeBlockHeight = shallowRef(50);

// Card border glow (pixel-based)
const {
  mouseX,
  mouseY,
  onMouseMove: handleMouseMove,
} = useMouseGlow({ mode: "pixel" });

const tabs = [
  { id: "script", label: "One liner" },
  { id: "compose", label: "Docker Compose" },
  { id: "docker", label: "Docker" },
];

const codeSnippets = reactive<Record<string, string>>({
  script: `curl -sL https://filestream.bot/install | bash`,
  compose: `Loading...`,
  docker: `docker run -d \\
  --name fsb \\
  --restart unless-stopped \\
  --env-file fsb.env \\
  ghcr.io/everythingsuckz/fsb:latest`,
});

const codeHeights = reactive<Record<string, number>>({
  script: 50,
  compose: 420,
  docker: 145,
});

const activeCode = computed(() => codeSnippets[activeTab.value] ?? "");

watch(activeTab, (newTab) => {
  codeBlockHeight.value = codeHeights[newTab] ?? 50;
});

function copyCode() {
  navigator.clipboard.writeText(activeCode.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

// Live-fetch snippets from GitHub
const sourceUrls: Record<string, string> = {
  compose:
    "https://raw.githubusercontent.com/EverythingSuckz/TG-FileStreamBot/main/docker-compose.yaml",
};

onMounted(async () => {
  for (const [key, url] of Object.entries(sourceUrls)) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = (await res.text()).trim();
        codeSnippets[key] = text;
        // Auto-calculate height: ~23px per line + 40px padding
        const lineCount = text.split("\n").length;
        codeHeights[key] = lineCount * 23 + 40;
      } else {
        throw new Error("HTTP " + res.status);
      }
    } catch (e) {
      codeSnippets[key] = `Error fetching resource from URL.\n\nPlease visit: ${url}`;
      codeHeights[key] = 120;
    }
  }
});
</script>

<template>
  <section class="py-24 px-6 relative">
    <div
      class="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center"
    >
      <!-- Left -->
      <div class="text-center lg:text-left">
        <h2
          class="font-display text-[clamp(1.8rem,3.5vw,2.4rem)] font-extrabold tracking-[-0.02em] leading-tight text-text-primary mb-4"
        >
          Up and running<br />in <span class="text-fsb">60 seconds.</span>
        </h2>
        <p class="text-base leading-relaxed text-text-secondary mb-6">
          One command install. Configure your Telegram credentials. Stream
          anywhere.
        </p>
        <a
          href="/getting-started/installation"
          class="group inline-flex items-center gap-2 text-fsb font-semibold text-[0.9rem] no-underline hover:gap-3 transition-all duration-200"
        >
          Full installation guide
          <ArrowRight
            :size="16"
            :stroke-width="2"
            class="group-hover:translate-x-0.5 transition-transform"
          />
        </a>
      </div>

      <!-- Right — code block -->
      <div
        class="group relative rounded-2xl bg-surface-raised p-[1px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        @mousemove="handleMouseMove"
      >
        <!-- Static Border -->
        <div class="absolute inset-0 bg-border-subtle rounded-2xl"></div>

        <!-- Reactive Border Glow -->
        <div
          class="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          :style="{
            background: `radial-gradient(250px circle at ${mouseX}px ${mouseY}px, #00FF85, transparent 40%)`,
          }"
        ></div>

        <!-- Inner Content (The original card) -->
        <div
          class="relative bg-surface-raised rounded-2xl h-full overflow-hidden"
        >
          <!-- Tabs header -->
          <div
            class="flex items-center justify-between px-2 sm:px-4 border-b border-border-subtle bg-white/1.5"
          >
            <div class="flex">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="py-2 sm:py-3 px-2 sm:px-4 font-mono text-[0.6rem] sm:text-[0.72rem] tracking-wider border-b-2 transition-all duration-200 cursor-pointer bg-transparent whitespace-nowrap"
                :class="
                  activeTab === tab.id
                    ? 'text-fsb border-fsb'
                    : 'text-text-tertiary border-transparent hover:text-text-secondary'
                "
              >
                {{ tab.label }}
              </button>
            </div>
            <button
              @click="copyCode"
              class="font-mono text-[0.6rem] sm:text-[0.68rem] px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border transition-all duration-200 cursor-pointer bg-transparent whitespace-nowrap"
              :class="
                copied
                  ? 'text-fsb border-fsb/30'
                  : 'text-text-tertiary border-border-medium hover:border-border-medium hover:text-text-secondary'
              "
            >
              {{ copied ? "✓ Copied" : "Copy" }}
            </button>
          </div>
          <!-- Code body -->
          <div
            class="p-5 overflow-x-auto transition-[height] duration-300 ease-in-out overflow-hidden"
            :style="{ height: codeBlockHeight + 'px' }"
          >
            <pre
              class="m-0 font-mono text-[0.8rem] leading-[1.8] text-text-primary"
            ><code>{{ activeCode }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
