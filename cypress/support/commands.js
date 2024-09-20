import { faker } from '@faker-js/faker';

Cypress.Commands.add('cadastrarUsuario', () => { 
    const nomeAleatorio = faker.person.fullName();
    const emailAleatorio = faker.internet.email();
    const boolean = Array.from({ length: 5 }, () => Math.random() < 0.5);
    const adminAleatorio = boolean[Math.floor(Math.random() * boolean.length)].toString();
    cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
            "nome": nomeAleatorio,
            "email": emailAleatorio,
            "password": "1234678",
            "administrador": adminAleatorio
          },
    }).then((response) => { return response })
})

Cypress.Commands.add('cadastrarUsuarioInvalido', (nome, email, password, administrador) => { 
    cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
          },
        failOnStatusCode: false
    }).then((response) => { return response })
})

Cypress.Commands.add('buscarUsuarioEspecifico', (user_id) => { 
    cy.api({
        method: 'GET',
        url: `/usuarios/${user_id}`,
        failOnStatusCode: false
      }).then((response) => { return response })
})

Cypress.Commands.add('buscarTodosUsuarios', () => { 
    cy.fixture("config.json").then((url) => {
        cy.api({
            method: 'GET',
            url: `${url.servidor}${url.users}`,
            failOnStatusCode: false
          }).then((response) => { return response })
    })
})

Cypress.Commands.add('realizarLogin', () => { 
    cy.api({
        method: 'POST',
            url: '/login',
            body: {
                email: Cypress.env('emailValido'),
                password: Cypress.env('senhaValida')
            },
      }).then((response) => { return response })
})

Cypress.Commands.add('loginInvalido', (email, password) => { 
    cy.api({
        method: 'POST',
            url: '/login',
            body: {
                email: email,
                password: password
            },
            failOnStatusCode: false
      }).then((response) => { return response })
})