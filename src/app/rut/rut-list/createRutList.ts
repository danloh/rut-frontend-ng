import {RutListComponent} from './rut-list.component'

export default function createRutList (per, action, id) {
    return {
      name: `${per}-ruts`,
      render (h) {
        return h(RutListComponent, { props: { per, action, id }})
      }
    }
  }