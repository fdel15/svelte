import { alphaData, baseUrl, normalizeData } from './base.js';

//   Returns an array of objects based on keyword
//   Normalized data has the following shape for each object:
//     {
//   		"symbol": "TESO",
//   		"name": "Tesco Corporation USA",
//   		"type": "Equity",
//   		"region": "United States",
//   		"marketOpen": "09:30",
//   		"marketClose": "16:00",
//   		"timezone": "UTC-05",
//   		"currency": "USD",
//   		"matchScore": "0.8889"
//   }
export async function tickerSearch(keywords) {
  const alphaFunction = 'SYMBOL_SEARCH'
  const url = `${baseUrl}&function=${alphaFunction}&keywords=${keywords}`

  const results = await alphaData(url)

  return results.bestMatches.reduce((arr, data) => {
    data = normalizeData(data)
    return arr.concat(data)
  }, [])
}

//   Normalized data has the following shape:
//     {
//       "symbol": "IBM",
//       "open": "122.0000",
//       "high": "122.2050",
//       "low": "120.6300",
//       "price": "120.9100",
//       "volume": "5374831",
//       "latest_trading_day": "2021-02-11",
//       "previous_close": "122.2400",
//       "change": "-1.3300",
//       "change_percent": "-1.0880%"
//     }
export async function stockQuote(ticker) {
  const alphaFunction = 'GLOBAL_QUOTE'
  const url = `${baseUrl}&function=${alphaFunction}&symbol=${ticker}`

  const results = await alphaData(url)

  return normalizeData(results['Global Quote'])
}