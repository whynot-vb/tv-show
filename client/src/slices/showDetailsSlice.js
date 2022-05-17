import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";

import {
  showDetails,
  showActors,
  showImages,
  showRecommended,
  addElement,
} from "../constants/actionTypes";

const initialState = {
  isDetailsOn: false,
  isEpisodesPageOn: false,
  details: {},
  people: {},
  images: {},
  recommended: {},
  elements: [{ name: "", episodes: [] }],
};

export default function detailsReducer(state = initialState, action) {
  switch (action.type) {
    case "details/isDetailsOn": {
      return {
        ...state,
        isDetailsOn: action.payload,
      };
    }
    case "details/isEpisodesPageOn": {
      return {
        ...state,
        isEpisodesPageOn: action.payload,
      };
    }
    case "details/showDetails": {
      return {
        ...state,
        details: {
          ...state.details,
          details: action.payload.data,
        },
      };
    }
    case "details/addElement": {
      return {
        ...state,
        elements: [
          ...state.elements,
          {
            name: action.payload.name,
            episodes: action.payload.episodes,
          },
        ],
      };
    }
    case "details/clearElements": {
      return {
        ...state,
        elements: [],
      };
    }

    case "details/showActors": {
      return {
        ...state,
        people: action.payload.data,
      };
    }
    case "details/showImages": {
      return {
        ...state,
        images: action.payload.data,
      };
    }
    case "details/showRecommended": {
      return {
        ...state,
        recommended: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
}

export function showDetailsTvShow(tvShow_ID) {
  return async function showDetailsTvShowThunk(dispatch, getState) {
    let response = await axios.get(`
    https://api.themoviedb.org/3/tv/${tvShow_ID}?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US`);
    await dispatch(showDetails(response.data));
  };
}

export function showActorsTvShow(tvShow_ID) {
  return async function showActorsTvShowThunk(dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShow_ID}/credits?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&page=1`
    );
    dispatch(showActors(response.data));
  };
}

export function showImagesTvShow(tvShow_ID) {
  return async function showImagesTvShowThunk(dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShow_ID}/images?api_key=${process.env.REACT_APP_MOVIEDB_KEY}`
    );
    dispatch(showImages(response.data));
  };
}

export function showRecommendedTvShow(tvShow_ID) {
  return async function showRecommendedTvShowThunk(dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShow_ID}/recommendations?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&page=1`
    );
    dispatch(showRecommended(response.data));
  };
}

export function showEpisodes(tvShow_ID, season_number) {
  return async function showEpisodesThunk(dispatch, getState) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShow_ID}/season/${season_number}?api_key=${process.env.REACT_APP_MOVIEDB_KEY}`
    );
    await dispatch(addElement(response.data.name, response.data.episodes));
  };
}

export const selectIsDetailsOn = (state) => state.details.isDetailsOn;
export const selectIsEpisodesPageOn = (state) => state.details.isEpisodesPageOn;
export const selectOverview = (state) => state.details.details.details.overview;
