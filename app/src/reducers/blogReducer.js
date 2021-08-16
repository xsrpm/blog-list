const reducer = (state = [], action) => {
  switch (action.type) {
    case '@BLOG/CREATE':
      return state.concat(action.payload.blog)
    case '@BLOG/INITIALIZE_BLOGS':
      return action.payload.blogs
    default:
      return state
  }
}

export default reducer
