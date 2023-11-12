const contriesContainer = document.getElementById('contries');
const regionSelect = document.getElementById('region');

// Contry Input
const contryInput = document.getElementById('contry');
// Region Input
const regionInput = document.getElementById('region');

// escuchar el "regionInput" al cambio
regionInput.addEventListener('change', (e) => {
  const regionSelected = e.target.value;
  fetchByRegion(regionSelected);
})

// funcion para buscar en "data.json" por region
async function fetchByRegion(regionSelected) {
  try {
    const url = '../data.json';
    const response = await fetch(url);
    const data = await response.json();
    filterByRegion(data, regionSelected);
  } catch (error) {
    console.log(error);
  }
}

// funcion de filtrar por region
function filterByRegion(contries, regionSelected) {
  if (regionSelected === 'all') {
    app();
    return;
  }
  // filtrar todos los paises que pertenecen a la region seleccionada por el usuario
  const contriesSameRegion = contries.filter(contry => contry.region === regionSelected);
  // limpiar el HTML
  cleanHTML(contriesContainer);
  contriesSameRegion.forEach(contry => {
    renderContryCards(contry);
  });
}

// escuchar el "contryInput" constantemente
contryInput.addEventListener('input', (e) => {
  let contryName = e.target.value;
  // cambiar a mayusculas cada primer letra de cada palabra
  let contryNameArray = contryName.split(' ');
  for (var i = 0; i < contryNameArray.length; i++) {
    contryNameArray[i] = contryNameArray[i].charAt(0).toUpperCase() + contryNameArray[i].slice(1);
  }
  const contryNameArray2 = contryNameArray.join(' ');
  // si no hay nada en el input recargar todos los paises
  if (contryNameArray2.trim() === '') {
    app();
  } else {
    // buscar por nombre en "data.json" eliminando espacios en blanco
    fetchByName(contryNameArray2.trim());
  }
})

// al cargar el documento inicir la app
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

// funcion de buscar por nombre
async function fetchByName(contryName) {
  try {
    const url = '../data.json';
    const response = await fetch(url);
    const data = await response.json();
    identifyByName(data, contryName);
  } catch (error) {
    console.log(error);
  }
}

// identificar el pais que se quiere buscar filtrando por su nombre
function identifyByName(contries, contryName) {
  const foundContry = contries.filter(contry => contry.name == contryName);
  // si existe algun pais que coincida con el nombre entonces mostrarlo en el HTML
  if (foundContry.length !== 0) {
    renderContryByName(foundContry[0]);
  }
}

// mostrar pais buscado por el usuario
function renderContryByName(foundContry) {

  // limpiar todo lo que contenga el contenedor
  cleanHTML(contriesContainer);

  const { name, population, region, capital, numericCode, flags } = foundContry;
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
  infoPopulation.innerHTML = `Population: <span>${separator(population)}</span>`;
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
}

// array donde se añadiran cada pais y si codigo alfa
let alpha3CodeStr = [];

// array donde se añadiran las regiones 
let regions = [];

// muestra todos los paises de "data.json"
function showData(contries) {

  // limpiar todo lo que contenga el contenedor
  cleanHTML(contriesContainer);

  // itero en cada pais para extraer sus datos
  contries.forEach(contry => {
    const { name, alpha3Code } = contry;

    // añado cada una de las regiones
    regions.push(contry.region);

    // añado nombre y codigo alfa al array "alpha3CodeStr"
    alpha3CodeStr.push({name: name, alpha3Code: alpha3Code});

    // muestro las cards en el HTML de todos los paises
    renderContryCards(contry);
  });

  // elimino las regiones repetidas añadiendolas a un Set
  const regionsSet = new Set(regions);

  // funcion que llena automaticamente el Select de Regiones
  fillRegionsSelect(regionsSet);

  // almaceno en Local Storage el array de objetos de regiones
  localStorage.setItem('alpha3CodeArray', JSON.stringify(alpha3CodeStr));
}

// muestro en el HTML todos los paises
function renderContryCards(contry) {
  const { name, population, region, capital, numericCode, flags } = contry;

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
  infoPopulation.innerHTML = `Population: <span>${separator(population)}</span>`;
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
}

// funcion que separa por comas cada 3 digitos
function separator(number) {
  let separateNumber = number.toString().split('.');
  separateNumber[0] = separateNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return separateNumber.join('.');
}

function cleanHTML(section) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
}

// lleno automaticamente las regiones que estan dentro del Set "regionsSet"
function fillRegionsSelect(regionsSet) {
  cleanHTML(regionSelect);

  const optionDisabled = document.createElement('option');
  optionDisabled.disabled = 'true';
  optionDisabled.selected = 'true';
  optionDisabled.innerText = 'Filter by Region';
  regionSelect.appendChild(optionDisabled);

  const optionAll = document.createElement('option');
  optionAll.value = 'all';
  optionAll.innerText = 'All';
  regionSelect.appendChild(optionAll);

  // <option disabled selected>Filter by Region</option>
  regionsSet.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.innerText = region;
    regionSelect.appendChild(option);
  });
}