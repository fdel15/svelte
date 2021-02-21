<script>
  import { ticker } from './stores.js'
  import { onMount } from 'svelte';
  import { stockQuote } from './alphaVantage/stockTimeSeries.js'

  let quote;

  onMount(async() => {
    quote = await stockQuote($ticker);
  })
  
  $: if (quote && quote['symbol'] !== $ticker) {
    stockQuote($ticker).then((data) => quote = data)
  }

  $:current_quote = quote
</script>

<h1>
	{$ticker}
</h1>

{#if current_quote }
  <div>
    {current_quote['symbol']}
    {current_quote['latest_trading_day']}
    {current_quote['price']}
    {current_quote['volume']}
    {current_quote['previous_close']}
  </div>
 {/if}
