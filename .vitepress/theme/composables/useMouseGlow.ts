import { shallowRef } from "vue";

export type CoordinateMode = "percent" | "pixel";

interface UseMouseGlowOptions {
  /**
   * `'percent'` — returns 0-100 values relative to element size (for badges/buttons).
   * `'pixel'`   — returns raw pixel offset from element origin (for cards).
   * @default 'pixel'
   */
  mode?: CoordinateMode;
}

/**
 * Composable for mouse-following glow effects on an element.
 *
 * Returns reactive coordinates and event handlers to wire up in the template.
 * Supports two coordinate modes for different visual use cases.
 */
export function useMouseGlow(options: UseMouseGlowOptions = {}) {
  const { mode = "pixel" } = options;

  const mouseX = shallowRef(mode === "percent" ? 50 : 0);
  const mouseY = shallowRef(mode === "percent" ? 50 : 0);
  const isHovering = shallowRef(false);

  function onMouseMove(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();

    if (mode === "percent") {
      mouseX.value = ((e.clientX - rect.left) / rect.width) * 100;
      mouseY.value = ((e.clientY - rect.top) / rect.height) * 100;
    } else {
      mouseX.value = e.clientX - rect.left;
      mouseY.value = e.clientY - rect.top;
    }

    isHovering.value = true;
  }

  function onMouseLeave() {
    isHovering.value = false;
  }

  return { mouseX, mouseY, isHovering, onMouseMove, onMouseLeave };
}
