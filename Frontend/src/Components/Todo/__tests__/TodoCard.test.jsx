import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../TodoCard';

describe('TodoCard Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  test('renders and interacts with todo card', () => {
    render(
      <TodoCard
        title="Test Todo"
        body="Test Content"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Verify content
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Test interactions
    fireEvent.click(screen.getByText('Edit Todo'));
    fireEvent.click(screen.getByText('Delete Todo'));

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});