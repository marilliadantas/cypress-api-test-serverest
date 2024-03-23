/// <reference types= "cypress"/>

import { faker } from '@faker-js/faker';

const nomeAleatorio = faker.person.fullName();
const emailAleatorio = faker.internet.email();
const boolean = Array.from({ length: 5 }, () => Math.random() < 0.5);
const adminAleatorio = boolean[Math.floor(Math.random() * boolean.length)].toString();

describe('Cadastro', () => {
    it('Cadastrar usuário com sucesso', () => {
        cy.cadastrarUsuario()
        .then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal("Cadastro realizado com sucesso");
            expect(response.body._id).to.exist;
        })
    });

    it('Cadastrar usuário com nome em branco', () => {
        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: {
                "nome": "",
                "email": emailAleatorio,
                "password": Cypress.env('senhaValida'),
                "administrador": "true"
              },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.nome).to.equal("nome não pode ficar em branco");
            expect(response.body._id).to.not.exist;
        })
    });

    it('Cadastrar usuário com e-mail inválido', () => {
        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: {
                "nome": nomeAleatorio,
                "email": "email.com",
                "password": Cypress.env('senhaValida'),
                "administrador": "true"
              },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.email).to.equal("email deve ser um email válido");
            expect(response.body._id).to.not.exist;
        })
    });

    it('Cadastrar usuário com e-mail em branco', () => {
        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: {
                "nome": nomeAleatorio,
                "email": "",
                "password": Cypress.env('senhaValida'),
                "administrador": "true"
              },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.email).to.equal("email não pode ficar em branco");
            expect(response.body._id).to.not.exist;
        })
    });

    it('Cadastrar usuário com senha em branco', () => {
        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: {
                "nome": nomeAleatorio,
                "email": emailAleatorio,
                "password": "",
                "administrador": "true"
              },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.password).to.equal("password não pode ficar em branco");
            expect(response.body._id).to.not.exist;
        })
    });

    it('Cadastrar usuário com administrador em branco', () => {
        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: {
                "nome": nomeAleatorio,
                "email": emailAleatorio,
                "password": Cypress.env('senhaValida'),
                "administrador": ""
              },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.administrador).to.equal("administrador deve ser 'true' ou 'false'");
            expect(response.body._id).to.not.exist;
        })
    });

    it('Cadastrar usuário existente', () => {
        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: {
                "nome": "Benicio Teste",
                "email": Cypress.env('emailValido'),
                "password": Cypress.env('senhaValida'),
                "administrador": "true"
              },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal("Este email já está sendo usado");
        })
    });
});