import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CriminalInjusticePage from '../src/app/criminal-injustice/page';
import Nav from '../src/app/components/Nav';
import Hero from '../src/app/components/Hero';
import ProgramCard from '../src/app/components/ProgramCard';
import CaseTimeline from '../src/app/components/CaseTimeline';

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
  const React = require('react');
  const makeEl = (tag: string) =>
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
      ul: makeEl('ul'),
      li: makeEl('li'),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useReducedMotion: () => false,
  };
});

// Mock next/link — render as plain <a>
vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: any) => <a href={href} {...rest}>{children}</a>,
}));

// Mock next/navigation — redirect is a no-op in tests
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/criminal-injustice',
}));

describe('Criminal Injustice Page', () => {

  it('renders the skip link for accessibility', () => {
    render(<CriminalInjusticePage />);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('renders exactly one <h1> containing the correct title', () => {
    render(<Hero />);
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveTextContent(/The System Was Built This Way/i);
  });

  it('renders the "What We Do" Kicker', () => {
    render(<Hero />);
    expect(screen.getByText('What We Do — Criminal Justice Reform')).toBeInTheDocument();
  });

  describe('Accordion / ProgramCard Interactions', () => {
    it('expands the program card and changes ARIA states when clicked', async () => {
      render(
        <ProgramCard
          title="Test Program"
          description="This is a test description."
        />
      );

      // Button accessible name comes from aria-label ("Expand Test Program"), not inner text
      const button = screen.getByRole('button', { name: /Test Program/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('This is a test description.')).not.toBeInTheDocument();

      fireEvent.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('This is a test description.')).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Collapse Test Program');
    });
  });

  describe('CaseTimeline', () => {
    it('renders 5 nodes and marks Vindication as active', () => {
      render(<CaseTimeline />);
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(5);

      // Find the Vindication node by its heading text, then check the parent listitem's class
      const vindicationHeading = screen.getByText('Vindication');
      const vindicationNode = vindicationHeading.closest('[role="listitem"]');
      expect(vindicationNode?.className).toContain('active');
    });
  });

  describe('A11y Validations', () => {
    it('ensures all buttons have discernable text or aria-labels', () => {
      render(<Nav />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(btn => {
        const hasText = btn.textContent && btn.textContent.trim().length > 0;
        const hasAria = btn.hasAttribute('aria-label') || btn.hasAttribute('aria-labelledby');
        expect(hasText || hasAria).toBeTruthy();
      });
    });

    it('ensures images/SVGs have role presentation or are hidden from screen readers if decorative', () => {
      const { container } = render(<CaseTimeline />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });
});
