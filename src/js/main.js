import NewsApiService from './news-service';
import { cardsTemplate } from './markup-template';
import LoadMoreBtn from './load-more-btn';
import { refs } from './refs';
// import { Notify } from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import throttle from 'lodash.throttle';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if (newsApiService.query === '') {
    alert('Normalnoe');
    return;
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendHitsMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendHitsMarkup(articles) {
  const markup = articles.map(item => cardsTemplate(item)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearArticlesContainer() {
  refs.gallery.innerHTML = '';
}
