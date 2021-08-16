const reducer = (state = [], action) => {
  const newState = [...state]
  let blog
  switch (action.type) {
    case '@BLOG/CREATE':
      return state.concat(action.payload.blog)
    case '@BLOG/INITIALIZE_BLOGS':
      return action.payload.blogs
    case '@BLOG/LIKE_BLOG':
      blog = newState.find((b) => b.id === action.payload.blogId)
      blog.likes++
      return newState
    case '@BLOG/DELETE_BLOG':
      return state.filter((b) => b.id !== action.payload.blogId)
    default:
      return state
  }
}

export default reducer
