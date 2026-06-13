import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AgentsPage from '../src/app/agents/page';

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

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('AgentsPage Global Search', () => {
  it('renders the global search bar on the agents page', () => {
    render(<AgentsPage />);
    const searchInput = screen.getByPlaceholderText(/search agents, capabilities, legal resources/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('shows suggested agents when the search input is focused but empty', () => {
    render(<AgentsPage />);
    const searchInput = screen.getByPlaceholderText(/search agents, capabilities, legal resources/i);
    
    // Focus the search input
    fireEvent.focus(searchInput);

    // Should suggest the 4 agents by default (in addition to the sidebar tabs, making count > 1)
    expect(screen.getAllByText('Intake Analyst Agent').length).toBeGreaterThan(1);
    expect(screen.getAllByText('FOIA Generator Agent').length).toBeGreaterThan(1);
    expect(screen.getAllByText('Attorney Matcher Agent').length).toBeGreaterThan(1);
    expect(screen.getAllByText('Campaign Press Writer').length).toBeGreaterThan(1);
  });

  it('filters results when typing into the search input', () => {
    render(<AgentsPage />);
    const searchInput = screen.getByPlaceholderText(/search agents, capabilities, legal resources/i);
    
    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'Norfolk' } });

    // Should display Norfolk related results (e.g. templates)
    expect(screen.getByText(/Template: Norfolk Protest Arrest/i)).toBeInTheDocument();
    expect(screen.getByText(/Template: Norfolk Arrest Records/i)).toBeInTheDocument();
  });

  it('loads a template and displays a toast when clicking on a template result', () => {
    vi.useFakeTimers();
    render(<AgentsPage />);
    const searchInput = screen.getByPlaceholderText(/search agents, capabilities, legal resources/i);
    
    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'Norfolk Protest Arrest' } });

    const result = screen.getByText(/Template: Norfolk Protest Arrest/i);
    fireEvent.click(result);

    // Flush the setTimeout timer
    vi.runAllTimers();

    // It should switch active tab to Intake Analyst and load template text into input textarea
    const textarea = screen.getByPlaceholderText(/Enter case narrative, facts, or instructions for the agent/i) as HTMLTextAreaElement;
    expect(textarea.value).toContain('peaceful protest sign when Officer Davis grabbed him');

    // Should show a toast message
    expect(screen.getByText(/Loaded template: "Norfolk Protest Arrest"/i)).toBeInTheDocument();
    
    vi.useRealTimers();
  });

  it('navigates to page path when clicking on a page search result', () => {
    render(<AgentsPage />);
    const searchInput = screen.getByPlaceholderText(/search agents, capabilities, legal resources/i);
    
    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'Know Your Rights' } });

    const result = screen.getByText('Know Your Rights (KYR)');
    fireEvent.click(result);

    // Should call router.push with path
    expect(mockPush).toHaveBeenCalledWith('/know-your-rights/');
  });
});
