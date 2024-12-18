import { createApp } from "vue"
import App from "./App.vue"
import router from "./router" // Importando o Vue Router

createApp(App)
  .use(router) // Registrando o Vue Router
  .mount("#app")
