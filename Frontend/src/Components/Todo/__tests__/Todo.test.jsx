import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Todo from '../Todo';

describe('Todo Component - Guest User', () => {
  beforeEach(() => {
    // Clear any existing todos
    sessionStorage.clear();
  });

  test('creates and deletes a text todo without authentication', async () => {
    render(<Todo />);

    // Create todo
    fireEvent.click(screen.getByPlaceholderText('TITLE'));
    fireEvent.change(screen.getByPlaceholderText('TITLE'), {
      target: { value: 'Test Title' }
    });

    // Use correct placeholder for text content
    fireEvent.change(screen.getByPlaceholderText('TEXT CONTENT'), {
      target: { value: 'Test Body' }
    });

    // Wait for Add button to be enabled
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    });

    // Verify creation
    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    // Delete todo (update query to match actual button text)
    const deleteButtons = await screen.findAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    // Verify deletion
    await waitFor(() => {
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });
  });
});