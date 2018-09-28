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

function fetchData(urls, parseDataCallback, args, fetchSuccessType, fetchLoadingType, fetchErrorType) {
  return async (dispatch) => {
    dispatch(fetchLoading(fetchLoadingType, true));

    // Optimization: looks like if you fire all requests async the isLoading is false, but fetchSuccess hasn't been dispatched yet.
    // todo: refactor
    const firstUrl = urls.pop();
    fetch(firstUrl)
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

    await setTimeout(() => Promise.all(
      urls.map(url => (
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
          })
      )),
    ), 0);
  };
}

export default fetchData;
