import { cleanup, render } from '@testing-library/svelte';
import Todo from './components/Todo.svelte';

describe('Todo', () => {
    const text = 'buy milk';
    const todo = { text };
    afterEach(cleanup); // unmounts any components mounted in previous test
    test('should render', () => {
        const { getByText } = render(Todo, { props: { todo } });
        const checkbox = document.querySelector('input[type="checkbox"]');
        expect(checkbox).not.toBeNull(); // found checkbox
        expect(getByText(text)); // found todo text
        expect(getByText('Delete')); // found Delete button
    });
});