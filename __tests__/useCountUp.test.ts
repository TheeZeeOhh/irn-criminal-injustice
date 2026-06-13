import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountUp } from '../src/app/hooks/useCountUp';

// rAF is mocked as a no-op in vitest.setup.ts.
// We test the hook's observable contract: initial state, disabled state, cleanup.

describe('useCountUp', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns end value when trigger is false', () => {
    const { result } = renderHook(() => useCountUp(147, 2000, false));
    expect(result.current).toBe(147);
  });

  it('returns 0 initially even when trigger is true (animation is async)', () => {
    const { result } = renderHook(() => useCountUp(147, 2000, true));
    // When trigger is true, it immediately schedules reset to 0 on mount
    expect(result.current).toBe(0);
  });

  it('calls requestAnimationFrame when trigger is true', () => {
    renderHook(() => useCountUp(50, 1000, true));
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it('does not call requestAnimationFrame when trigger is false', () => {
    renderHook(() => useCountUp(50, 1000, false));
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it('calls cancelAnimationFrame on unmount', () => {
    const { unmount } = renderHook(() => useCountUp(100, 1000, true));
    unmount();
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('handles end=0 without error', () => {
    expect(() => renderHook(() => useCountUp(0, 1000, true))).not.toThrow();
  });

  it('handles large numbers without error', () => {
    expect(() => renderHook(() => useCountUp(1000000, 2000, false))).not.toThrow();
  });

  it('restarts animation when trigger changes from false to true', () => {
    const { rerender } = renderHook(
      ({ trigger }) => useCountUp(100, 1000, trigger),
      { initialProps: { trigger: false } },
    );
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    rerender({ trigger: true });
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });
});
