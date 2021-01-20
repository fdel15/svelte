import { cleanup, fireEvent, render, waitFor } from '@testing-library/svelte';
import TodoList from '../components/TodoList.svelte';

describe('TodoList', () => {
    const PREDEFINED_TODOS = 2; // Number of Todos automatically added to TodoList component because of the default we set in the component for the todos variable

    afterEach(cleanup); // unmounts any components mounted in previous test

    // helper function used by other tests
    function expectTodoCount(count) {
        return waitFor(() => { // waits for the DOM to be updated. It returns a promise.
            const lis = document.querySelectorAll('li');
            expect(lis.length).toBe(count);
        })
    }

    test('should render', async() => {
        const { getByText } = render(TodoList);
        expect(getByText('Todo in Svelte'));
        expect(getByText('1 of 2 remaining'));
        expect(getByText('Archive Completed')); // button
        await expectTodoCount(PREDEFINED_TODOS);
    });

    // Creating a Todo
    test('should add a todo', async() => {
        const { getByTestId, getByText } = render(TodoList);

        const input = getByTestId('todo-input');
        const value = 'buy milk';
        fireEvent.input(input, { target: { value } });
        fireEvent.click(getByText('Add'));

        await expectTodoCount(PREDEFINED_TODOS + 1);
        expect(getByText(value));
    });

    // Deleting a Todo
    test('should delete a todo', async() => {
        const { getAllByText, getByText } = render(TodoList);
        const text = 'learn Svelte'; // first todo hardcoded in component
        expect(getByText(text));

        const deleteBtns = getAllByText('Delete');
        fireEvent.click(deleteBtns[0]); // deletes first todo
        await expectTodoCount(PREDEFINED_TODOS - 1);
    });

    // Toggling Done
    test('should toggle a todo', async() => {
        const { container, getByText } = render(TodoList);
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');

        await fireEvent.click(checkboxes[1]); // second todo
        expect(getByText('0 of 2 remaining'));

        await fireEvent.click(checkboxes[0]); // first todo
        expect(getByText('1 of 2 remaining'));

    });

    // Archiving Complete
    test('should archive complete', async() => {
        const { getByText } = render(TodoList);
        const archiveButton = getByText('Archive Completed');

        expect(archiveButton) // Make sure button exists

        await fireEvent.click(archiveButton)
        expect(getByText('1 of 1 remaining')) // test that status was updated

        await expectTodoCount(PREDEFINED_TODOS - 1);
    });


});