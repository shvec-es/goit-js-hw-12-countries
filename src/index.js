import './sass/main.scss';
const debounce = require('lodash.debounce');
import fetchCountries from './js/fetchCountries';
import countryCard from './templates/country-card.hbs';
import countriesList from './templates/country-list.hbs';
const { error } = require("@pnotify/core");
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const input = document.querySelector('.country__input');
const list = document.querySelector('.country__list');

input.addEventListener('input', debounce(onCountrySearch, 500));

function onCountrySearch(e) {
    const searchQuery = e.target.value;
    
    if (searchQuery) {
        fetchCountries(searchQuery).then(countries => {
            if (countries.length === 1) {
                const countryCardMarkup = countryCard(countries);
                list.innerHTML = countryCardMarkup;
            } else if (countries.length >= 2 && countries.length <= 10) {
                const countriesListMarkup = countriesList(countries);
                list.innerHTML = countriesListMarkup;
            } else if (countries.length > 10) {
                error({
                    text: "Too many matches found. Please enter a more specific query!",
                    delay: 1000,
                    maxTextHeight: null,
                })
            } else {
                error({
                    text: "Invalid request or country not found.",
                    delay: 1000,
                    maxTextHeight: null,
                });
            };
        }).catch((error) => {
            error({
                    text: "Something wrong!",
                    delay: 1000,
                    maxTextHeight: null,
            })
        });
    } else {
         list.innerHTML = '';
    }  
}



