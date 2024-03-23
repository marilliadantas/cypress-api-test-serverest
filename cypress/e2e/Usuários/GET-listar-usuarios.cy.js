/// <reference types= "cypress"/>

describe('Listar usuários', () => {

    it('Listar todos os usuários', () => {

        cy.buscarTodosUsuarios()
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

        const user_id = '4dSaLGBfaeezAIr8'

        cy.buscarUsuarioEspecifico(user_id)
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.nome).to.equal("Bennie");
                expect(response.body.email).to.equal("usuario5682@test.com");
                expect(response.body.administrador).to.equal("true");
                expect(response.body._id).to.equal("4dSaLGBfaeezAIr8");
        })
    });

    it('Listar usuário por ID inválido', () => {

        const invalid_id = '38Dw6HQ4IhooHD5K'

        cy.buscarUsuarioEspecifico(invalid_id)
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal("Usuário não encontrado");
        })
    });
});