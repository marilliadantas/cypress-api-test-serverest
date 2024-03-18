/// <reference types= "cypress"/>

describe('Login', () => {
    it('Login com sucesso', () => {
        cy.api({
            method: 'POST',
            url: '/login',
            body: {
                email: Cypress.env('emailValido'),
                password: Cypress.env('senhaValida')
            }
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal("Login realizado com sucesso");
            expect(response.body.authorization).to.not.be.empty
        })
    });

    it('Login com e-mail inválido', () => {
        cy.api({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                email: Cypress.env('emailInvalido'),
                password: Cypress.env('senhaValida')
                },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal("Email e/ou senha inválidos");
        })
    });

    it('Login com senha inválida', () => {
        cy.api({
            method: 'POST',
            url: '/login',
            body: {
                email: Cypress.env('emailValido'),
                password: Cypress.env('senhaInvalida')
                },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal("Email e/ou senha inválidos");
        })
    });

    it('Login com e-mail em branco', () => {
        cy.api({
            method: 'POST',
            url: '/login',
            body: {
                "email": "",
                password: Cypress.env('senhaValida')
                },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.email).to.equal("email não pode ficar em branco");
        })
    });

    it('Login com senha em branco', () => {
        cy.api({
            method: 'POST',
            url: '/login',
            body: {
                email: Cypress.env('emailValido'),
                "password": ""
                },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.password).to.equal("password não pode ficar em branco");
        })
    });

    it('Login com e-mail e senha em branco', () => {
        cy.api({
            method: 'POST',
            url: '/login',
            body: {
                "email": "",
                "password": ""
                },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.email).to.equal("email não pode ficar em branco");
            expect(response.body.password).to.equal("password não pode ficar em branco");
        })
    });
});