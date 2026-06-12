import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import TreePlanting from '../pages/TreePlanting';
import { BrowserRouter } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

vi.mock('../store/appStore', () => ({
  useAppStore: vi.fn(),
}));

vi.mock('../services/geminiClient', () => ({
  analyzeTreePhoto: vi.fn().mockResolvedValue({ 
    analysis: { species: 'Mock Tree', confidence_pct: 99, estimated_age_years: 5 }
  })
}));

describe('TreePlanting Component', () => {
  it('renders the tree scanning page', () => {
    useAppStore.mockReturnValue({ user: { uid: '123' }, isDarkMode: false });
    render(
      <BrowserRouter>
        <TreePlanting />
      </BrowserRouter>
    );
    
    // Check for some static text that we expect on this page
    expect(screen.getAllByText(/Tree/i).length).toBeGreaterThan(0);
  });
});
