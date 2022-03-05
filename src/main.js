import { createApp } from 'vue';

// Importing router, store and the main app
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';

// Connecting app, router and store together
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
