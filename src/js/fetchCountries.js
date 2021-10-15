function fetchCountries (searchQuery) {
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
        .then(resp => { return resp.json() })
}

export default { fetchCountries };