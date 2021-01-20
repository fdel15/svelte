<script>
  import Todo from './Todo.svelte';
  
  const createTodo = (text, done = false) => ({ id: ++lastId, text, done});

  let item;
  let lastId = 0;
  let todos = [
    createTodo('learn Svelte', true),
    createTodo('build a Svelte app')
  ];


  function handleKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault
      addTodo()
    }
  }

  function addTodo() {
    todos = todos.concat(createTodo(item))
    item = ''
  }

  function toggleDone(todo) {
    const {id} = todo;
    todos = todos.map(t => (t.id === id ? {...t, done: !t.done} : t));
  }

  function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId)
  }

  function archiveCompleted() {
    todos = todos.filter(todo => !todo.done)
  }

  $: uncompletedCount = todos.filter(t => !t.done).length
  $: status = `${uncompletedCount} of ${todos.length} remaining`

</script>

<main>
	<h1>Todo in Svelte</h1>
</main>

<div>
  <h2>{status}</h2>
  <button on:click={archiveCompleted}>Archive Completed</button>
</div>

<input
  data-testid="todo-input"
  placeholder='Add new item'
  bind:value={item}
  on:keypress={handleKeyPress} 
>
<button on:click={addTodo}>Add</button>

<ul>
  {#each todos as todo}
    <Todo 
      {todo}
      on:delete={ () => deleteTodo(todo.id) }
      on:toggleDone={ () => toggleDone(todo) } 
    />
  {/each}
</ul>

<style>
  div h2 { display: inline-block; margin-right: 20px; }
  ul { list-style: none; }

  main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>