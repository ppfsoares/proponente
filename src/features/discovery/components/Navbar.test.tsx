import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { describe, it, expect, vi } from 'vitest';

// Mock do next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar Component', () => {
  it('should render the brand logo text', () => {
    render(<Navbar />);
    const brandElement = screen.getByText(/SOMA ALERTA/i);
    expect(brandElement).toBeDefined();
  });

  it('should have navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText(/Descobrir/i)).toBeInTheDocument();
    expect(screen.getByText(/Alertas/i)).toBeInTheDocument();
  });
});
