// Lightweight haptic feedback. Guarded for SSR + browsers without vibration.
export function tapHaptic(ms = 8) {
  if (typeof window === "undefined") return;
  if (typeof navigator === "undefined") return;
  if (!("vibrate" in navigator)) return;
  try {
    navigator.vibrate(ms);
  } catch {
    /* noop */
  }
}
