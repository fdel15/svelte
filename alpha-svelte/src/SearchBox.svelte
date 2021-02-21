<script>
	import { ticker } from './stores.js'
	import { createEventDispatcher } from 'svelte';
	import { tickerSearch } from './alphaVantage/stockTimeSeries.js';
	
	const dispatch = createEventDispatcher();

	let keywords = '';
	let results;
	
	async function search() {
		results = await tickerSearch(keywords)
	};
	
	const handleClickEvent = (result) => {
		keywords = ''
		results = ''
		ticker.set(result['symbol']);
	}
</script>

<input
	bind:value={keywords}
	placeholder='Search by stock ticker'
	on:change={search}
/>

{#if results }
	{#each results as result}
		<li on:click={handleClickEvent(result)}>{result['symbol']} | {result['name']} | {result['region']}</li>
	{/each}
{/if}

<style>
	input { width: 100%; }
</style>