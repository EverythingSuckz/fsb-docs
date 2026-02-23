<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  url: string;
  lang?: string;
}>();

const code = ref("Loading...");

onMounted(async () => {
  try {
    const res = await fetch(props.url);
    if (res.ok) {
      code.value = (await res.text()).trim();
    } else {
      code.value = `Error fetching resource: HTTP ${res.status}\nPlease visit: ${props.url}`;
    }
  } catch {
    code.value = `Error fetching resource.\nPlease visit: ${props.url}`;
  }
});

function copyCode() {
  navigator.clipboard.writeText(code.value);
}
</script>

<template>
  <div :class="`language-${lang || 'yaml'}`">
    <button title="Copy Code" class="copy" @click="copyCode"></button>
    <span class="lang">{{ lang || "yaml" }}</span>
    <pre class="vp-code"><code v-text="code"></code></pre>
  </div>
</template>
