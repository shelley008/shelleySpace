import {ROUTER_QUERY,SET_CHECKLIST} from './mutation-types'

export default{
  routerQuery ({commit}, query) {
    commit(ROUTER_QUERY, query)
  },
  setCheckList ({commit}, checklist) {
    commit(SET_CHECKLIST,checklist)
  }
}
