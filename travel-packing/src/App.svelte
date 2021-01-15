<script>
	import Login from './Login.svelte';
	import Checklist from './Checklist.svelte';
	import NotFound from './NotFound.svelte'

	let component = Login;

	const hashMap = {
		'#login': Login,
		'#checklist': Checklist
	}

	const hashChange = () => (component = hashMap[location.hash] || NotFound)
</script>

<svelte:window on:hashchange={hashChange} />

<main>
	<h1 class="hero">Travel Packing Checklist</h1>
	<svelte:component
		this={component}
		on:login={() => (location.href = '/#checklist')}
		on:logout={() => (location.href = '/#login')}
	/>
</main>

<style>
	:global(body) {
		background-color: cornflowerblue;
	}

	.hero {
		--height: 7rem; /* defines a css variable */

		background-color: orange;
		color: white;
		font-size: 4rem;
		height: var(--height); /* uses css variable */
		line-height: var(--height); /* uses css variable */
		margin: 0 0 3rem 0;
		text-align: center;
		vertical-align: middle;
		width: 100vw;
	}

	main {
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
</style>