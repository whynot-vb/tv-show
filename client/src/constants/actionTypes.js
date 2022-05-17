export const showList = (data, pageNumber, status) => ({
  type: "shows/showList",
  payload: { data, pageNumber, status },
});

export const showStatus = (status) => ({
  type: "shows/showStatus",
  payload: status,
});

export const setSearchField = (field) => ({
  type: "shows/setSearchField",
  payload: field,
});

export const isDetailsOn = (isDetails) => ({
  type: "details/isDetailsOn",
  payload: isDetails,
});

export const isEpisodesPageOn = (isEpisodesPageOn) => ({
  type: "details/isEpisodesPageOn",
  payload: isEpisodesPageOn,
});

export const showDetails = (data, showId) => ({
  type: "details/showDetails",
  payload: { data, showId },
});

export const addElement = (name, episodes) => ({
  type: "details/addElement",
  payload: { name, episodes },
});

export const clearElements = () => ({
  type: "details/clearElements",
});

export const showActors = (data, showId) => ({
  type: "details/showActors",
  payload: { data, showId },
});

export const showImages = (data, showId) => ({
  type: "details/showImages",
  payload: { data, showId },
});

export const showRecommended = (data, showId) => ({
  type: "details/showRecommended",
  payload: { data, showId },
});

//constants from server
export const OPERATION_USER_BEGIN = "OPERATION_USER_BEGIN";
export const REGISTER_USER_OK = "REGISTER_USER_OK";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";
export const LOGIN_USER_OK = "LOGIN_USER_OK";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_SHOW_TO_FAVORITES = "ADD_SHOW_TO_FAVORITES";
export const REMOVE_SHOW_FROM_FAVORITES = "REMOVE_SHOW_FROM_FAVORITES";
export const ADD_FAVORITE_TV_SHOW = "ADD_FAVORITE_TV_SHOW";
export const CLEAR_FAVORITE_SHOW_DETAILS = "CLEAR_FAVORITE_SHOW_DETAILS";
export const REMOVE_FAVORITE_TV_SHOW = "REMOVE_FAVORITE_TV_SHOW";
