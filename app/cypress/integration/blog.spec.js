describe('blogs in blog app', function () {
  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      password: '1234',
      name: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/testing/users/', user)
    cy.login({ username: 'root', password: '1234' })
  })

  it('a blog can be created', function () {
    cy.contains('Logged in as root')
    const newBlog = { title: 'blog-title', url: 'blog-url' }
    cy.contains('create new blog').click()
    cy.contains('title').find('input').type(newBlog.title)
    cy.contains('url').find('input').type(newBlog.url)
    cy.get('form').find('button').click()
    cy.contains('a new blog')
    cy.get('.list')
      .within(() => {
        return cy.contains(newBlog.title)
      })
      .should('be.visible')
    /*
    cy.get('form').as('form')
    cy.get('input[name="title"]').type('Test Blog')
    cy.get('input[name="url"]').type('Test Content')
    cy.get('@form').find('button').click()
    */
  })
})
