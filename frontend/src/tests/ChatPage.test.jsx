import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ChatPage from '../pages/ChatPage';
import { BrowserRouter } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

vi.mock('../store/appStore', () => ({
  useAppStore: vi.fn(),
}));

vi.mock('../services/geminiClient', () => ({
  sendChatMessage: vi.fn().mockResolvedValue({ response: "Hello from AI", model: "Mock AI", icon: "🤖" })
}));

describe('ChatPage Component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
  });
  it('renders the chat interface', () => {
    useAppStore.mockReturnValue({ user: { uid: '123' }, isDarkMode: false, chatMessages: [] });
    render(
      <BrowserRouter>
        <ChatPage />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/Ask.*about CO₂/i)).toBeInTheDocument();
  });

  it('allows user to type a message and send', async () => {
    useAppStore.mockReturnValue({ 
      user: { uid: '123' }, 
      isDarkMode: false, 
      chatMessages: [],
      addChatMessage: vi.fn((msg) => {
        // mock state update by pushing to chatMessages or simply rendering text
        document.body.innerHTML += `<div>${msg.content}</div>`;
      }),
      updateChatMessage: vi.fn(),
    });
    render(
      <BrowserRouter>
        <ChatPage />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Ask.*about CO₂/i);
    fireEvent.change(input, { target: { value: 'How to save energy?' } });
    expect(input.value).toBe('How to save energy?');
    
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  });
});
