import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons'
import { faJs, faVuejs,faTwitter } from "@fortawesome/free-brands-svg-icons";

library.add(faPenToSquare,faTrash,faJs, faVuejs ,faTwitter)

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
