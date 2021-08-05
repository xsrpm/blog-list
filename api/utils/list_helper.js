const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acum, blog) => acum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
}

const mostBlogs = (blogs) => {
  if (blogs === []) return {}
  const map = new Map()
  blogs.forEach((blog) => {
    if (map.has(blog.author)) { map.set(blog.author, map.get(blog.author) + 1) } else { map.set(blog.author, 1) }
  })
  const maxAuthor = { author: 'dummy', blogs: -1 }
  map.forEach((value, key) => {
    // console.log(key, value)
    if (value > maxAuthor.blogs) {
      maxAuthor.author = key
      maxAuthor.blogs = value
    }
  })
  return maxAuthor
}

const mostLikes = (blogs) => {
  if (blogs === []) return {}
  const map = new Map()
  blogs.forEach((blog) => {
    if (map.has(blog.author)) { map.set(blog.author, map.get(blog.author) + blog.likes) } else { map.set(blog.author, blog.likes) }
  })
  const maxAuthor = { author: 'dummy', likes: -1 }
  map.forEach((value, key) => {
    // console.log(key, value)
    if (value > maxAuthor.likes) {
      maxAuthor.author = key
      maxAuthor.likes = value
    }
  })
  return maxAuthor
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
