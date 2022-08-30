// import axios from 'axios';

const API_KEY = '?key=11240134-58b8f655e9e0f8ae8b6e8e7de&q=';
const BASE_URL = 'https://pixabay.com/api/';
const BASE_OPTIONS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    return fetch(
      `${BASE_URL}${API_KEY}${this.searchQuery}${BASE_OPTIONS}${this.page}`
    )
      .then(r => r.json())
      .then(data => {
        this.incrementPage();

        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// export default async function fetchImages(value, page) {
// const url = 'https://pixabay.com/api/';
// const key = '11240134-58b8f655e9e0f8ae8b6e8e7de';
// const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

//   return await axios.get(`${url}${filter}`).then(response => response.data);
// }
