import '@testing-library/jest-dom';

// Polyfill IntersectionObserver for jsdom — must use a real function/class so `new` works
class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  observe = vi.fn((el: Element) => {
    this.callback([{ isIntersecting: true, target: el } as IntersectionObserverEntry], this);
  });
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Polyfill localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    length: 0,
    key: () => null,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Polyfill matchMedia (used by Framer Motion useReducedMotion)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// requestAnimationFrame: no-op (returns an id but never fires)
let rafId = 0;
window.requestAnimationFrame = vi.fn(() => ++rafId);
window.cancelAnimationFrame = vi.fn();
