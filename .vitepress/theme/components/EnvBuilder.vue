<script setup lang="ts">
import { ref, computed } from "vue";
import {
  FileText,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
  Server,
  Settings,
  Info,
  X,
} from "lucide-vue-next";

interface EnvField {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: "text" | "number" | "boolean" | "tags";
  help: string;
  helpLink?: string;
  default?: string;
  validate?: (value: string) => string | null;
}

interface EnvSection {
  id: string;
  title: string;
  icon: any;
  description: string;
  fields: EnvField[];
}

const sections: EnvSection[] = [
  {
    id: "required",
    title: "Required Credentials",
    icon: Shield,
    description: "Mandatory variables to start the bot.",
    fields: [
      {
        key: "API_ID",
        label: "API ID",
        placeholder: "12345678",
        required: true,
        help: "From my.telegram.org",
        helpLink: "/getting-started/prerequisites",
        validate: (v: string) =>
          v && !/^\d+$/.test(v) ? "Must be a number" : null,
      },
      {
        key: "API_HASH",
        label: "API Hash",
        placeholder: "abcdef1234567890...",
        required: true,
        help: "From my.telegram.org",
        helpLink: "/getting-started/prerequisites",
        validate: (v: string) =>
          v && !/^[a-f0-9]{32}$/.test(v) ? "Must be 32 hex characters" : null,
      },
      {
        key: "BOT_TOKEN",
        label: "Bot Token",
        placeholder: "123456:ABC-DEF...",
        required: true,
        help: "From @BotFather",
        helpLink: "/getting-started/prerequisites",
        validate: (v: string) =>
          v && !/^\d+:[A-Za-z0-9_-]+$/.test(v)
            ? "Format: 123456:ABC-DEF..."
            : null,
      },
      {
        key: "LOG_CHANNEL",
        label: "Log Channel ID",
        placeholder: "-100451...",
        required: true,
        help: "Channel ID for storage",
        helpLink: "/getting-started/prerequisites",
        validate: (v: string) =>
          v && !v.startsWith("-100") ? "Must start with -100" : null,
      },
    ],
  },
  {
    id: "optional",
    title: "Optional Configuration",
    icon: Settings,
    description: "Customize behavior and networking.",
    fields: [
      {
        key: "PORT",
        label: "Port",
        placeholder: "8080",
        default: "8080",
        help: "HTTP server port",
        validate: (v: string) =>
          v && (isNaN(+v) || +v < 1 || +v > 65535) ? "Must be 1-65535" : null,
      },
      {
        key: "HOST",
        label: "Host URL",
        placeholder: "https://stream.example.com",
        default: "Auto-detect",
        help: "Base URL for links",
        validate: (v: string) =>
          v && !/^https?:\/\/.+/.test(v)
            ? "Must start with http:// or https://"
            : null,
      },
      {
        key: "HASH_LENGTH",
        label: "Hash Length",
        placeholder: "6",
        default: "6",
        type: "number",
        help: "Length of URL hash (5-32)",
        validate: (v: string) =>
          v && (isNaN(+v) || +v < 5 || +v > 32) ? "Must be 5-32" : null,
      },
      {
        key: "DEV",
        label: "Dev Mode",
        placeholder: "false",
        default: "false",
        type: "boolean",
        help: "Enable debug logging",
      },
      {
        key: "USE_SESSION_FILE",
        label: "Use Session File",
        placeholder: "true",
        default: "true",
        type: "boolean",
        help: "Cache telegram session",
      },
      {
        key: "USE_PUBLIC_IP",
        label: "Use Public IP",
        placeholder: "false",
        default: "false",
        type: "boolean",
        help: "Auto-detect public IP",
      },
      {
        key: "ALLOWED_USERS",
        label: "Allowed Users",
        placeholder: "Type user ID and press comma",
        type: "tags",
        help: "Comma-separated user IDs",
        validate: (v: string) =>
          v && !/^(\d+\s*,\s*)*\d+$/.test(v.trim())
            ? "Must be comma-separated numbers"
            : null,
      },
      {
        key: "USER_SESSION",
        label: "User Session",
        placeholder: "StringSession...",
        help: "For userbot features",
      },
    ],
  },
  {
    id: "performance",
    title: "Stream Performance",
    icon: Server,
    description: "Tune concurrency and buffering.",
    fields: [
      {
        key: "STREAM_CONCURRENCY",
        label: "Concurrency",
        placeholder: "4",
        default: "4",
        type: "number",
        help: "Parallel download parts",
        validate: (v: string) =>
          v && (isNaN(+v) || +v < 1 || +v > 64) ? "Must be 1-64" : null,
      },
      {
        key: "STREAM_BUFFER_COUNT",
        label: "Buffer Count",
        placeholder: "8",
        default: "8",
        type: "number",
        help: "Memory buffer blocks",
        validate: (v: string) =>
          v && (isNaN(+v) || +v < 1 || +v > 128) ? "Must be 1-128" : null,
      },
      {
        key: "STREAM_TIMEOUT_SEC",
        label: "Timeout (s)",
        placeholder: "30",
        default: "30",
        type: "number",
        help: "Request timeout",
        validate: (v: string) =>
          v && (isNaN(+v) || +v < 1) ? "Must be a positive number" : null,
      },
      {
        key: "STREAM_MAX_RETRIES",
        label: "Max Retries",
        placeholder: "3",
        default: "3",
        type: "number",
        help: "Retry attempts per block",
        validate: (v: string) =>
          v && (isNaN(+v) || +v < 0) ? "Must be 0 or more" : null,
      },
    ],
  },
];

const values = ref<Record<string, string>>({});
const tags = ref<Record<string, string[]>>({ ALLOWED_USERS: [] });
const tagInputs = ref<Record<string, string>>({ ALLOWED_USERS: "" });
const openSections = ref<Record<string, boolean>>({
  required: true,
  optional: false,
  performance: false,
});
const copied = ref(false);

// Initialize values
sections.forEach((s) =>
  s.fields.forEach((f) => {
    if (f.type === "boolean") {
      values.value[f.key] = f.default || "false";
    } else if (f.type !== "tags") {
      values.value[f.key] = "";
    }
  }),
);

function toggleBool(key: string) {
  values.value[key] = values.value[key] === "true" ? "false" : "true";
}

function handleTagKeydown(e: KeyboardEvent, key: string) {
  const input = tagInputs.value[key]?.trim();
  if ((e.key === "," || e.key === "Enter") && input) {
    e.preventDefault();
    if (/^\d+$/.test(input) && !tags.value[key]!.includes(input)) {
      tags.value[key]!.push(input);
      syncTagsToValues(key);
    }
    tagInputs.value[key] = "";
  }
  if (
    e.key === "Backspace" &&
    !tagInputs.value[key] &&
    tags.value[key]!.length
  ) {
    tags.value[key]!.pop();
    syncTagsToValues(key);
  }
}

function removeTag(key: string, index: number) {
  tags.value[key]!.splice(index, 1);
  syncTagsToValues(key);
}

function syncTagsToValues(key: string) {
  values.value[key] = tags.value[key]?.join(", ") ?? "";
}

const activeFields = computed(() => {
  return sections
    .flatMap((s) => s.fields)
    .filter((f) => {
      if (f.type === "tags") return (tags.value[f.key]?.length ?? 0) > 0;
      const val = values.value[f.key];
      return val && val.trim() !== "";
    });
});

const envContent = computed(() => {
  return activeFields.value
    .map((f) => `${f.key}=${values.value[f.key]?.trim() ?? ""}`)
    .join("\n");
});

const hasRequiredFields = computed(() => {
  return sections
    .find((s) => s.id === "required")
    ?.fields.every((f) => values.value[f.key]?.trim());
});

const validationErrors = computed(() => {
  const errors: Record<string, string | null> = {};
  sections
    .flatMap((s) => s.fields)
    .forEach((f) => {
      if (f.type === "tags") {
        // Validate tag input only if there's something typed but not committed
        const input = tagInputs.value[f.key]?.trim();
        errors[f.key] =
          input && !/^\d+$/.test(input) ? "Must be a number" : null;
      } else {
        errors[f.key] = f.validate
          ? f.validate(values.value[f.key] || "")
          : null;
      }
    });
  return errors;
});

const hasErrors = computed(() =>
  Object.values(validationErrors.value).some((e) => e !== null),
);

function toggleSection(id: string) {
  openSections.value[id] = !openSections.value[id];
}

function copyToClipboard() {
  navigator.clipboard.writeText(envContent.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function downloadFile() {
  const blob = new Blob([envContent.value + "\n"], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fsb.env";
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div
    class="mt-8 border border-border-subtle rounded-xl bg-surface-raised overflow-hidden shadow-sm"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-white/5"
    >
      <div class="flex items-center gap-2">
        <FileText :size="18" class="text-fsb" />
        <span class="font-mono text-sm font-semibold text-text-primary"
          >fsb.env builder</span
        >
      </div>
      <span
        class="font-mono text-[0.6rem] tracking-widest uppercase text-fsb px-2 py-0.5 border border-fsb/20 rounded bg-fsb/5"
        >Interactive</span
      >
    </div>

    <div class="p-5 flex flex-col gap-4">
      <!-- Sections -->
      <div
        v-for="section in sections"
        :key="section.id"
        class="border border-border-subtle rounded-lg bg-surface/50 overflow-hidden transition-all duration-300"
        :class="{
          'border-fsb/20 shadow-[0_0_15px_rgba(0,255,133,0.05)]':
            openSections[section.id],
        }"
      >
        <button
          @click="toggleSection(section.id)"
          class="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors text-left"
        >
          <div class="flex items-center gap-3">
            <div
              class="p-1.5 rounded-md transition-colors"
              :class="
                openSections[section.id]
                  ? 'bg-fsb/10 text-fsb'
                  : 'bg-border-subtle text-text-tertiary'
              "
            >
              <component :is="section.icon" :size="16" />
            </div>
            <div>
              <div class="font-semibold text-sm text-text-primary">
                {{ section.title }}
              </div>
              <div class="text-xs text-text-tertiary">
                {{ section.description }}
              </div>
            </div>
          </div>
          <component
            :is="openSections[section.id] ? ChevronUp : ChevronDown"
            :size="16"
            class="text-text-tertiary transition-transform duration-300"
          />
        </button>

        <!-- Fields -->
        <div
          v-show="openSections[section.id]"
          class="px-4 pb-4 pt-1 border-t border-border-subtle space-y-3 animate-fade-in"
        >
          <div v-for="field in section.fields" :key="field.key">
            <div class="flex items-center justify-between mb-1.5">
              <label
                :for="`env-${field.key}`"
                class="text-xs font-semibold text-text-secondary flex items-center gap-1"
              >
                {{ field.label }}
                <span v-if="field.required" class="text-fsb" title="Required"
                  >*</span
                >
              </label>
              <a
                v-if="field.helpLink"
                :href="field.helpLink"
                target="_blank"
                class="text-[0.65rem] text-fsb/60 hover:text-fsb transition-colors flex items-center gap-0.5"
              >
                {{ field.help }} <Info :size="10" />
              </a>
              <span v-else class="text-[0.65rem] text-text-tertiary">{{
                field.help
              }}</span>
            </div>

            <!-- BOOLEAN: Toggle switch -->
            <div
              v-if="field.type === 'boolean'"
              class="flex items-center justify-between bg-black/20 border border-border-subtle rounded-lg px-3 py-2.5"
            >
              <span class="font-mono text-xs text-text-tertiary"
                >{{ field.key }}=<span
                  :class="
                    values[field.key] === 'true'
                      ? 'text-fsb'
                      : 'text-text-primary'
                  "
                  >{{ values[field.key] }}</span
                ></span
              >
              <button
                @click="toggleBool(field.key)"
                class="relative w-10 h-[22px] rounded-full transition-colors duration-200 cursor-pointer border-none outline-none"
                :class="
                  values[field.key] === 'true' ? 'bg-fsb/80' : 'bg-white/10'
                "
                :aria-checked="values[field.key] === 'true'"
                role="switch"
              >
                <span
                  class="absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                  :class="
                    values[field.key] === 'true' ? 'translate-x-[18px]' : ''
                  "
                ></span>
              </button>
            </div>

            <!-- TAGS: Chip/tag input -->
            <div v-else-if="field.type === 'tags'">
              <div
                class="flex flex-wrap items-center gap-1.5 bg-black/20 border rounded-lg px-3 py-2 min-h-[38px] transition-all cursor-text"
                :class="
                  validationErrors[field.key]
                    ? 'border-red-500/50 ring-1 ring-red-500/20'
                    : 'border-border-subtle focus-within:border-fsb/40 focus-within:ring-1 focus-within:ring-fsb/20'
                "
                @click="
                  (
                    $refs[`tagInput-${field.key}`] as HTMLInputElement[]
                  )?.[0]?.focus()
                "
              >
                <span
                  class="font-mono text-xs text-text-tertiary select-none shrink-0"
                  >{{ field.key }}=</span
                >
                <!-- Tags -->
                <span
                  v-for="(tag, i) in tags[field.key]"
                  :key="i"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-fsb/10 border border-fsb/20 text-[0.7rem] font-mono text-fsb"
                >
                  {{ tag }}
                  <button
                    @click.stop="removeTag(field.key, i)"
                    class="hover:text-red-400 transition-colors cursor-pointer bg-transparent border-none p-0 leading-none"
                  >
                    <X :size="10" />
                  </button>
                </span>
                <!-- Input -->
                <input
                  :ref="`tagInput-${field.key}`"
                  v-model="tagInputs[field.key]"
                  @keydown="handleTagKeydown($event, field.key)"
                  :placeholder="
                    (tags[field.key]?.length ?? 0) === 0
                      ? field.placeholder
                      : 'Add more...'
                  "
                  class="flex-1 min-w-[80px] bg-transparent border-none text-xs font-mono text-text-primary placeholder:text-text-tertiary/40 py-0.5 focus:outline-none focus:ring-0"
                  autocomplete="off"
                  spellcheck="false"
                />
              </div>
            </div>

            <!-- DEFAULT: Text/number input -->
            <div v-else>
              <div
                class="flex items-center bg-black/20 border rounded-lg transition-all"
                :class="
                  validationErrors[field.key]
                    ? 'border-red-500/50 ring-1 ring-red-500/20'
                    : 'border-border-subtle focus-within:border-fsb/40 focus-within:ring-1 focus-within:ring-fsb/20'
                "
              >
                <span
                  class="pl-3 py-2 font-mono text-xs text-text-tertiary select-none"
                  >{{ field.key }}=</span
                >
                <input
                  :id="`env-${field.key}`"
                  v-model="values[field.key]"
                  :type="field.type === 'number' ? 'number' : 'text'"
                  :placeholder="field.placeholder"
                  class="flex-1 bg-transparent border-none text-xs font-mono text-text-primary placeholder:text-text-tertiary/40 py-2 pr-3 focus:outline-none focus:ring-0"
                  autocomplete="off"
                  spellcheck="false"
                />
              </div>
            </div>

            <!-- Validation error -->
            <div
              v-if="validationErrors[field.key]"
              class="mt-1 text-[0.6rem] text-red-400 font-mono pl-1"
            >
              {{ validationErrors[field.key] }}
            </div>
            <!-- Default hint -->
            <div
              v-if="field.default && field.type !== 'boolean'"
              class="mt-1 text-[0.6rem] text-text-tertiary/60 font-mono pl-1"
            >
              Default: {{ field.default }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview & Actions -->
    <div class="border-t border-border-subtle bg-surface/30">
      <div v-if="envContent" class="p-4 border-b border-border-subtle">
        <div
          class="text-[0.65rem] text-text-tertiary uppercase tracking-wider font-mono mb-2"
        >
          Preview
        </div>
        <pre
          class="font-mono text-xs text-fsb leading-relaxed overflow-x-auto whitespace-pre-wrap break-all"
          >{{ envContent }}</pre
        >
      </div>

      <div class="p-4 flex gap-3 flex-wrap">
        <button
          @click="downloadFile"
          :disabled="!hasRequiredFields || hasErrors"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-fsb text-black font-semibold text-sm hover:bg-fsb-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Download :size="16" />
          Download fsb.env
        </button>
        <button
          @click="copyToClipboard"
          :disabled="!envContent"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-medium text-text-primary text-sm hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <component
            :is="copied ? Check : Copy"
            :size="16"
            :class="copied ? 'text-fsb' : ''"
          />
          {{ copied ? "Copied" : "Copy" }}
        </button>
      </div>

      <div
        v-if="!hasRequiredFields"
        class="px-4 pb-4 text-xs text-text-tertiary"
      >
        <span class="text-fsb">*</span> Fill required fields to download.
      </div>
    </div>
  </div>
</template>
