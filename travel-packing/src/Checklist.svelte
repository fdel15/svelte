<script>
  import Category from './Category.svelte';
  import {getGuid, sortOnName} from './util';
  import {createEventDispatcher} from 'svelte';
  import Dialog from './Dialog.svelte';
  import {flip} from 'svelte/animate';

  const dispatch = createEventDispatcher();
  const options = {duration: 700};

  let categoryArray = [];
  let categories = {};
  let categoryName;
  let message = '';
  let show = 'all';
  let dialog = null;

  $: categoryArray = sortOnName(Object.values(categories));

  function addCategory() {
    const duplicate = Object.values(categories).some(
      cat => cat.name === categoryName
    );

    if (duplicate) {
      message = `The cateogry "$(categoryName)" already exists`;
      dialog.showModal();
      return;
    }

    const id = getGuid();
    categories[id] = {id, name: categoryName, items: {}};
    categories = categories // triggers update
    categoryName = '';
  }

  function clearAllChecks() {
    for (const category of Object.values(categories)) {
      for (const item of Object.values(category.items)) {
        item.packed = false;
      }
    }

    categories = categories; // triggers update
  }

  function deleteCategory(category) {
    if (Object.values(category.items).length) {
      message = 'This category is not empty.';
      dialog.showModal();
      return;
    }

    delete categories[category.id]
    categories = categories // triggers update
  }

  restore(); // must do this before the first call to persist

  $: if (categories) persist();

  function persist() {
    localStorage.setItem('travel-packing', JSON.stringify(categories));
  }

  function restore() {
    const text = localStorage.getItem('travel-packing');
    if (text && text !== '{}') {
      categories = JSON.parse(text);
    }
  }

  let dragAndDrop = {
    drag(event, categoryId, itemId) {
      const data = {categoryId, itemId};
      event.dataTransfer.setData('text/plain', JSON.stringify(data));
    },

    drop(event, categoryId) {
      const json = event.dataTransfer.getData('text/plain');
      const data = JSON.parse(json);
      const category = categories[data.categoryId];
      const item = category.items[data.itemId];

      delete category.items[data.itemId];

      categories[categoryId].items[data.itemId] = item; // Adds item to another category
      categories = categories // triggers update
    }
  }
</script>

<section>
  <header>
    <form on:submit|preventDefault={addCategory}>
      <label>
        <input data-testid='category-name-input' required bind:value={categoryName}>
      </label>

      <button type="submit" disabled={!categoryName}>Add Category</button>
      <button type="button" class='logout-btn' on:click={() => dispatch('logout')}>Log Out</button>
    </form>

    <p>
      Suggested categories include Backpack, Clothes,
      <br />
      Last Minute, Medicines, Running Gear, and Toiletries.
    </p>

    <div class='radios'>
      <h3>Show</h3>
      <label>
        <input name='show' type='radio' value='all' bind:group={show}>
        All
      </label>

      <label>
        <input name='show' type='radio' value='packed' bind:group={show}>
        Packed
      </label>

      <label>
        <input name='show' type='radio' value='unpacked' bind:group={show}>
        Unpacked
      </label>

      <button class="clear" on:click={clearAllChecks}>Clear All Checks</button>
    </div>
  </header>

  <div class="categories">
    {#each categoryArray as category (category.id)}
      <div class='wrapper' animate:flip={options} >
        <Category 
          bind:category
          {categories}
          {show}
          {dragAndDrop}
          on:delete={() => deleteCategory(category)}
          on:persist={persist}
        />
      </div>
    {/each}
  </div>
</section>

<Dialog title="Category" bind:dialog>
  <div>{message}</div>
</Dialog>

<style>
  .categories {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .clear {
    margin-left: 30px;
  }

  input[type='radio'] {
    --size: 24px;
    height: var(--size);
    width: var(--size);
    margin-left: 10px;
  }

  .logout-btn {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .radios {
    display: flex;
    align-items: center;
  }

  .radios > label:not(:first-of-type) {
    display: inline-flex;
    align-items: center;
    margin-left: 1em;
  }

  .radios > label > input {
    margin-bottom: -3px;
    margin-right: 5px;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    margin-top: 1em;
  }



  .wrapper {
    display: 'inline-block';
  }
</style>