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

export function fetchData(urls, parseDataCallback, args, fetchSuccessType, fetchLoadingType, fetchErrorType) {
  return async (dispatch) => {
    dispatch(isLoading(fetchLoadingType, true));

    await Promise.all(
      urls.map((url) => {
        return fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }

            return response;
          })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            const data = parseDataCallback(...args, json);
            dispatch(isLoading(fetchLoadingType, false));
            dispatch(fetchSuccess(fetchSuccessType, data));
          })
          .catch((error) => {
            console.log(error);
            dispatch(isLoading(fetchLoadingType, false));
            dispatch(hasErrored(fetchErrorType, true));
          });
      })
      );
  };
}