import todoReducer, { addTodo, removeTodo } from '../CreateTodoSlice';

describe('todoSlice', () => {
  test('should handle initial state', () => {
    expect(todoReducer(undefined, {})).toEqual([]);
  });

  test('should handle addTodo', () => {
    const newTodo = { id: 1, title: 'Test Todo', body: 'Test Content' };
    expect(todoReducer([], addTodo(newTodo))).toEqual([newTodo]);
  });

  test('should handle removeTodo', () => {
    const initialState = [{ id: 1 }, { id: 2 }];
    expect(todoReducer(initialState, removeTodo(1))).toEqual([{ id: 2 }]);
  });
});
