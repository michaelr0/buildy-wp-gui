import Vuex from 'vuex'
import Vue from 'vue'

import mutations from './mutations'
import actions from './actions'



Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    global_api: '',  
    site_url: '', 
    pagebuilder: [],
    dragging: false
  },
  
  getters: {
    pagebuilder: state => {
      return state.pagebuilder;
    },
    finalOutput: state => {
      console.log(state)
      return JSON.stringify(state.pagebuilder);
    },
    site_url: state => {
      return state.site_url;
    },
    global_api: state => {
      return state.global_api;
    },
    dragging: state => {
      return state.dragging;
    }
  },
  
  mutations, 

  actions,
  
});
   
  