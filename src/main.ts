import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
    faAlignCenter,
    faCircleInfo,
    faCode,
    faCompress,
    faExpand,
    faFillDrip,
    faHighlighter,
    faIndent,
    faPencil,
    faPrint,
    faSuperscript,
    faTextHeight,
    faTurnDown,
    faUnderline
} from '@fortawesome/free-solid-svg-icons'
import {
    faSquare
} from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(
    faAlignCenter,
    faCircleInfo,
    faCode,
    faCompress,
    faExpand,
    faFillDrip,
    faHighlighter,
    faIndent,
    faPencil,
    faPrint,
    faSquare,
    faSuperscript,
    faTextHeight,
    faTurnDown,
    faUnderline
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
