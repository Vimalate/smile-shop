import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */ )
import {
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Field,
  NavBar,
  Toast
} from 'vant'
Vue.use(Button).use(Col).use(Row).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Toast);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')