
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

import Vue from 'vue'

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => {
//     return Vue.component(key.split('/').pop().split('.')[0], files(key).default)
// })


import App from './App.vue'
import store from './store/store'


import '@/assets/css/tailwind.css'


import VModal from 'vue-js-modal'

Vue.use(VModal)

Vue.config.productionTip = false

let config = '';

if (document.getElementById( 'config' )) {
  const configElement = document.getElementById( 'config' );
  config = configElement.innerHTML;
}

new Vue({
  store,
  render: h => h(App, {props: { config: config }}),
}).$mount('#app')
