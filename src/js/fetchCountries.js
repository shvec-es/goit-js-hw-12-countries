async function fetchCountries(searchQuery) {
    const response = await fetch(`https://restcountries.com/v2/name/${searchQuery}`);
    const country = response.json();

    return country;     
}

export default { fetchCountries };