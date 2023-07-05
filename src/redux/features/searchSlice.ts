import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {searchMovieEndpoint} from '../../api/moviedb';

interface InitialState {
  text: string;
  loading: boolean;
  list: Movie[];
  page: number;
  total_results: number;
}

const initialState: InitialState = {
  text: '',
  loading: true,
  list: [],
  page: 1,
  total_results: 0,
};

type States = {search: InitialState};

export const searchMovie = createAsyncThunk(
  'search/movie',
  async (text: string, thnukAPI) => {
    let data = thnukAPI.getState();
    let states: States = data as States;
    console.log(states.search.text);

    const options = {
      method: 'GET',
      url: `${searchMovieEndpoint}`,
      params: {query: states.search.text, page: states.search.page.toString()},
    };
    try {
      const resp = await axios.request(options);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const showMoreMovie = createAsyncThunk(
  'showMore/movie',
  async (_, thunkAPI) => {
    let data = thunkAPI.getState();
    let states: States = data as States;

    const options = {
      method: 'GET',
      url: `${searchMovieEndpoint}`,
      params: {
        query: states.search.text,
        page: states.search.page.toString(),
      },
    };
    try {
      const resp = await axios.request(options);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setText: (state, {payload}: {payload: string}) => {
      state.text = payload;
      state.page = 1;
    },
    setPage: state => {
      state.page = state.page + 1;
    },
    reset: state => {
      (state.list = []), (state.page = 1), (state.text = '');
    },
  },
  extraReducers: builder => {
    builder.addCase(searchMovie.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchMovie.fulfilled, (state, {payload}) => {
      let data: ApiResp = payload;
      state.total_results = data.total_results;
      state.list = data.results;
      state.page = state.page + 1;
      state.loading = false;
    });
    builder.addCase(searchMovie.rejected, state => {
      state.loading = false;
    });
    builder.addCase(showMoreMovie.fulfilled, (state, {payload}) => {
      let oldList = state.list;
      let data: ApiResp = payload;
      state.list = [...oldList, ...data.results];
      state.page = state.page + 1;
    });
  },
});

export default searchSlice.reducer;

export const {setText, setPage, reset} = searchSlice.actions;
