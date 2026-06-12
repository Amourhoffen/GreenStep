import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ActivityLogger from '../pages/ActivityLogger';
import { useAppStore } from '../store/appStore';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../store/appStore', () => ({
  useAppStore: vi.fn(),
}));

describe('ActivityLogger Component', () => {
  it('renders all activity categories correctly', () => {
    useAppStore.mockReturnValue({ addActivity: vi.fn(), user: { uid: '123' }, isDarkMode: false });
    render(
      <BrowserRouter>
        <ActivityLogger />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Transport/i)).toBeInTheDocument();
    expect(screen.getByText(/Food/i)).toBeInTheDocument();
    expect(screen.getByText(/Energy/i)).toBeInTheDocument();
  });
});
