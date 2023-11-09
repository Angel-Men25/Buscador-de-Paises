const informationSection = document.getElementById('information');

document.addEventListener('DOMContentLoaded', obtainIdParam);

function obtainIdParam() {
  const URLParams = new URLSearchParams(window.location.search);
  const idContry = URLParams.get('id');
  fetchDetailsContry(idContry);
}

async function fetchDetailsContry(idContry) {
  try {
    const url = '../data.json';
    const response = await fetch(url);
    const data = await response.json();
    identifyContry(data, idContry);
  } catch (error) {
    console.log(error);
  }
}

function identifyContry(contries, idContry) {
  const foundContry = contries.filter(contry => contry.numericCode == idContry);
  // destructuring
  const { flags, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders  } = foundContry[0];
  // flags.svg
  // topLevelDomain[0]
  // currencies[0].name
  // languages
  //    let languagesArray = [];
  //    languages.forEach(lang => {
  //      languagesArray.push(lang.name);
  //    });
  //    console.log(languagesArray.join(', '));
  // borders
  // borders.forEach(bord => {
  //   console.log(bord);
  // });

  // META TAG TITLE
  const titleTag = document.getElementsByTagName('title');
  titleTag[0].innerText = name;

  // information__picture DIV
  const informationPictureDiv = document.createElement('div');
  informationPictureDiv.classList.add('information__picture');

  // information__img
  const informationImg = document.createElement('img');
  informationImg.classList.add('information__img');
  informationImg.loading = 'lazy';
  informationImg.src = flags.svg;
  informationImg.alt = name;

  informationPictureDiv.appendChild(informationImg);

  // information__texts DIV
  const informationTextsDiv = document.createElement('div');
  informationTextsDiv.classList.add('information__texts');

  // information__title
  const informationTitle = document.createElement('h1');
  informationTitle.classList.add('information__title');
  informationTitle.innerText = name;

  informationTextsDiv.appendChild(informationTitle);

  // information__details DIV
  const informationDetailsDiv = document.createElement('div');
  informationDetailsDiv.classList.add('information__details');

  informationTextsDiv.appendChild(informationDetailsDiv);

  // details DIV 1
  const detailsDiv1 = document.createElement('div');
  detailsDiv1.classList.add('details');

  // details DIV 2
  const detailsDiv2 = document.createElement('div');
  detailsDiv2.classList.add('details');

  informationDetailsDiv.appendChild(detailsDiv1);
  informationDetailsDiv.appendChild(detailsDiv2);

  // native name
  const nativeNameP = document.createElement('p');
  nativeNameP.innerHTML = `<p>Native Name: <span>${nativeName}</span></p>`;
  // population
  const populationP = document.createElement('p');
  populationP.innerHTML = `<p>Population: <span>${population}</span></p>`;
  // regions
  const regionsP = document.createElement('p');
  regionsP.innerHTML = `<p>Region: <span>${region}</span></p>`;
  // sub region
  const subRegionP = document.createElement('p');
  subRegionP.innerHTML = `<p>Sub Region: <span>${subregion}</span></p>`;
  // capital
  const capitalP = document.createElement('p');
  capitalP.innerHTML = `<p>Capital: <span>${capital}</span></p>`;

  detailsDiv1.appendChild(nativeNameP);
  detailsDiv1.appendChild(populationP);
  detailsDiv1.appendChild(regionsP);
  detailsDiv1.appendChild(subRegionP);
  detailsDiv1.appendChild(capitalP);

  // top level domain
  const topLevelDomainP = document.createElement('p');
  topLevelDomainP.innerHTML = `<p>Top Level Domain: <span>${topLevelDomain[0]}</span></p>`;
  // currencies
  const currenciesP = document.createElement('p');
  currenciesP.innerHTML = `<p>Currencies: <span>${currencies[0].name}</span></p>`;
  // languages
  let languagesArray = [];
  languages.forEach(lang => {
    languagesArray.push(lang.name);
  });
  const languagesP = document.createElement('p');
  languagesP.innerHTML = `<p>Languages: <span>${languagesArray.join(', ')}</span></p>`;
  // console.log(languagesArray.join(', '));
  detailsDiv2.appendChild(topLevelDomainP);
  detailsDiv2.appendChild(currenciesP);
  detailsDiv2.appendChild(languagesP);

  // information__border DIV
  const informationBorderDiv = document.createElement('div');
  informationBorderDiv.classList.add('information__border');

  informationTextsDiv.appendChild(informationBorderDiv);

  // border contries
  const borderContriesP = document.createElement('p');
  borderContriesP.innerText = 'Border Contries:'

  // border__contries DIV
  const borderContriesDiv = document.createElement('div');
  borderContriesDiv.classList.add('border__contries');
  // borders.forEach(bord => {
  //   console.log(bord);
  //   const borderA = document.createElement()
  // });

  informationBorderDiv.appendChild(borderContriesP);
  informationBorderDiv.appendChild(borderContriesDiv);


  informationSection.appendChild(informationPictureDiv);
  informationSection.appendChild(informationTextsDiv);
}