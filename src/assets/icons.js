import { createApp } from 'vue'
import App from '@/App.vue'

// import router from '@/router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMapMarkerAlt, faPhone, faAt, faTimes, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger, faHtml5, faCss3Alt, faVuejs, faJs, faNodeJs, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(
  faMapMarkerAlt, faPhone, faAt, faTimes, 
  faFacebookMessenger, faHtml5, faCss3Alt, 
  faVuejs, faJs, faNodeJs, faGithub, faEnvelope,
  faPaperPlane)

// Vue.component('font-awesome-icon', FontAwesomeIcon)  // Vue 2 -- nepoužívaj

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
