import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Todo from '../Todo';

describe('Todo Component - Guest User', () => {
  beforeEach(() => {
    // Clear any existing todos
    sessionStorage.clear();
  });

  test('creates and deletes a todo without authentication', async () => {
    // Render component
    render(<Todo />);

    // Create todo
    fireEvent.click(screen.getByPlaceholderText('TITLE'));
    fireEvent.change(screen.getByPlaceholderText('TITLE'), {
      target: { value: 'Test Title' }
    });
    fireEvent.change(screen.getByPlaceholderText('Body'), {
      target: { value: 'Test Body' }
    });
    fireEvent.click(screen.getByText('Add'));

    // Verify creation
    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    // Delete todo
    fireEvent.click(screen.getAllByText('Delete Todo')[0]);

    // Verify deletion
    await waitFor(() => {
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });
  });
});