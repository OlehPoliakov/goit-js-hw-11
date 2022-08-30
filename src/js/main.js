import NewsApiService from './news-service';
import { cardsTemplate } from './markup-template';
import LoadMoreBtn from './load-more-btn';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if (newsApiService.query === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
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
    console.log(articles);
    appendHitsMarkup(articles);
    loadMoreBtn.enable();

    if (articles.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.hide();
      refs.endCollectionText.classList.remove('is-hidden');
    }

    if (articles.length > 0) {
      Notify.success(`Hooray! We found ${articles.length} images.`);
      lightbox.refresh();
      refs.endCollectionText.classList.add('is-hidden');
    }
  });
}

function appendHitsMarkup(articles) {
  const markup = articles.map(item => cardsTemplate(item)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearArticlesContainer() {
  refs.gallery.innerHTML = '';
}
