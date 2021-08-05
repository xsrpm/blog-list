describe('login in blog app', function () {
  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      password: '1234',
      name: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/testing/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[type=text]').type('root')
      cy.get('input[type=password]').type('1234')
      cy.get('input[type=submit]').click()
      cy.contains('Logged in as root')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[type=text]').type('jose')
      cy.get('input[type=password]').type('12345')
      cy.get('input[type=submit]').click()
      cy.contains('Username or password incorrect')
    })
  })
})
