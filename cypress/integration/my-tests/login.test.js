Cypress.Commands.add('login', () => { 
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/api/users/login',
      body: {
        user: {
          email: process.env.KNOWN_USER,
          password: process.env.KNOWN_PASS,
        }
      }
    })
    .then((resp) => {
      window.localStorage.setItem('jwt', resp.body.user.token)
    })
  
  })