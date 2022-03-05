import { createApp } from 'vue';

// Importing router and the main app
import router from './router.js';
import App from './App.vue';

// Connecting app and router together
const app = createApp(App);
app.use(router);
app.mount('#app');
