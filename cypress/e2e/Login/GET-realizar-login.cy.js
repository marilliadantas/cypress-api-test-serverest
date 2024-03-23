/// <reference types= "cypress"/>

describe('Login', () => {
    it('Login com sucesso', () => {

        cy.realizarLogin()
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal("Login realizado com sucesso");
                expect(response.body.authorization).to.not.be.empty
        })
    })

    it('Login com e-mail inválido', () => {

        const email = "emailinvalido"
        const password = Cypress.env('senhaValida')

        cy.loginInvalido(email, password)
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.email).to.equal("email deve ser um email válido");
        })
    })

    it('Login com senha inválida', () => {

        const email = Cypress.env('emailValido')
        const password = "teste1312523"

        cy.loginInvalido(email, password)
            .then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal("Email e/ou senha inválidos");
        })
    })

    it('Login com e-mail em branco', () => {

        const email = ''
        const password = Cypress.env('senhaValida')

        cy.loginInvalido(email, password)
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.email).to.equal("email não pode ficar em branco");
        })
    })

    it('Login com senha em branco', () => {

        const email = Cypress.env('emailValido')
        const password = ''

        cy.loginInvalido(email, password)
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.password).to.equal("password não pode ficar em branco");
        })
    })

    it('Login com e-mail e senha em branco', () => {

        const email = ''
        const password = ''

        cy.loginInvalido(email, password)
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.email).to.equal("email não pode ficar em branco");
                expect(response.body.password).to.equal("password não pode ficar em branco");
        })
    })
})