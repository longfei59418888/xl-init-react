import fetch from 'isomorphic-fetch';
import { error } from 'src/containers/util/pc/toast';

export const get = async (url, options) => {
  options.method = 'get';
  let body = '';
  for (const item in options.data) {
    if (body.length > 0) body += '&';
    else body += '?';
    body += `${item}=${options.data[item]}`;
  }
  options.body = body;
  return await fetchData(url, options);
};

export const post = async (url, options) => {
  options.method = 'post';
  return await fetchData(url, options);
};

export const put = async (url, options) => {
  options.method = 'put';
  return await fetchData(url, options);
};

export const del = async (url, options) => {
  options.method = 'delete';
  return await fetchData(url, options);
};

export const uplaod = async (url, body) =>
  await fetch(DEVELOPMETN_URL + url, {
    method: 'POST',
    credentials: 'include',
    body
  })
    .then(rst => rst.json())
    .then(resData => dealRst(resData, {}))
    .catch(err => {
      console.log(`catch fetch:${err}`);
    });

async function fetchData(url, options) {
  if (options.method !== 'get')
    options.body = JSON.stringify(options.data ? options.data : {});
  else {
    url += options.body;
    delete options.body;
  }
  if (!/^https:\/\/|^http:\/\//.test(url)) url = DEVELOPMETN_URL + url;
  const opts = Object.assign(
    {
      loading: true,
      data: {},
      url,
      deal: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    },
    options
  );
  return await fetch(url, opts)
    .then(rst => rst.json())
    .then(resData => {
      if (opts.deal) {
        return dealRst(resData, opts);
      }
      return resData;
    })
    .catch(err => {
      console.log(`catch fetch:${err}`);
    });
}

function dealRst(resData, opts) {
  const { status, msg, data = {} } = resData;
  console.log(`----${opts.url}---`, resData, opts);
  if (parseInt(status, 10) !== 1) {
    error({ msg });
    if (status === 0 || status === '0') {
      window.history.href = '/login';
    }
    return null;
  }
  return data;
}
