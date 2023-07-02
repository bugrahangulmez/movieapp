import axios from 'axios';

import {api_key} from './key';

// endpoints
export const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${api_key}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${api_key}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${api_key}`;
const nowPlayingMoviesEndpoint = `${apiBaseUrl}/movie/now_playing?api_key=${api_key}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${api_key}`;
export const searchMovieEndpoint = `${apiBaseUrl}/search/movie?api_key=${api_key}`;
const genresEndpoint = `${apiBaseUrl}/genre/movie/list?api_key=${api_key}`;
const genreMovieListEndpoint = `${apiBaseUrl}/discover/movie?api_key=${api_key}`;

const apiCall = async (endpoint: string, params?: any) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params,
  };
  try {
    const resp = await axios.request(options);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTrendingMovies = (page: string = '1') =>
  apiCall(`${trendingMoviesEndpoint}&page=${page}`);

export const fetchUpcomingMovies = (page: string = '1') =>
  apiCall(`${upcomingMoviesEndpoint}&page${page}`);

export const fetchTopRatedMovies = (page: string = '1') =>
  apiCall(`${topRatedMoviesEndpoint}&page=${page}`);

export const fetchNowPlayingMovies = (page: string = '1') =>
  apiCall(`${nowPlayingMoviesEndpoint}&page=${page}`);

export const fetchPopularMovies = (page: string = '1') =>
  apiCall(`${popularMoviesEndpoint}&page=${page}`);

export const fetchMovieDetail = (id: string) =>
  apiCall(`${apiBaseUrl}/movie/${id}?api_key=${api_key}`);

export const fetchCast = (id: string) =>
  apiCall(`${apiBaseUrl}/movie/${id}/credits?api_key=${api_key}`);

export const fetchSimilarMovies = (id: string) =>
  apiCall(`${apiBaseUrl}/movie/${id}/similar?api_key=${api_key}`);

export const fetchPersonDetail = (id: string) =>
  apiCall(`${apiBaseUrl}/person/${id}?api_key=${api_key}`);

export const fetchMoviePeopleWith = (id: string) =>
  apiCall(`${apiBaseUrl}/discover/movie?api_key=${api_key}`, {with_people: id});

export const searchMovie = (text: string, page: string = '1') =>
  apiCall(searchMovieEndpoint, {query: text, page});

export const fetchGenres = () => apiCall(genresEndpoint);

export const fetchMoviesWithGenres = (genre: string, page: string) =>
  apiCall(`${genreMovieListEndpoint}`, {with_genres: genre, page: page});

// images

export const image500 = (path: string) =>
  path && `https://image.tmdb.org/t/p/w500${path}`;
export const image342 = (path: string) =>
  path && `https://image.tmdb.org/t/p/w342${path}`;
export const image185 = (path: string) =>
  path && `https://image.tmdb.org/t/p/w185${path}`;

// fallback images
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';
