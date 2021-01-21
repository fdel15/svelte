import { cleanup, render } from '@testing-library/svelte';
import Item from '../src/Item.svelte';

describe('Item', () => {
    const categoryId = 1;
    const item = { id: 2, name: 'socks', packed: false };
    const dragAndDrop = {}; // required by component but not used in test
    const props = { categoryId, dragAndDrop, item };

    afterEach(cleanup);

    test('should render', async() => {
        const { getByTestId, getByText } = render(Item, props);
        const checkbox = document.querySelector('input[type=checkbox]');
        expect(checkbox).not.toBeNull(); // checks that checkbox can be found
        expect(getByText(item.name)); // item name can be found
        expect(getByTestId('delete')) // delete button exists
    })

    test('should match snapshot', () => {
        const { container } = render(Item, props);
        expect(container).toMatchSnapshot();
    });

    // Is draggable
    // has delete button

    // When editing
    // input element
    // updates name
    // on blur toggles editing to false


    // When not editing
    // span element displays name
    // click event will toggle editing
})