import Pages from '../constants/siteMap/SiteMap';

const PauseSection = [];
Pages.filter(page => !page.isHome).forEach(page => (
  page.sections.forEach((section) => {
    PauseSection[section.index] = false;
  })
));

function waitFor(ms, data) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, data), ms);
  });
}

async function fetchDataWhileNotPaused(array, delay, sectionIndex, callback) {
  // We want to wait on each item in the sequence
  // eslint-disable-next-line no-restricted-syntax
  for (const item of array) {
    // We want the requests to be sync in order to implement pause/resume
    // eslint-disable-next-line no-await-in-loop
    await callback(item).then(data => waitFor(delay, data));

    while (PauseSection[sectionIndex]) {
      // eslint-disable-next-line no-await-in-loop
      await waitFor(delay, null);
    }
  }
}

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

function fetchPause(type, pause) {
  return {
    type,
    pause,
  };
}

function pauseFetchRequest(pauseType, sectionIndex, pause) {
  return (dispatch) => {
    if (pause) {
      PauseSection[sectionIndex] = true;
      dispatch(fetchPause(pauseType, true));
    } else {
      PauseSection[sectionIndex] = false;
      dispatch(fetchPause(pauseType, false));
    }
  };
}

function makeFetchRequest(url, parseDataCallback, args, fetchSuccessType, fetchLoadingType, fetchErrorType, dispatch) {
  return fetch(url)
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

function fetchData(urls, fetchDelay, sectionIndex, parseDataCallback, parseDataCallbackArgs, fetchSuccessType, fetchLoadingType, fetchErrorType) {
  return async (dispatch) => {
    dispatch(fetchLoading(fetchLoadingType, true));

    await fetchDataWhileNotPaused(
      urls,
      fetchDelay,
      sectionIndex,
      url => makeFetchRequest(url, parseDataCallback, parseDataCallbackArgs, fetchSuccessType, fetchLoadingType, fetchErrorType, dispatch),
    );
  };
}

export { pauseFetchRequest };
export default fetchData;
