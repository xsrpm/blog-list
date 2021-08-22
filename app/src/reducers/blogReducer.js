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
    case '@BLOG/NEW_COMMENT':
      blog = newState.find((b) => b.id === action.payload.blogId)
      blog.comments.push(action.payload.comment)
      return newState
    default:
      return state
  }
}

export default reducer
