/** @format */

import axios from 'axios';
import $q from 'q';

function requestHandle(params) {
  const defer = $q.defer();
  axios(params)
    .then(res => {
      if (res && (res.unauthorized || res.statusCode === 401)) {
        window.location.href = '/login';
      }
      if (res.type === 'application/x-msdownload') {
        redirectToIframe(res.request.responseURL);
      } else if (res.data) {
        // 成功返回data，失败抛出msg
        if (res.data.success) {
          defer.resolve(res.data.data);
        } else {
          defer.reject(res.data.msg);
        }
      } else {
        defer.reject();
      }
    })
    .catch(err => {
      defer.reject(err);
    });

  return defer.promise;
}

/**
 * 通过iframe方式下载
 * @param {*} url 下载地址
 */
function redirectToIframe(url) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  iframe.onload = function() {
    document.body.removeChild(iframe);
  };
  document.body.appendChild(iframe);
}

export default {
  post(url, params) {
    return requestHandle({
      method: 'post',
      url,
      data: params,
    });
  },
  get(url, params) {
    return requestHandle({
      method: 'get',
      url,
      params,
    });
  },
};
