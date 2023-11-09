const contriesContainer = document.getElementById('contries');
const regionSelect = document.getElementById('region');
const darkModeBtn = document.getElementById('darkModeBtn');
const darkModeIcon = document.querySelector('#darkModeBtn i');
const bodyDOM = document.querySelector('body');

darkModeBtn.addEventListener('click', () => {
  if (bodyDOM.classList.contains('dark')) {
    bodyDOM.classList.remove('dark');
    darkModeIcon.classList.add('fa-regular');
    darkModeIcon.classList.remove('fa-solid');
  } else {
    bodyDOM.classList.add('dark');
    darkModeIcon.classList.remove('fa-regular');
    darkModeIcon.classList.add('fa-solid');
  }
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

let regions = [];

function showData(contries) {
  contries.forEach(contry => {
    regions.push(contry.region);
    const { name, population, region, capital, numericCode, flags } = contry;
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
}

function fillRegionsSelect(regionsSet) {
  regionsSet.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.innerText = region;
    regionSelect.appendChild(option);
  });
}