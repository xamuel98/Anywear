// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
import router from './router'
import firebase from 'firebase'
import store from './store'


// Vue.use(Vuetify, {
//   theme: {
//     primary: '#4527A0',
//     secondary: '#424242',
//     accent: '#82B1FF',
//     error: '#FF5252',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FFC107'
//   }
// })


// Your web app's Firebase configuration
let config = {
  apiKey: "AIzaSyBPYpta--sZb5Wvgl7kDUEzd_kKscy4PGM",
  authDomain: "messager-f5c4e.firebaseapp.com",
  databaseURL: "https://messager-f5c4e.firebaseio.com",
  projectId: "messager-f5c4e",
  storageBucket: "messager-f5c4e.appspot.com",
  messagingSenderId: "109205578022",
  appId: "1:109205578022:web:32c3015d0355e91e"
};

// Initialize Firebase
firebase.initializeApp(config);

window.firebase = firebase

Vue.config.productionTip = false

/* eslint-disable no-new */


const unsuscribe = firebase.auth().onAuthStateChanged(user => {

  store.dispatch('setUser', user)

  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
  })

  unsuscribe()

})

