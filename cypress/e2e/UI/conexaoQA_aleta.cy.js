describe('Alerta de login', () => {
    
    it('valida o alerta de credecial invalida', {tags:['@smoke','@login']}, () => {
        
        // interceptando 
        cy.clock()

        cy.intercept('POST', '/api/auth')
            .as ('login')

        cy.visit('/login')

        // preencher um e-mail aleatorio

        cy.getElement('login-email')
            .type('usuarioaleAtorio@teste.com')

        // preencher uma senha aleatorio
        cy.getElement('login-password')
            .type('123456')

        // clicar no botão login
        cy.getElement('login-submit')
            .click()

        cy.wait('@login')

        // validar o alerta de crendencial inválido
        cy.getElement('alert')
            .should('have.text', 'Credenciais inválidas')
            
        // cy.wait(10000)
        // cy.getElement('alert')
        // cy.get('[data-test=alert]', { timeout: 10000})
        // .should('not.exist')
        
        cy.tick(10000)
        cy.getElement('alert')
            .should('not.exist')     
    })
})