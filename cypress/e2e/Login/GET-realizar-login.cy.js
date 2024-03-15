/// <reference types= "cypress"/>

describe('Login', () => {
    it('Login com sucesso', () => {
        cy.api({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                "email": "benicio@qa.com.br",
                "password": "teste"
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
                "email": "emailinvalido@teste.com",
                "password": "teste"
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
            url: 'https://serverest.dev/login',
            body: {
                "email": "fulano@qa.com",
                "password": "senhaerrada1"
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
            url: 'https://serverest.dev/login',
            body: {
                "email": "",
                "password": "teste"
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
            url: 'https://serverest.dev/login',
            body: {
                "email": "fulano@qa.com",
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
            url: 'https://serverest.dev/login',
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