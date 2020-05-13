/*eslint no-undef: 0*/
import Vue from 'vue'
import App from './App.vue'
import { SetThemeOptions } from './classes/themeOptions'

import store from './store'

Vue.config.productionTip = false

import '@/assets/css/tailwind.css'

import VModal from 'vue-js-modal'
Vue.use(VModal)

const files = require.context('./components', true, /\.vue$/i)
files.keys().map(key => {
  let name = key.split('/').pop().split('.')[0];
  Vue.component(name, files(key).default)
})

let config = '';

if (document.getElementById('config')) {
  const configElement = document.getElementById('config');
  config = configElement.innerHTML;
}

let content;
if (document.getElementById('content') && document.getElementById('content').value) {
  content = JSON.parse(document.getElementById('content').value)
}

let tempPayload = {
  colors: [{ name: 'red', value: 'blue' }],
  spacing: []
}

new SetThemeOptions(tempPayload);

new Vue({
  store,
  render: h => h(App, { props: { config: config || [], content: content } })
}).$mount('#app')
