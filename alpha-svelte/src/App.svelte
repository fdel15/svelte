<script>
	import { ticker } from './stores.js'
	import SearchBox from './SearchBox.svelte'
	import StockDetails from './StockDetails.svelte'
	
</script>

<style>
	h1 { text-align: center; }
	main { margin: 1% 10%; }
</style>

<h1>
	AlphaSvelte
</h1>

<main>
	<SearchBox />

	{#if $ticker}
		<StockDetails />
	{/if}
</main>