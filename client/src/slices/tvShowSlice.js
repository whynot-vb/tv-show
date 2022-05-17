import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";

import {
  showList,
  showStatus,
  showPage,
  showId,
} from "../constants/actionTypes";

const initialState = {
  status: "popular",
  searchField: "",
  page: 1,
  showList: {
    page: 1,
    results: [],
  },
};

export default function showsReducer(state = initialState, action) {
  switch (action.type) {
    case "shows/showList": {
      return {
        ...state,
        showList: action.payload.data,
      };
    }

    case "shows/setSearchField": {
      return {
        ...state,
        searchField: action.payload,
      };
    }

    case "shows/setPage": {
      return {
        ...state,
        page: action.payload,
      };
    }

    case "shows/showStatus": {
      return {
        ...state,
        status: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export function mostPopularTvShows(pageNumber) {
  return async function mostPopularTvShowsThunk(dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=${pageNumber}`
    );
    dispatch(showList(response.data, pageNumber, "popular"));
  };
}

export function onTheAirTvShows(pageNumber) {
  return async function onTheAirTvShowsThunk(dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=${pageNumber}`
    );
    dispatch(showList(response.data, pageNumber, "onTheAir"));
  };
}

export function topRatedTvShows(pageNumber) {
  return async function topRatedTvShowsThunk(dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=${pageNumber}`
    );
    dispatch(showList(response.data, pageNumber, "topRated"));
  };
}

export function searchTvShowsByName(query, pageNumber) {
  return async function searchTvShowsByNameThunk(dispatch, getState) {
    const response = await axios.get(`
    https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US&page=${pageNumber}&query=${query}&include_adult=false`);
    dispatch(showList(response.data, pageNumber, "search"));
  };
}

//(state) => state.shows.showList.results;
export const selectResults = createSelector(
  (state) => state.shows,
  (shows) => shows.showList.results
);

export const selectStatus = createSelector(
  (state) => state.shows,
  (shows) => shows.status
);

export const selectResultIds = createSelector(
  (state) => state.shows.showList,
  (showList) => showList.results.map((show) => show.id)
);

export const selectPageNumber = createSelector(
  (state) => state.shows,
  (shows) => shows.page
);
