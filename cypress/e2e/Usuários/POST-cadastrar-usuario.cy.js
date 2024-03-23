/// <reference types= "cypress"/>

import { faker } from '@faker-js/faker';

const nomeAleatorio = faker.person.fullName()
const emailAleatorio = faker.internet.email()
const passwordAleatorio = faker.internet.password()
const boolean = Array.from({ length: 5 }, () => Math.random() < 0.5)
const adminAleatorio = boolean[Math.floor(Math.random() * boolean.length)].toString()

describe('Cadastro', () => {
    it('Cadastrar usuário com sucesso', () => {
        cy.cadastrarUsuario()
        .then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Cadastro realizado com sucesso");
            expect(response.body._id).to.exist;
        })
    });

    it('Cadastrar usuário com nome em branco', () => {

        const nome = ''

        cy.cadastrarUsuarioInvalido(nome, emailAleatorio, passwordAleatorio, adminAleatorio)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.nome).to.equal("nome não pode ficar em branco")
                expect(response.body._id).to.not.exist
        })
    })

    it('Cadastrar usuário com e-mail inválido', () => {

        const emailInvalido = 'emailinvalido'

        cy.cadastrarUsuarioInvalido(nomeAleatorio, emailInvalido, passwordAleatorio, adminAleatorio)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.email).to.equal("email deve ser um email válido")
                expect(response.body._id).to.not.exist;
        })
    })

    it('Cadastrar usuário com e-mail em branco', () => {
        
        const email = ''

        cy.cadastrarUsuarioInvalido(nomeAleatorio, email, passwordAleatorio, adminAleatorio)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.email).to.equal("email não pode ficar em branco")
                expect(response.body._id).to.not.exist
        })
    })

    it('Cadastrar usuário com senha em branco', () => {

        const password = ''

        cy.cadastrarUsuarioInvalido(nomeAleatorio, emailAleatorio, password, adminAleatorio)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.password).to.equal("password não pode ficar em branco")
                expect(response.body._id).to.not.exist
        })
    })

    it('Cadastrar usuário com administrador em branco', () => {

        const admin = ''

        cy.cadastrarUsuarioInvalido(nomeAleatorio, emailAleatorio, passwordAleatorio, admin)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.administrador).to.equal("administrador deve ser 'true' ou 'false'")
                expect(response.body._id).to.not.exist
        })
    })

    it('Cadastrar usuário existente', () => {
        
        const email = Cypress.env('emailValido')
        const password = Cypress.env('senhaValida')

        cy.cadastrarUsuarioInvalido(nomeAleatorio, email, password, adminAleatorio)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal("Este email já está sendo usado")
        })
    })
})