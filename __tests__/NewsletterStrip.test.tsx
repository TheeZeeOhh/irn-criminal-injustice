import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsletterStrip from '../src/app/components/NewsletterStrip';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, role, 'aria-live': ariaLive }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} role={role} aria-live={ariaLive}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('NewsletterStrip', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the subscribe form by default', () => {
    render(<NewsletterStrip />);
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeDefined();
  });

  it('has a labeled email input', () => {
    render(<NewsletterStrip />);
    const input = screen.getByLabelText(/email address/i);
    expect(input).toBeDefined();
  });

  it('shows error when submitting empty email', () => {
    render(<NewsletterStrip />);
    fireEvent.submit(screen.getByRole('button', { name: /subscribe/i }).closest('form')!);
    expect(screen.getByRole('alert')).toBeDefined();
  });

  it('shows error for invalid email format', () => {
    render(<NewsletterStrip />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'notanemail' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByRole('alert')).toBeDefined();
  });

  it('shows success message after valid submission', () => {
    render(<NewsletterStrip />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText(/you're in/i)).toBeDefined();
  });

  it('persists subscribed state to localStorage', () => {
    render(<NewsletterStrip />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(input.closest('form')!);
    expect(localStorage.getItem('irn_newsletter_subscribed')).toBe('true');
  });

  it('shows success message on mount if already subscribed', () => {
    localStorage.setItem('irn_newsletter_subscribed', 'true');
    render(<NewsletterStrip />);
    expect(screen.getByText(/you're in/i)).toBeDefined();
  });

  it('clears error when user starts typing again', () => {
    render(<NewsletterStrip />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByRole('alert')).toBeDefined();
    fireEvent.change(input, { target: { value: 'a' } });
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('displays the privacy note', () => {
    render(<NewsletterStrip />);
    expect(screen.getByText(/IRN does not share your email/i)).toBeDefined();
  });

  it('email input has autocomplete="email"', () => {
    render(<NewsletterStrip />);
    const input = screen.getByLabelText(/email address/i);
    expect(input.getAttribute('autocomplete')).toBe('email');
  });
});
