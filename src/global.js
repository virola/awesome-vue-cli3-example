/** @format */

import Vue from 'vue';
import Cookies from 'js-cookie';

/* ------------------------Vue Global Variable------------------------------ */
import { $apis, $utils, $document, $auth, $lodash } from '@helper';

/* ------------------------Vue Global Components------------------------------ */
import ElementUI from 'element-ui';

import Markdown from '@components/markdown/Index';

import MarkdownPreview from '@components/markdown/MarkdownPreview';

import VueMeta from 'vue-meta';

import Icon from '@components/Icon';

import Arrow from '@components/icons/Arrow';
import Filters from './filters';

/* ------------------------Vue Global Config------------------------------ */
Vue.config.productionTip = false;

const lang = Cookies.get('lang') || 'en';
Vue.config.lang = lang;
Vue.prototype.$_ = $lodash;
Vue.prototype.$apis = $apis;
Vue.prototype.$utils = $utils;
Vue.prototype.$auth = $auth;
Vue.prototype.$document = $document;

for (const key in Filters) {
  Vue.filter(key, Filters[key]);
}
Vue.use(ElementUI);
Vue.component('Markdown', Markdown);
Vue.component('MarkdownPreview', MarkdownPreview);
Vue.use(VueMeta);
Vue.component('icon', Icon);
Vue.component('arrow', Arrow);
