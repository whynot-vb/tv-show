import * as api from "../api";
import {
  OPERATION_USER_BEGIN,
  REGISTER_USER_OK,
  REGISTER_USER_ERROR,
  LOGIN_USER_OK,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  ADD_SHOW_TO_FAVORITES,
  REMOVE_SHOW_FROM_FAVORITES,
  ADD_FAVORITE_TV_SHOW,
  REMOVE_FAVORITE_TV_SHOW,
  CLEAR_FAVORITE_SHOW_DETAILS,
} from "../constants/actionTypes";

import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
let user = localStorage.getItem("user");
let favoriteShows = localStorage.getItem("favoriteShows");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  favoriteShows: favoriteShows?.split(","),
  favoriteShowsDetails: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case OPERATION_USER_BEGIN: {
      return { ...state, isLoading: true };
    }
    case REGISTER_USER_OK: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        favoriteShows: action.payload.favoriteShows,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LOGIN_USER_OK: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        favoriteShows: action.payload.favoriteShows,
      };
    }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isLoading: false,
        user: null,
        token: null,
        favoriteShows: [],
      };
    }
    case ADD_SHOW_TO_FAVORITES: {
      return {
        ...state,
        user: action.payload.updatedUser,
        favoriteShows: action.payload.updatedUser.favoriteShows,
      };
    }
    case REMOVE_SHOW_FROM_FAVORITES: {
      return {
        ...state,
        user: action.payload.updatedUser,
        favoriteShows: action.payload.updatedUser.favoriteShows,
      };
    }
    case CLEAR_FAVORITE_SHOW_DETAILS: {
      return {
        ...state,
        favoriteShowsDetails: [],
      };
    }
    case ADD_FAVORITE_TV_SHOW: {
      return {
        ...state,
        favoriteShowsDetails: [...state.favoriteShowsDetails, action.payload],
      };
    }
    case REMOVE_FAVORITE_TV_SHOW: {
      return {
        ...state,
        favoriteShowsDetails: state.favoriteShowsDetails.filter(
          (s) => s.id !== action.payload
        ),
      };
    }
    default: {
      return state;
    }
  }
}

export const addUserToLocalStorage = ({ user, token, favoriteShows }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("favoriteShows", favoriteShows);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("favoriteShows");
};

export const register = (newUser, history) => async (dispatch) => {
  dispatch({ type: OPERATION_USER_BEGIN });
  try {
    const { data } = await api.register(newUser);
    const { user, token, favoriteShows } = data;
    dispatch({
      type: REGISTER_USER_OK,
      payload: { user, token, favoriteShows },
    });
    addUserToLocalStorage({ user, token, favoriteShows });
    setTimeout(() => history.push("/"), 1000);
  } catch (error) {
    dispatch({ type: REGISTER_USER_ERROR });
  }
};

export const login = (existingUser, history) => async (dispatch) => {
  dispatch({ type: OPERATION_USER_BEGIN });
  try {
    const { data } = await api.login(existingUser);
    const { user, token, favoriteShows } = data;
    await addUserToLocalStorage({ user, token, favoriteShows });
    await dispatch({
      type: LOGIN_USER_OK,
      payload: { user, token, favoriteShows },
    });
    await dispatch(getFavoriteShows());
    await setTimeout(() => history.push("/"), 1000);
  } catch (error) {
    dispatch({ type: LOGIN_USER_ERROR });
  }
};

export const logout = () => async (dispatch) => {
  await dispatch({ type: LOGOUT_USER });
  await dispatch({ type: CLEAR_FAVORITE_SHOW_DETAILS });
  removeUserFromLocalStorage();
};

export const addShowToFavorites = (showId) => async (dispatch) => {
  try {
    const { data } = await api.addShowToFavorites({ showId: showId });
    const { updatedUser } = data;
    await dispatch({
      type: ADD_SHOW_TO_FAVORITES,
      payload: { updatedUser },
    });
    const show = await axios.get(
      `https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US`
    );
    dispatch({ type: ADD_FAVORITE_TV_SHOW, payload: show.data });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("favoriteShows", updatedUser.favoriteShows);
  } catch (error) {
    console.log(error);
  }
};

export const removeShowFromFavorites = (showId) => async (dispatch) => {
  try {
    const { data } = await api.removeShowFromFavorites({
      showId: showId,
    });
    const { updatedUser } = data;
    await dispatch({
      type: REMOVE_SHOW_FROM_FAVORITES,
      payload: { updatedUser },
    });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("favoriteShows", updatedUser.favoriteShows);
    await dispatch({ type: REMOVE_FAVORITE_TV_SHOW, payload: showId });
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteShows = () => async (dispatch, getState) => {
  await dispatch({ type: CLEAR_FAVORITE_SHOW_DETAILS });
  console.log(getState());
  try {
    getState().auth.favoriteShows.map(async (showId) => {
      let show = await axios.get(
        `https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&language=en-US`
      );
      dispatch({ type: ADD_FAVORITE_TV_SHOW, payload: show.data });
    });
  } catch (error) {
    console.log(error);
  }
};

export const selectFavoriteShows = createSelector(
  (state) => state.auth,
  (auth) => auth.favoriteShows
);
