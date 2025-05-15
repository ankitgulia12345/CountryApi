// const countriesContainer = document.querySelector('.countries-container')

// fetch('https://restcountries.com/v3.1/all')
// .then((res)=>res.json())
// .then((data)=>{
//     data.forEach((country)=>{
//         console.log(country);
//         const countryCard = document.createElement('a')
//         countryCard.classList.add('country-card')
//         countryCard.href =`/country.html?name=${country.name.common}`
//             countryCard.innerHTML = `
//                 <img src="${country.flags.svg}" alt="flag">
//                     <div class="card-text">
//                         <h3 class="card-title">${country.name.common}</h3>
//                         <p><b>Population : </b> ${country.population.toLocaleString('en-IN')}</p>
//                         <p><b>Region : </b> ${country.region}</p>
//                         <p><b>Capital : </b> ${country.capital}</p>
//                     </div>
//                 `
//             countriesContainer.append(countryCard)
//         })
//     })








const searchInput = document.getElementById('searchInput');
const countriesContainer = document.querySelector('.countries-container');
const regionFilter = document.getElementById('region-filter');

let allCountries = [];

// Fetch and store all countries
fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    allCountries = data;
    renderCountries(allCountries);
  });

function renderCountries(countries) {
  countriesContainer.innerHTML = '';
  countries.forEach((country) => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="flag of ${country.name.common}">
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population : </b> ${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region : </b> ${country.region}</p>
        <p><b>Capital : </b> ${country.capital ? country.capital[0] : 'N/A'}</p>
      </div>
    `;
    countriesContainer.appendChild(countryCard);
  });
}

// Filter countries based on search input and region
function filterCountries() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRegion = regionFilter.value;
  
    const filtered = allCountries.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm);
      const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  
    renderCountries(filtered);
  }
  
  // Events
  searchInput.addEventListener('input', filterCountries);
  regionFilter.addEventListener('change', filterCountries);

  


// dark mode js 
const toggle = document.getElementById('darkToggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Optional: Toggle text label (Dark Mode ↔ Light Mode)
  toggle.innerHTML = document.body.classList.contains('dark-mode')
    ? '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'
    : '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
});





