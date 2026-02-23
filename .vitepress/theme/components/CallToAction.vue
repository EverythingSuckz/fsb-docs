<script setup lang="ts">
import { Send as SendIcon, Github as GithubIcon } from "lucide-vue-next";
import SecondaryButton from "./SecondaryButton.vue";
import { useGitHubRepo } from "../composables/useGitHubRepo";
import { formatStars } from "../utils/formatStars";

// Shared GitHub data (singleton — same instance as HeroSection)
const { stars, displayedContributors, totalContributors } = useGitHubRepo();
</script>

<template>
  <section class="relative pt-32 pb-10 px-6 overflow-hidden">
    <!-- Full-width background with glow -->
    <div class="absolute inset-0 bg-surface-raised border-t border-white/5">
      <div
        class="absolute inset-0 bg-fsb/5 opacity-20"
        style="
          background-image: radial-gradient(
            circle at 50% 50%,
            rgba(0, 255, 133, 0.15),
            transparent 70%
          );
        "
      ></div>

      <!-- Animated blobs -->
      <div
        class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-fsb/10 rounded-full blur-[100px] animate-pulse pointer-events-none"
        style="animation-duration: 4s"
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[100px] animate-pulse pointer-events-none"
        style="animation-duration: 5s"
      ></div>
    </div>

    <div class="max-w-[1000px] mx-auto relative z-10 text-center">
      <h2
        class="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold tracking-[-0.03em] text-text-primary mb-6"
      >
        Join the <span class="text-fsb">Community</span>
      </h2>
      <p
        class="text-[1.15rem] leading-relaxed text-text-secondary mb-12 max-w-[600px] mx-auto"
      >
        Connect with developers, get help, share your projects, and be part of
        the future of Telegram streaming.
      </p>

      <!-- Buttons -->
      <div class="flex gap-4 justify-center flex-wrap mb-16">
        <SecondaryButton
          href="https://t.me/YourTelegramGroup"
          text="Telegram"
          :icon="SendIcon"
          accent-color="#229ED9"
        />
        <SecondaryButton
          href="https://github.com/EverythingSuckz/TG-FileStreamBot"
          text="GitHub"
          :icon="GithubIcon"
          accent-color="#ffffff"
        />
      </div>

      <!-- Stats row -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start border-t border-white/10 py-12 max-w-[900px] mx-auto"
      >
        <!-- Stars (clickable) -->
        <a
          href="https://github.com/EverythingSuckz/TG-FileStreamBot/stargazers"
          target="_blank"
          class="flex flex-col items-center justify-start h-full no-underline hover:opacity-80 transition-opacity"
        >
          <div
            class="font-display text-3xl font-bold text-fsb mb-2 h-10 flex items-center"
          >
            <span v-if="stars !== null">{{ formatStars(stars) }}</span>
            <span v-else class="animate-pulse">---</span>
          </div>
          <div class="text-sm text-text-tertiary font-medium">GitHub Stars</div>
        </a>

        <!-- Contributors (clickable) -->
        <a
          href="https://github.com/EverythingSuckz/TG-FileStreamBot/graphs/contributors"
          target="_blank"
          class="flex flex-col items-center justify-start h-full no-underline hover:opacity-80 transition-opacity"
        >
          <div class="flex justify-center -space-x-3 mb-2 h-10 items-center">
            <div
              v-for="(contributor, i) in displayedContributors"
              :key="contributor.id"
              class="relative group/avatar"
              :style="{ zIndex: 10 - i }"
            >
              <img
                :src="contributor.avatar_url"
                :alt="contributor.login"
                class="w-10 h-10 rounded-full border-2 border-surface-raised group-hover/avatar:scale-110 group-hover/avatar:z-50 transition-transform duration-200"
              />
              <div
                class="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-surface-overlay text-[0.6rem] text-text-primary rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/5"
              >
                {{ contributor.login }}
              </div>
            </div>
            <!-- Overflow count -->
            <div
              v-if="totalContributors > 5"
              class="w-10 h-10 rounded-full border-2 border-surface-raised bg-white/5 flex items-center justify-center text-[0.7rem] text-text-primary font-bold"
            >
              +{{ totalContributors - 5 }}
            </div>
          </div>
          <div class="text-sm text-text-tertiary font-medium">
            <span v-if="totalContributors > 0"
              >{{ totalContributors }}+ Contributors</span
            >
          </div>
        </a>

        <!-- Built with Go -->
        <a
          href="https://go.dev/"
          target="_blank"
          class="flex flex-col items-center justify-start h-full no-underline hover:opacity-80 transition-opacity"
        >
          <div class="h-10 flex items-center mb-2">
            <img src="../go-logo.svg" alt="Go Logo" class="h-15 opacity-90" />
          </div>
          <span class="text-sm text-text-tertiary font-medium"
            >Built with Go</span
          >
        </a>
      </div>
      <!-- Footer -->
      <div
        class="pt-8 border-t border-white/5 flex flex-col items-center text-center gap-2 px-2"
      >
        <p class="text-xs sm:text-sm text-text-tertiary leading-relaxed">
          Released under the
          <a
            href="https://github.com/EverythingSuckz/TG-FileStreamBot/blob/main/LICENSE"
            target="_blank"
            class="hover:text-fsb transition-colors"
            >AGPL-3.0 License</a
          ><span class="hidden sm:inline mx-2 text-white/10">|</span
          ><br class="sm:hidden" />
          Copyright © {{ new Date().getFullYear() }} EverythingSuckz
        </p>
      </div>
    </div>
  </section>
</template>
