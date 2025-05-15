const countryName = new URLSearchParams(location.search).get('name');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    const country = data[0];

    // Flag and name
    document.getElementById('flag').src = country.flags.svg;
    document.getElementById('flag').alt = `${country.name.common} flag`;
    document.getElementById('country-name').textContent = country.name.common;

    // Left details
    document.getElementById('column-left').innerHTML = `
      <p><strong>Native Name:</strong> ${Object.values(country.name.nativeName || {})[0]?.common || country.name.common}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Sub Region:</strong> ${country.subregion}</p>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
    `;

    // Right details
    document.getElementById('column-right').innerHTML = `
      <p><strong>Top Level Domain:</strong> ${country.tld?.join(', ')}</p>
      <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : 'N/A'}</p>
      <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : 'N/A'}</p>
    `;

    // Borders
    const borders = country.borders || [];
    const borderContainer = document.getElementById('border-buttons');
    if (borders.length === 0) {
      borderContainer.innerHTML = `<span>No bordering countries</span>`;
    } else {
      fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(allCountries => {
          const codeMap = {};
          allCountries.forEach(c => {
            codeMap[c.cca3] = c.name.common;
          });

          borderContainer.innerHTML = borders.map(code => {
            const name = codeMap[code] || code;
            return `<a class="border-button" href="?name=${encodeURIComponent(name)}">${name}</a>`;
          }).join('');
        });
    }

  })
  .catch((err) => {
    console.error("Error fetching country:", err);
    document.getElementById("country-name").textContent = "Failed to load country data.";
  });



  // dark mode js 
const toggle = document.getElementById('darkToggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Optional: Toggle text label (Dark Mode ↔ Light Mode)
  toggle.innerHTML = document.body.classList.contains('dark-mode')
    ? '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'
    : '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
});

  




// new js For Country.Html 
// jo hmne bnaya tha vo bhi thk h prr abb bnaenge according anurag sir , CSS hmne remove krdi copy krni  h to chatgpt se kr lenge 



// 81 line start hai Anurag sir ka Code 

