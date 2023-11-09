const contriesContainer = document.getElementById('contries');
const regionSelect = document.getElementById('region');

// Contry Input
const contryInput = document.getElementById('contry');

contryInput.addEventListener('keyup', (e) => {
  let contryName = e.target.value;
  console.log(contryName);
  // fetchByName(contryName);
})

document.addEventListener('DOMContentLoaded', app);

async function app() {
  try {
    const url = '../data.json';
    const response = await fetch(url);
    const data = await response.json();
    showData(data);
  } catch (error) {
    console.log(error);
  }
}

async function fetchByName(contryName) {
  try {
    const url = '../data.json';
    const response = await fetch(url);
    const data = await response.json();
    showData(data);
  } catch (error) {
    console.log(error);
  }
}

let alpha3CodeStr = [];

function showData(contries) {
  contries.forEach(contry => {
    regions.push(contry.region);
    const { name, population, region, capital, numericCode, flags, alpha3Code } = contry;

    alpha3CodeStr.push({name: name, alpha3Code: alpha3Code});

    // card a
    const cardA = document.createElement('a');
    cardA.href = `./contry.html?id=${numericCode}`;
    cardA.target = '_blank';
    cardA.classList.add('contry__card');

    // card__picture
    const cardPicture = document.createElement('div');
    cardPicture.classList.add('card__picture');

    // card__img
    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    cardImg.loading = 'lazy';
    cardImg.src = flags.png;
    cardImg.alt = name;
    
    cardPicture.appendChild(cardImg);

    // contry__info
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('contry__info');

    // contry__title
    const contryTitle = document.createElement('h2');
    contryTitle.classList.add('contry__title');
    contryTitle.innerText = name;

    // Population
    const infoPopulation = document.createElement('p');
    infoPopulation.innerHTML = `Population: <span>${population}</span>`;
    // Region
    const infoRegion = document.createElement('p');
    infoRegion.innerHTML = `Region: <span>${region}</span>`;
    // Capital
    const infoCapital = document.createElement('p');
    infoCapital.innerHTML = `Capital: <span>${capital}</span>`;

    infoDiv.appendChild(contryTitle);
    infoDiv.appendChild(infoPopulation);
    infoDiv.appendChild(infoRegion);
    infoDiv.appendChild(infoCapital);

    cardA.appendChild(cardPicture);
    cardA.appendChild(infoDiv);

    contriesContainer.appendChild(cardA);
  });

  const regionsSet = new Set(regions);
  fillRegionsSelect(regionsSet);
  localStorage.setItem('alpha3CodeArray', JSON.stringify(alpha3CodeStr));
}

let regions = [];

function fillRegionsSelect(regionsSet) {
  regionsSet.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.innerText = region;
    regionSelect.appendChild(option);
  });
}