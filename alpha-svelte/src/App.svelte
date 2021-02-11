<script>
	import SearchBox from './SearchBox.svelte'
	let ticker = '';
</script>
<style>
	h1 { text-align: center; }
</style>
<h1>
	AlphaSvelte
</h1>

<SearchBox />

<h1>
	{ticker}
</h1>