require('dotenv').config()

const APIKEY = process.env;

export const baseUrl = `https://www.alphavantage.co/query?apikey=${APIKEY}`

export async function alphaData(url, headers = {}) {
  const response = await fetch(url, headers)

  return response.json();
}

export function normalizeData(data) {
  return Object.entries(data).reduce((normalizedObject, [key, value]) => {
    var normalKey = key.match(/[a-z].+/)[0].replace(/\s/g, '_')
    normalizedObject[normalKey] = value
    return normalizedObject
  }, {})
};