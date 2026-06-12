import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./firebase', () => ({
  auth: {},
  isConfigured: true,
  db: {}
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    // Basic test to verify App mounts (will show loader initially or login screen)
    render(<App />);
    expect(document.body).toBeDefined();
  });
});
