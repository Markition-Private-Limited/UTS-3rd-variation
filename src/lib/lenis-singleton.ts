import type Lenis from "lenis";

let _lenis: Lenis | null = null;

export function registerLenis(instance: Lenis) {
  _lenis = instance;
}

export function unregisterLenis() {
  _lenis = null;
}

export function scrollToPageTop() {
  if (_lenis) {
    _lenis.scrollTo(0, { duration: 0.8 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
