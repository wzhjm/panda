let state = {
  nav: "0",
  set_imported: false,
  set_new_rule: false,
  user_data: {},
  user_book: {},
  reflect: true,
  cur_book: "",
}

const mutations = {
  /*
* 设置state
* */
  setState(state, params) {
    for (let k in params) {
      state[k] = params[k]
    }
  },
  del_book(state, book_name) {
    delete state.user_book[book_name]
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
