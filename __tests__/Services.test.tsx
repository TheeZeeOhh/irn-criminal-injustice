import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ServicesPage from '../src/app/services/page';

// Strip Framer Motion-specific props before forwarding to DOM
const MOTION_PROPS = new Set([
  'initial', 'animate', 'exit', 'variants', 'transition',
  'whileInView', 'whileHover', 'whileTap', 'whileFocus', 'whileDrag',
  'viewport', 'layout', 'layoutId', 'layoutDependency',
  'drag', 'dragConstraints', 'dragElastic', 'dragMomentum',
  'onAnimationStart', 'onAnimationComplete', 'onUpdate',
  'onViewportEnter', 'onViewportLeave',
  'transformTemplate', 'custom',
]);

function stripMotionProps(props: Record<string, unknown>) {
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) {
    if (!MOTION_PROPS.has(k)) clean[k] = v;
  }
  return clean;
}

vi.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  const makeEl = (tag: string) =>
    // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
    React.forwardRef(({ children, ...rest }: any, ref: any) =>
      React.createElement(tag, { ref, ...stripMotionProps(rest) }, children)
    );
  return {
    motion: {
      div: makeEl('div'),
      span: makeEl('span'),
      h1: makeEl('h1'),
      p: makeEl('p'),
      section: makeEl('section'),
      button: makeEl('button'),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AnimatePresence: ({ children }: any) => children,
    useReducedMotion: () => false,
  };
});

describe('ServicesPage', () => {
  it('renders the hero title', () => {
    render(<ServicesPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /what we do for the people/i })
    ).toBeInTheDocument();
  });

  it('renders the IRN crest with descriptive alt text', () => {
    render(<ServicesPage />);
    expect(
      screen.getByAltText(/injustice reform network crest/i)
    ).toBeInTheDocument();
  });

  it('renders all six direct services', () => {
    render(<ServicesPage />);
    expect(screen.getByText(/no more bars voting initiative/i)).toBeInTheDocument();
    expect(screen.getByText(/legal education & rights advocacy/i)).toBeInTheDocument();
    expect(screen.getByText(/fines, costs & garnishment relief/i)).toBeInTheDocument();
    expect(screen.getByText(/youth campaign & policy school/i)).toBeInTheDocument();
    expect(screen.getByText(/until they see us too/i)).toBeInTheDocument();
    expect(screen.getByText(/policy analysis & legislative drafting/i)).toBeInTheDocument();
  });

  it('renders the booking section with all four engagement formats', () => {
    render(<ServicesPage />);
    expect(screen.getByText('Keynote Address')).toBeInTheDocument();
    expect(screen.getByText('Workshop / Training')).toBeInTheDocument();
    expect(screen.getByText('Panel & Moderation')).toBeInTheDocument();
    expect(screen.getByText('Strategy Consulting')).toBeInTheDocument();
  });

  it('renders the honoraria tiers', () => {
    render(<ServicesPage />);
    expect(screen.getByText('Community & Grassroots')).toBeInTheDocument();
    expect(screen.getByText('Nonprofits & Universities')).toBeInTheDocument();
    expect(screen.getByText('Corporate & Government')).toBeInTheDocument();
  });

  it('links the booking CTA to the contact page', () => {
    render(<ServicesPage />);
    const cta = screen.getByRole('link', { name: /start a booking inquiry/i });
    expect(cta).toHaveAttribute('href', '/contact');
  });
});
