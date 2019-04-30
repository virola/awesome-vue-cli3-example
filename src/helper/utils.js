/** @format */

import Vue from 'vue';

if (typeof String.prototype.startsWith !== 'function') {
  Window.String.prototype.startsWith = function(prefix) {
    return this.slice(0, prefix.length) === prefix;
  };
}

export default {
  resMsg(res) {
    const key = {
      zh: 'Chinese',
      en: 'English',
    }[Vue.config.lang];
    try {
      const obj = JSON.parse(res.Message);
      return obj[key] || obj.Chinese;
    } catch (e) {
      return res && res.Message;
    }
  },

  serverUrl(apiName) {
    return `app/${apiName}`;
  },

  titleLang(zhStr, enStr) {
    return {
      zh: zhStr,
      en: enStr,
    };
  },

  query(search) {
    const str = search || window.location.search;
    const objURL = {};

    str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
      objURL[$1] = $3;
    });
    return objURL;
  },

  queryString(url, query) {
    const str = [];
    for (const key in query) {
      str.push(`${key}=${query[key]}`);
    }
    const paramStr = str.join('&');
    return paramStr ? `${url}?${paramStr}` : url;
  },

  /* -----------------------------localStorage------------------------------------ */
  /*
   * set localStorage
   */
  setStorage(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  /**
   * get localStorage
   */
  getStorage(name) {
    if (!name) return;
    const content = window.localStorage.getItem(name);
    return JSON.parse(content);
  },

  /**
   * delete localStorage
   */
  removeStorage(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
};
