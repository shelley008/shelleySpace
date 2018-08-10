import {ROUTER_QUERY,SET_CHECKLIST,COF_DESCRIPTION} from './mutation-types'

export default{
  [ROUTER_QUERY](state,query){
    state.count+=query;
  },
  [SET_CHECKLIST](state,checklist){
    state.checkList = checklist
  },
  [COF_DESCRIPTION](state,decriptionField){
    state.confDescription = decriptionField
  }
}
