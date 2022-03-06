import { createApp } from 'vue';

// Importing JS files and components
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';

// Creating the Vue app
const app = createApp(App);

// Connecting app, router and store together
app.use(router);
app.use(store);

// Making the Vue app use of the components
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);

// Mounting the app to index.html
app.mount('#app');
