import { cleanup, fireEvent, render, waitFor } from '@testing-library/svelte';
import Category from '../src/Category.svelte';

describe('Category', () => {
    let itemCount = 0; // Will be set by beforeEach function

    const dragAndDrop = {}
    const category = { id: 1, name: 'Stuff', items: {} };
    const categories = [category]
    const show = 'all';
    const props = { categories, category, show, dragAndDrop };

    beforeEach(() => {
        category.items = {
            1: { id: 1, name: 'socks', packed: true },
            2: { id: 2, name: 'shoes', packed: false }
        };
        itemCount = Object.keys(category.items).length;
    })

    afterEach(cleanup);

    test('should match snapshot', async() => {
        const container = render(Category, props);
        expect(container).toMatchSnapshot();
    })

    function expectItemCount(count) {
        return waitFor(() => {
            const lis = document.querySelectorAll('li');
            expect(lis.length).toBe(count);
        })
    };

    test('should render', async() => {
        const { getByText } = render(Category, props);
        expect(getByText('Stuff'));
        expect(getByText('1 of 2 remaining'));
        expect(getByText('New Item'));
        expect(getByText('Add Item'));
        await expectItemCount(itemCount);
    });

    test('should add an item', async() => {
        const { getByText, getByTestId } = render(Category, props);
        const input = getByTestId('item-input');
        const value = 't-shirts';

        fireEvent.input(input, { target: { value } }); // populates input
        fireEvent.click(getByText('Add Item'));

        await expectItemCount(itemCount + 1); // element was added
        expect(getByText(value)); // element appears in the dom
    });

    test('should delete an item', async() => {
        const { getAllByTestId } = render(Category, props);
        const delteBtns = getAllByTestId('delete') // each item will have a delete button

        fireEvent.click(delteBtns[0]) // click first delete button
        await expectItemCount(itemCount - 1); // element was added
    })

    test('should toggle an item', async() => {
        const { container, getByText } = render(Category, props);

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes.length).toBe(2);

        const [shoesCheckbox, socksCheckBox] = checkboxes; // specific order is set by sorting by name

        expect(socksCheckBox.nextElementSibling.textContent).toBe('socks'); // verifies the order from hardcoded
        await fireEvent.click(socksCheckBox);
        expect(getByText('2 of 2 remaining')) // now nothing in the category is packed

        expect(shoesCheckbox.nextElementSibling.textContent).toBe('shoes');
        await fireEvent.click(shoesCheckbox);
        expect(getByText('1 of 2 remaining'));

    })
})