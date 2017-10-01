const BASE_URL = "https://api.github.com";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(url, options = {}) {
  const completeUrl = `${BASE_URL}/${url}`;
  return fetch(completeUrl, options)
    .then(checkStatus)
    .then(parseJSON);
}

export const get = url => request(url, { method: "GET" });
export const post = (url, body) => request(url, { method: "POST", body });
export const put = (url, body) => request(url, { method: "PUT", body });
export const del = url => request(url, { method: "DELETE" });

export default request;
