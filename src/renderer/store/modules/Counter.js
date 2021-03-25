let state = {
  nav: "0",
  set_imported: false,
  set_new_rule: true,
  user_data: []
}

const mutations = {
  /*
* 设置state
* */
  setState(state, params) {
    for (let k in params) {
      state[k] = params[k]
    }
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
