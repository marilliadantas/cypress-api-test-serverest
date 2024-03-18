/// <reference types= "cypress"/>

describe('Listar usuários', () => {

    it('Listar todos os usuários', () => {
        cy.api({
            method: 'GET',
            url: '/usuarios',
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.usuarios.length).to.be.greaterThan(0);
            expect(response.body).to.have.property('quantidade').that.is.a('number');
            const user = response.body.usuarios.find(user => {
                return user.nome === "Armando Klein" &&
                       user.email === "Lenny33@hotmail.com" &&
                       user.password === "teste" &&
                       user.administrador === "false" &&
                       user._id === "dgjARo9DcpIPV9Up";
            });
        })
    });

    it('Listar usuário por ID válido', () => {
        cy.api({
            method: 'GET',
            url: '/usuarios/38Dw6HQ4IhooHD5F',
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.nome).to.equal("Karl Schuppe-Satterfield Sr.");
            expect(response.body.email).to.equal("Marta.Goldner37@gmail.com");
            expect(response.body.password).to.equal(Cypress.env('senhaValida'));
            expect(response.body.administrador).to.equal("true");
            expect(response.body._id).to.equal("38Dw6HQ4IhooHD5F");
        })
    });

    it('Listar usuário por ID inválido', () => {
        cy.api({
            method: 'GET',
            url: '/usuarios/dklsjgls35232',
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal("Usuário não encontrado");
        })
    });
});