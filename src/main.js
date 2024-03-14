import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';
import getImagesFromServer from './js/pixabay-api';
import createGalleryMarkup from './js/render-functions';
import iziToast from 'izitoast';
import cross from './img/cross.png';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const search = document.querySelector('.search');
const loader = document.querySelector('.loader');
const searchForm = document.querySelector('.input-container');
const loadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const perPage = 15;
let page;
let searchValue;

function show(selector) {
  selector.classList.remove('is-hidden');
}

function hidden(selector) {
  selector.classList.add('is-hidden');
}

function resetPage() {
  gallery.innerHTML = null;
}

function showError() {
  hidden(loadMore);
  hidden(loader);
  return iziToast.error({
    message:
      'Sorry, there are no images matching <br>your search query. Please try again!',
    position: 'topRight',
    backgroundColor: '#ef4040',
    titleColor: '#ffffff',
    messageColor: '#ffffff',
    iconUrl: cross,
    theme: 'dark',
    close: false,
  });
}
function scroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (page === 1) return;
  const rect = galleryItem.getBoundingClientRect();
  window.scrollBy({ behavior: 'smooth', top: (rect.height + 24) * 2 });
}

async function showImages() {
  if (searchValue.trim() === '') {
    showError();
    return;
  }

  show(loader);
  const data = await getImagesFromServer(searchValue, page, perPage);
  if (data.hits.length < 1) return showError();
  const markup = createGalleryMarkup(data.hits);
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  hidden(loader);
  if (page * perPage < data.totalHits) show(loadMore);
  else {
    hidden(loadMore);
    showError();
  }
  scroll();
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  resetPage();
  hidden(loadMore);
  searchValue = search.value.trim();
  page = 1;
  showImages();
});

loadMore.addEventListener('click', () => {
  page++;
  showImages();
});
