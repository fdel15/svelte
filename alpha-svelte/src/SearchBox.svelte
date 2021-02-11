<script>
	import {ticker_search} from './alphaVantage.js'
	let keywords = '';
	let results;
	
	async function search() {
		results = await ticker_search(keywords)
	};
</script>

<div>
	<input
		 bind:value={keywords}
		 placeholder='Search by stock ticker'
		 on:change={search}
	/>

	{#if results }
		{#each results as result}
			<li>{result['1. symbol']} | {result['2. name']} | {result['4. region']}</li>
		{/each}
	{/if}
</div>

<style>
	div { width: 100%; margin: 1% 10%; }
	input { width: 100%; }
</style>