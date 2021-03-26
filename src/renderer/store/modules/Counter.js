let state = {
  nav: "0",
  set_imported: false,
  set_new_rule: false,
  set_rule: false,
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
  },
  cur_index(state, { book_name, cur_index }) {
    console.log(book_name)
    console.log(cur_index)
    state.user_book[book_name].cur_index = cur_index
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
