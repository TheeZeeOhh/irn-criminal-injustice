import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResourcesPage from '../src/app/resources/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('ResourcesPage', () => {
  it('renders the main directory title and kicker', () => {
    render(<ResourcesPage />);
    expect(screen.getByRole('heading', { level: 1, name: /maryland community resource library/i })).toBeInTheDocument();
    expect(screen.getByText(/mutual aid & community resources/i)).toBeInTheDocument();
  });

  it('renders the search input field', () => {
    render(<ResourcesPage />);
    expect(screen.getByPlaceholderText(/search resources by name, keywords/i)).toBeInTheDocument();
  });

  it('renders all 11 category filter buttons', () => {
    render(<ResourcesPage />);
    expect(screen.getByRole('button', { name: /elders/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /employment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /health and crisis support/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /housing/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /lgbtqia\+ organizations & pride centers/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pflag chapters/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /trans and intersex/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /veterans/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /your rights and legal help/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /youth & education/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /events & programs/i })).toBeInTheDocument();
  });

  it('renders the default active category (Elders) resources', () => {
    render(<ResourcesPage />);
    // Default active tab: Elders
    expect(screen.getByRole('heading', { level: 2, name: 'Elders' })).toBeInTheDocument();
    expect(screen.getByText('Maryland Department of Aging')).toBeInTheDocument();
    expect(screen.getByText('SAGE')).toBeInTheDocument();
  });

  it('switches categories and displays corresponding resources when clicking a filter tab', () => {
    render(<ResourcesPage />);
    
    // Switch to Housing
    const housingTab = screen.getByRole('button', { name: /housing/i });
    fireEvent.click(housingTab);

    expect(screen.getByRole('heading', { level: 2, name: 'Housing' })).toBeInTheDocument();
    expect(screen.getByText('Maryland Safe Haven (Baltimore Safe Haven)')).toBeInTheDocument();
  });

  it('filters resources based on the search query', () => {
    render(<ResourcesPage />);
    const searchInput = screen.getByPlaceholderText(/search resources by name, keywords/i);

    fireEvent.change(searchInput, { target: { value: 'Planned Parenthood' } });

    // Should render matching search results
    expect(screen.getByRole('heading', { level: 2, name: 'Search Results' })).toBeInTheDocument();
    expect(screen.getByText('Planned Parenthood of Maryland')).toBeInTheDocument();
  });

  it('submits a resource proposal and displays success toast feedback', async () => {
    render(<ResourcesPage />);

    // Fill form fields
    const nameInput = screen.getByLabelText(/resource name/i);
    const urlInput = screen.getByLabelText(/website url/i);
    const descInput = screen.getByLabelText(/resource description/i);
    const form = document.getElementById('proposal-form') as HTMLFormElement;

    fireEvent.change(nameInput, { target: { value: 'Test Pride Coalition' } });
    fireEvent.change(urlInput, { target: { value: 'https://testpride.org' } });
    fireEvent.change(descInput, { target: { value: 'An inclusive support network for queer community members.' } });

    // Submit form
    await act(async () => {
      fireEvent.submit(form);
    });

    // Should display success message toast asynchronously
    const toast = await screen.findByText(/proposal cached in local storage!|resource proposal submitted successfully!/i);
    expect(toast).toBeInTheDocument();
  });

  it('toggles the theme and localization dynamically', () => {
    render(<ResourcesPage />);

    // By default, renders the English title
    expect(screen.getByRole('heading', { level: 1, name: /maryland community resource library/i })).toBeInTheDocument();

    // Find language button
    const langBtn = screen.getAllByRole('button', { name: /change language to español/i })[0];
    expect(langBtn).toBeInTheDocument();

    // Toggle language
    fireEvent.click(langBtn);

    // Title should update to Spanish
    expect(screen.getByRole('heading', { level: 1, name: /biblioteca de recursos comunitarios de maryland/i })).toBeInTheDocument();

    // Categories title should be in Spanish
    expect(screen.getByRole('heading', { level: 2, name: /categorías/i })).toBeInTheDocument();

    // Elders category button should translate
    expect(screen.getByRole('button', { name: /personas mayores/i })).toBeInTheDocument();

    // Switch back to English
    const langBtnEn = screen.getAllByRole('button', { name: /change language to english/i })[0];
    fireEvent.click(langBtnEn);
    expect(screen.getByRole('heading', { level: 1, name: /maryland community resource library/i })).toBeInTheDocument();

    // Find theme button
    const themeBtn = screen.getAllByRole('button', { name: /switch to light theme/i })[0];
    expect(themeBtn).toBeInTheDocument();

    // Toggle theme
    fireEvent.click(themeBtn);

    // The data-theme attribute on documentElement should toggle to light
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Toggle theme back
    const themeBtnDark = screen.getAllByRole('button', { name: /switch to dark theme/i })[0];
    fireEvent.click(themeBtnDark);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
