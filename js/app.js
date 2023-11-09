document.addEventListener('DOMContentLoaded', app);

async function app() {
  try {
    const url = '../data.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    showData(data);
  } catch (error) {
    console.log(error);
  }
}

function showData(contries) {
  console.log(contries[0].nativeName);
  // contries.forEach(contry => {
  //   console.log(contry.name);
  // });
}