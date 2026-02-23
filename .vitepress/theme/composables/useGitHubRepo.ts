import {
  shallowRef,
  computed,
  onMounted,
  type Ref,
  type ComputedRef,
} from "vue";

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const REPO = "EverythingSuckz/TG-FileStreamBot";

// Module-level shared state — fetched once, reused by all consumers
const stars = shallowRef<number | null>(null);
const contributors = shallowRef<Contributor[]>([]);
let fetched = false;

async function fetchRepoData() {
  if (fetched) return;
  fetched = true;

  try {
    const [repoRes, contributorsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO}`),
      fetch(`https://api.github.com/repos/${REPO}/contributors?per_page=100`),
    ]);

    const repoData = await repoRes.json();
    stars.value = repoData.stargazers_count ?? null;

    const contributorsData = await contributorsRes.json();
    if (Array.isArray(contributorsData)) {
      contributors.value = contributorsData;
    }
  } catch (e) {
    console.error("Failed to fetch GitHub data:", e);
  }
}

interface UseGitHubRepoReturn {
  stars: Readonly<Ref<number | null>>;
  contributors: Readonly<Ref<Contributor[]>>;
  totalContributors: ComputedRef<number>;
  displayedContributors: ComputedRef<Contributor[]>;
}

/**
 * Composable that fetches GitHub repo metadata (stars + contributors)
 * once per page load and shares the result across all consumers.
 */
export function useGitHubRepo(): UseGitHubRepoReturn {
  onMounted(fetchRepoData);

  return {
    stars,
    contributors,
    totalContributors: computed(() => contributors.value.length),
    displayedContributors: computed(() => contributors.value.slice(0, 5)),
  };
}
