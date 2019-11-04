const moviesTab = document.getElementById('movies');
const recommended = document.getElementById('recommended');
const genderSelect = document.getElementById('gender');

let obj = [];
const doFetch = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let url = 'https://www.omdbapi.com/?t=' + arr[i].split(' ').join('+') + '&apikey=8f7b2287';
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        obj.push(data);
        showMovies(obj);
        carousel();
        gender.innerHTML = fillSelect(obj.map(dat => dat.Genre));
      });
  }
};

doFetch(PELICULAS);

const fillSelect = (gender) => {
  gender = gender.toString().split(',');
  gender = Array.from(new Set(gender));

  let template = '<option value="0" selected disabled>Géneros</option>';

  for (let j = 0; j < gender.length; j++) {
    template += `<option value=${gender[j]}>${gender[j]}</option>`;
  }

  return template;
};

const buscador = document.getElementById('buscador');
const buscar = document.getElementById('buscar');
buscar.addEventListener('click', () => {
  document.getElementById('container').innerHTML = '';
  document.getElementById('carousel').classList.add('hide');
  const movie = buscador.value.split(' ').join('+');
  const url = `https://www.omdbapi.com/?s=${movie}&apikey=8f7b2287`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      document.getElementById('container').classList.remove('hide');
      document.getElementById('container').classList.add('container');
      document.getElementById('containerImdb').classList.remove('hide');
      document.getElementById('containerImdb').classList.add('container');
      document.getElementById('containerImdb').innerHTML = showCardMovies(data.Search.filter(dat => dat.Poster !== 'N/A'));
    });
});

const showMovies = (array) => {
  let text = `<div id="lastClone" class="car-show">
  <img class="carousel-img" src="${array[array.length - 1].Poster}"/>
  <a class="su-titulo" href="#">${array[array.length - 1].Title}</a>
  <p class="year">${array[array.length - 1].Year}</p>
</div>`;
  for (let i = 0; i < array.length; i++) {
    const card = `
      <div name="jalar" id="${array[i].imdbID}" class="car-show">
        <img class="carousel-img" src="${array[i].Poster}"/>
        <a class="su-titulo" href="#">${array[i].Title}</a>
        <p class="year">${array[i].Year}</p>
      </div>`;
    text += card;
  }
  text += `<div id="firstClone" class="car-show">
  <img class="carousel-img" src="${array[0].Poster}"/>
  <a class="su-titulo" href="#">${array[0].Title}</a>
  <p class="year">${array[0].Year}</p>
</div>`;
  document.querySelector('.carousel-slide').innerHTML = text;
};

const carousel = () => {
  const carouselSlide = document.querySelector('.carousel-slide');
  const carouselImages = document.querySelectorAll('.carousel-slide div');
  const prevBtn = document.querySelector('#preBtn');
  const nextBtn = document.querySelector('#nextBtn');
  let counter = 1;
  const size = carouselImages[0].clientWidth;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

  nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = 'transform 0.4s ease-in-out';
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  });

  prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = 'transform 0.4s ease-in-out';
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  });

  carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
      carouselSlide.style.transition = 'none';
      counter = carouselImages.length - 2;
    } else if (carouselImages[counter].id === 'firstClone') {
      carouselSlide.style.transition = 'none';
      counter = carouselImages.length - counter;
    }
  });
};

const movieCards = document.getElementById('cards-movie');
movieCards.addEventListener('click', () => {
  modalBuscar.classList.remove('flexbox');
  modalBuscar.classList.remove('show');
  modalBuscar.classList.add('hide');
  const postMovie = event.target.parentElement.id;
  console.log(postMovie);
  const idMovie = obj.map(ele => ele.imdbID).indexOf(postMovie);
  console.log(idMovie);
  if (event.target.parentElement.getAttribute('name') === 'jalar') {
    // mostramos modal
    document.getElementById('modal').classList.remove('hide');
    document.getElementById('preBtn').classList.add('hide');
    document.getElementById('nextBtn').classList.add('hide');
    // insertamos caracteristicas en el modal
    document.getElementById('info-movie').innerHTML = `
     <!--<div class="info-descripcion flex">-->
      <img class="modal-poster" src="${obj[idMovie].Poster}"/> 
      <div class="dat-movie">
      <h2 class="title">${obj[idMovie].Title}</h2>
      <p class="modal-year">${obj[idMovie].Year}</p>
      <p class="">${obj[idMovie].Plot}</p>
      <span class="color">Writer: </span><p class=""> ${obj[idMovie].Writer}</p>
      <span class="color">Director: </span><p class=""> ${obj[idMovie].Director}</p>
      <span class="color">Genre: </span><p class=""> ${obj[idMovie].Genre}</p>
      <span class="color">Actors: </span><p class=""> ${obj[idMovie].Actors}</p>
      <span class="color">Time: </span><p class=""> ${obj[idMovie].Runtime}</p>
      </div>`;
  }
});

const container = document.getElementById('container');
container.addEventListener('click', () => {
  document.getElementById('search-by-name').classList.add('hide');
  const postMovie = event.target.parentElement.id;
  console.log(postMovie);
  const idMovie = obj.map(ele => ele.imdbID).indexOf(postMovie);
  console.log(idMovie);
  if (event.target.parentElement.getAttribute('name') === 'jalar') {
    // mostramos modal
    document.getElementById('modal').classList.remove('hide');
    // insertamos caracteristicas en el modal
    document.getElementById('info-movie').innerHTML = `
     <!--<div class="info-descripcion flex">-->
      <img class="modal-poster" src="${obj[idMovie].Poster}"/> 
      <div class="dat-movie">
      <h2 class="title">${obj[idMovie].Title}</h2>
      <p class="modal-year">${obj[idMovie].Year}</p>
      <p class="">${obj[idMovie].Plot}</p>
      <span class="color">Writer: </span><p class=""> ${obj[idMovie].Writer}</p>
      <span class="color">Director: </span><p class=""> ${obj[idMovie].Director}</p>
      <span class="color">Genre: </span><p class=""> ${obj[idMovie].Genre}</p>
      <span class="color">Actors: </span><p class=""> ${obj[idMovie].Actors}</p>
      <span class="color">Time: </span><p class=""> ${obj[idMovie].Runtime}</p>
      </div>`;
  }
});

const cerrar = document.getElementById('close');
cerrar.addEventListener('click', () => {
  document.getElementById('modal').classList.add('hide');
  document.getElementById('preBtn').classList.remove('hide');
  document.getElementById('nextBtn').classList.remove('hide');
});

const up = document.querySelector('#up');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    up.classList.remove('hide');
  } else {
    up.classList.add('hide');
  }
});

up.addEventListener('click', () => {
  window.scrollTo(0, 0);
});

const searching = document.getElementById('botonBuscar');
const modalBuscar = document.getElementById('search-by-name');

searching.addEventListener('click', () => {
  document.getElementById('video').classList.remove('video');
  document.getElementById('video').classList.add('hide');
  document.getElementById('containerImdb').innerHTML = '';
  modalBuscar.classList.remove('hide');
  modalBuscar.classList.add('show');
  modalBuscar.classList.add('flexbox');
});

const showCardMovies = (array) => {
  let text = '';
  for (let i = 0; i < array.length; i++) {
    const card = `
      <div name="jalar" id="${array[i].imdbID}" class="inline">
        <img class="filter-poster" src="${array[i].Poster}"/>
       <p class="width"><a class="su-titulo" href="#">${array[i].Title}</a></p>
      </div>`;
    text += card;
  }
  return text;
};

countries.addEventListener('change', () => {
  document.getElementById('video').classList.remove('video');
  document.getElementById('video').classList.add('hide');
  document.getElementById('containerImdb').innerHTML = '';
  document.getElementById('gender').selectedIndex = '0';
  modalBuscar.classList.remove('flexbox');
  modalBuscar.classList.remove('show');
  modalBuscar.classList.add('hide');
  document.getElementById('container').innerHTML = '';
  document.getElementById('containerImdb').classList.add('hide');
  document.getElementById('carousel').classList.add('hide');
  const country = document.getElementById('countries').value;
  let text = '';
  console.log(country);
  if (country === '1') {
    text = showCardMovies(obj);
  } else {
    const a = filterCountry(obj, country);
    text = showCardMovies(a);
  }
  document.getElementById('container').innerHTML = text;
});

gender.addEventListener('change', () => {
  document.getElementById('video').classList.remove('video');
  document.getElementById('video').classList.add('hide');
  document.getElementById('containerImdb').innerHTML = '';
  document.getElementById('countries').selectedIndex = '0';
  modalBuscar.classList.remove('flexbox');
  modalBuscar.classList.remove('show');
  modalBuscar.classList.add('hide');
  document.getElementById('container').innerHTML = '';
  document.getElementById('containerImdb').classList.add('hide');
  document.getElementById('carousel').classList.add('hide');
  const gender = document.getElementById('gender').value;
  const a = filterGender(obj, gender);
  document.getElementById('container').innerHTML = showCardMovies(a);
});


recommended.addEventListener('click', () => {
  document.getElementById('video').classList.remove('hide');
  document.getElementById('video').classList.add('video');
  document.getElementById('filters').classList.add('hide');
  document.getElementById('containerImdb').innerHTML = '';
  modalBuscar.classList.remove('flexbox');
  modalBuscar.classList.remove('show');
  modalBuscar.classList.add('hide');
  document.getElementById('container').classList.add('hide');
  document.getElementById('carousel').classList.remove('hide');
  document.getElementById('containerImdb').classList.add('hide');
  document.getElementById('container').innerHTML = '';
  showMovies(obj);
  carousel();
});
moviesTab.addEventListener('click', () => {
  document.getElementById('containerImdb').innerHTML = '';
  modalBuscar.classList.remove('flexbox');
  modalBuscar.classList.remove('show');
  modalBuscar.classList.add('hide');
  document.getElementById('filters').classList.remove('hide');
  document.getElementById('containerImdb').classList.remove('container');
  document.getElementById('containerImdb').classList.add('hide');
  document.getElementById('carousel').classList.add('hide');
  document.getElementById('container').innerHTML = showCardMovies(obj);
  document.getElementById('container').classList.remove('hide');
  document.getElementById('container').classList.add('show');
  document.getElementById('container').classList.add('container');
  document.getElementById('video').classList.remove('video');
  document.getElementById('video').classList.add('hide');
});

const movieSearch = document.getElementById('containerImdb');
movieSearch.addEventListener('click', () => {
  const postMovie = event.target.parentElement.id;
  const url = `https://www.imdb.com/title/${postMovie}/`;
  window.open(url);
});