import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from '../src/app/components/Accordion';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, id, role, 'aria-label': ariaLabel }: React.HTMLAttributes<HTMLDivElement> & { id?: string }) => (
      <div className={className} id={id} role={role} aria-label={ariaLabel}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const props = {
  question: 'What are my rights during a police encounter in Virginia?',
  answer: 'In Virginia, you have the right to remain silent...',
};

describe('Accordion', () => {
  it('renders the question text', () => {
    render(<Accordion {...props} />);
    expect(screen.getByText(props.question)).toBeDefined();
  });

  it('does not show answer by default', () => {
    render(<Accordion {...props} />);
    expect(screen.queryByText(props.answer)).toBeNull();
  });

  it('shows answer when button is clicked', () => {
    render(<Accordion {...props} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(screen.getByText(props.answer)).toBeDefined();
  });

  it('hides answer when button is clicked again', () => {
    render(<Accordion {...props} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByText(props.answer)).toBeNull();
  });

  it('starts with aria-expanded="false"', () => {
    render(<Accordion {...props} />);
    expect(screen.getByRole('button').getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-expanded="true" when open', () => {
    render(<Accordion {...props} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('button has aria-controls attribute', () => {
    render(<Accordion {...props} />);
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-controls')).toBeTruthy();
  });

  it('content panel id matches aria-controls', () => {
    render(<Accordion {...props} />);
    const btn = screen.getByRole('button');
    const controlsId = btn.getAttribute('aria-controls');
    fireEvent.click(btn);
    const panel = document.getElementById(controlsId!);
    expect(panel).toBeTruthy();
  });

  it('renders the chevron icon', () => {
    const { container } = render(<Accordion {...props} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('button is keyboard accessible (role=button)', () => {
    render(<Accordion {...props} />);
    const btn = screen.getByRole('button');
    expect(btn).toBeTruthy();
  });
});
