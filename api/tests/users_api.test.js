const supertest = require('supertest')
const { app, mongoose } = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeAll(async () => {
    await helper.initializeTestDb()
    process.env.LOGGER_OFF = 'OFF'
  }, 30000)

  describe('post user', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
      await api
        .post('/api/users')
        .send(newUser)
        .set('Authorization', helper.adminAuthToken())
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    }, 30000)

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .set('Authorization', helper.adminAuthToken())
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 30000)

    test('creation fails with invalid user', async () => {
      const newUser = {
        username: 'ma',
        name: 'Matti Luukkainen',
        password: 'sa'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .set('Authorization', helper.adminAuthToken())
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toEqual('User validation failed: password: Path \'password\' (\'sa\') is shorter than the minimum allowed length (3).')
    }, 30000)
  })

  describe('login user', () => {
    test('login succeeds with valid credentials', async () => {
      const loginUser = {
        username: 'mluukkai',
        password: 'salainen'
      }

      const result = await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(result.body.username).toEqual('mluukkai')
      expect(result.body.name).toBeDefined()
      expect(result.body.token).toBeDefined()
    }, 30000)
  })

  afterAll(async () => {
    delete process.env.LOGGER_OFF
    await mongoose.connection.close()
  }, 30000)
})
