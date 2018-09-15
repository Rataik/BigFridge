import {HasErrored, IsLoading} from "../constants/actionTypes";

function hasErrored(type, hasErrored) {
  return {
    type,
    hasErrored
  };
}

function isLoading(type, isLoading) {
  return {
    type,
    isLoading
  };
}

function fetchSuccess(type, data) {
  return {
    type,
    data
  };
}

export function fetchData(urls, parseDataCallback, args, fetchSuccessType) {
  return async (dispatch) => {
    dispatch(isLoading(IsLoading, true));

    await Promise.all(
      urls.map((url) => {
        return fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new HasErrored(response.statusText);
            }

            return response;
          })
          .then((response) => response.json())
          .then((json) => {
            const data = parseDataCallback(...args, json);

            dispatch(isLoading(IsLoading, false));
            dispatch(fetchSuccess(fetchSuccessType, data));
          })
          .catch(() => {
            dispatch(isLoading(IsLoading, false));
            dispatch(hasErrored(HasErrored, true));
          });
      })
      );
  };
}