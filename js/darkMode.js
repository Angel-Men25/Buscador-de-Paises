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