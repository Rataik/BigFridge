import { FetchDelay } from '../constants/constants';

function fetchErrored(type, hasErrored) {
  return {
    type,
    hasErrored,
  };
}

function fetchLoading(type, isLoading) {
  return {
    type,
    isLoading,
  };
}

function fetchSuccess(type, data) {
  return {
    type,
    data,
  };
}

function makeFetchRequest(url, parseDataCallback, args, fetchSuccessType, fetchLoadingType, fetchErrorType, dispatch) {
  console.log(new Date().getSeconds());
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response;
    })
    .then(response => response.json())
    .then((json) => {
      const data = parseDataCallback(args, json);
      dispatch(fetchLoading(fetchLoadingType, false));
      dispatch(fetchSuccess(fetchSuccessType, data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchLoading(fetchLoadingType, false));
      dispatch(fetchErrored(fetchErrorType, true));
    });
}

function fetchData(urls, parseDataCallback, args, fetchSuccessType, fetchLoadingType, fetchErrorType) {
  return (dispatch) => {
    dispatch(fetchLoading(fetchLoadingType, true));

    // Optimization: looks like if you fire all requests async the isLoading is false, but fetchSuccess hasn't been dispatched yet.
    let delay = 0;
    urls.forEach((url) => {
      setTimeout(() => makeFetchRequest(url, parseDataCallback, args, fetchSuccessType, fetchLoadingType, fetchErrorType, dispatch),
        delay + FetchDelay);
      delay += FetchDelay;
    });
  };
}

export default fetchData;
