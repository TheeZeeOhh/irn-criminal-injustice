import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgramCard from '../src/app/components/ProgramCard';

// Mock framer-motion to avoid animation complications in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...rest}>{children}</div>
    ),
    span: ({ children, className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span className={className} {...rest}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const defaultProps = {
  title: 'WRONGFUL CONVICTION SUPPORT',
  description: 'IRN documents cases of prosecutorial misconduct and wrongful conviction across Hampton Roads.',
};

describe('ProgramCard', () => {
  it('renders the program title', () => {
    render(<ProgramCard {...defaultProps} />);
    expect(screen.getByText('WRONGFUL CONVICTION SUPPORT')).toBeDefined();
  });

  it('does not show description by default', () => {
    render(<ProgramCard {...defaultProps} />);
    expect(screen.queryByText(defaultProps.description)).toBeNull();
  });

  it('shows description when expand button is clicked', () => {
    render(<ProgramCard {...defaultProps} />);
    const btn = screen.getByRole('button', { name: /expand wrongful conviction support/i });
    fireEvent.click(btn);
    expect(screen.getByText(defaultProps.description)).toBeDefined();
  });

  it('collapses description when button is clicked twice', () => {
    render(<ProgramCard {...defaultProps} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText(defaultProps.description)).toBeNull();
  });

  it('sets aria-expanded to false by default', () => {
    render(<ProgramCard {...defaultProps} />);
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-expanded to true when expanded', () => {
    render(<ProgramCard {...defaultProps} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('sets aria-controls pointing to a content region', () => {
    render(<ProgramCard {...defaultProps} />);
    const btn = screen.getByRole('button');
    const controlsId = btn.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
  });

  it('shows content region with correct id when expanded', () => {
    render(<ProgramCard {...defaultProps} />);
    const btn = screen.getByRole('button');
    const controlsId = btn.getAttribute('aria-controls');
    fireEvent.click(btn);
    const region = document.getElementById(controlsId!);
    expect(region).toBeTruthy();
  });

  it('renders the ember dot accent', () => {
    const { container } = render(<ProgramCard {...defaultProps} />);
    // dot has aria-hidden="true"
    const dots = container.querySelectorAll('[aria-hidden="true"]');
    expect(dots.length).toBeGreaterThan(0);
  });

  it('accepts a delay prop without error', () => {
    expect(() => render(<ProgramCard {...defaultProps} delay={0.3} />)).not.toThrow();
  });
});
