const supertest = require('supertest')
const { app, mongoose } = require('../app')
const { deleteBlogs } = require('../models/blog')
const { createBlogService } = require('../services/blog')
const helper = require('./test_helper')
beforeAll(async () => {
  const { user } = await helper.initializeTestDb()
  await deleteBlogs()
  for (const blog of helper.initialBlogs) {
    await createBlogService(blog.title, blog.url, user.id)
  }
  process.env.LOGGER_OFF = 'OFF'
}, 30000)
const api = supertest(app)

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    const blogs = await api
      .get('/api/blogs')
      .set('Authorization', helper.adminAuthToken())
      .expect(200)
      .expect('Content-Type', /json/)
    expect(blogs.body).toHaveLength(helper.initialBlogs.length)
  }, 30000)

  test('there are 2 blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', helper.adminAuthToken())
    // console.log(response.body)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 30000)
  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', helper.adminAuthToken())
    const contents = response.body.map((r) => r.title)
    expect(contents).toContain('React patterns')
  }, 30000)
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    // console.log('blogsAtStart', blogsAtStart)
    const blogToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', helper.adminAuthToken())
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body).toEqual(blogToView)
  })
})

describe('update blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updateBlog = {
      title: 'React patterns cambio',
      url: 'https://reactpatterns.com/cambio',
      likes: 51
    }
    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', helper.adminAuthToken())
      .send(updateBlog)
      .expect(200, {
        id: `${blogToUpdate.id}`,
        title: updateBlog.title,
        author: blogToUpdate.author,
        url: updateBlog.url,
        likes: updateBlog.likes,
        user: blogToUpdate.user.id
      })
      .expect('Content-Type', /application\/json/)
  }, 30000)
})

describe('delete blog', () => {
  test('a blog can be deleted for author', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    // console.log(blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', helper.adminAuthToken())
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    // console.log(blogsAtEnd)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  }, 30000)
})

describe('post blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'React patterns by Xsr',
      url: 'https://reactpatterns.com/xsr'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', helper.adminAuthToken())
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const contents = blogs.map((r) => r.title)
    expect(contents).toContain('React patterns by Xsr')
  }, 30000)

  test('blog without title is not added', async () => {
    const newBlog = { url: 'https://reactpatterns.com/xsr' }

    await api
      .post('/api/blogs')
      .set('Authorization', helper.adminAuthToken())
      .send(newBlog)
      .expect(400, {
        error: 'Blog validation failed: title: Path `title` is required.'
      })
  }, 30000)

  test('the blog is not added for not providing the authorization token', async () => {
    const newBlog = {
      title: 'React patterns by Xsr',
      url: 'https://reactpatterns.com/xsr'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ')
      .send(newBlog)
      .expect(401, { error: 'missing token' })
  }, 30000)
})

afterAll(async () => {
  await mongoose.connection.close()
  delete process.env.LOGGER_OFF
}, 30000)
