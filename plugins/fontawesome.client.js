import { defineNuxtPlugin } from '#app'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faHome, 
  faMusic,
  faStopwatch,
  faGamepad,
  faChartLine,
  faComments,
  faCog,
  faPlus,
  faPlay,
  faStop,
  faCheck,
  faArrowLeft,
  faSave,
  faTrash,
  faEdit,
  faMicrophone,
  faPaperPlane,
  faWifi
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHome, 
  faMusic, 
  faStopwatch, 
  faGamepad, 
  faChartLine, 
  faComments, 
  faCog,
  faPlus,
  faPlay,
  faStop,
  faCheck,
  faArrowLeft,
  faSave,
  faTrash,
  faEdit,
  faMicrophone,
  faPaperPlane,
  faWifi
)

config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
