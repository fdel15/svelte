	const APIKEY = ''
	const baseUrl = `https://www.alphavantage.co/query?apikey=${APIKEY}`
	
	async function alphaData(url, headers = {}) {
		const response = await fetch(url, headers)
		
		return response.json();
	}
	
	export async function ticker_search(keywords) {
		const alphaFunction = 'SYMBOL_SEARCH'
		const url = `${baseUrl}&function=${alphaFunction}&keywords=${keywords}`
		
		const results = await alphaData(url)
		
		return results.bestMatches
	}