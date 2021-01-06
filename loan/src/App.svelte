<script>
	let interestRate = 5;
	let loanAmount = 200_000;
	let years = 30;
	let annualTaxes = 0;

	const MONTHS_PER_YEAR = 12;

	$:months = years * MONTHS_PER_YEAR;
	$:monthlyInterestRate = interestRate / 100 / MONTHS_PER_YEAR;
	$:numerator = loanAmount * monthlyInterestRate;
	$:denominator = 1 - (1 + monthlyInterestRate) ** -months;
	$:taxPayment = annualTaxes / MONTHS_PER_YEAR;
	$:payment = 		
		(!loanAmount || !years ? 0 :
		interestRate ? numerator / denominator :
		loanAmount / months) + taxPayment;
</script>

<main>
	<label for="loan">Amount</label>
	<input id="loan" type="number" bind:value={loanAmount} >
	
	<label for="interest">Interest Rate</label>
	<input id="interest" type="number" bind:value={interestRate} >
	
	<label for="years">Years</label>
	<input id="years" type="number" bind:value={years}>

	<label for="taxes">Annual Taxes</label>
	<input id="taxes" type="number" bind:value={annualTaxes}>
	
	<div>
		Monthly Payment: ${payment.toFixed(2)}
	</div>
</main>


<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>