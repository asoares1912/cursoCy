describe('página de login', () => {

    const CAMPO_EMAIL = 'login-email'
    const CAMPO_SENHA = 'login-password'
    const BOTAO_LOGIN = 'login-submit'

    before(() => {
        cy.visit('/login')
    })
    it('faz o login valido',{tags: ['@login','@smoke']}, () => {

        // spay na apia login
        cy.intercept('GET','/api/profile/me')
            .as('apiLogin')
        
        cy.getElement(CAMPO_EMAIL)
            .type(Cypress.env('email'))
            
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        // preenche a senha
        cy.getElement(CAMPO_SENHA)
            .type(Cypress.env('senha'))

        // clica no login

        cy.getElement(BOTAO_LOGIN)
            .click()

        // espera a API do login responder
        cy.wait('@apiLogin')
            .then(({response}) => {
                expect(response.body.user.name).to.eq('Usuário Curso Cypress')
            })

        cy.getElement('dashboard-welcome')
            .should('be.visible')
            .and('contain','Usuário Curso Cypress')
    })

    it('faz o login inválido', {tags: '@login'}, () => {
        // spy na API do login
        cy.intercept('POST', '/api/auth')
            .as('apiLogin')

        // preencher o email
        cy.getElement(CAMPO_EMAIL)
            .type(Cypress.env('email'))
        
        // preencher a senha
        cy.getElement(CAMPO_SENHA)
            .type('abcdef')
        
        // clicar no botão login
        cy.getElement(BOTAO_LOGIN)
            .click()

        // esperar a API
        cy.wait('@apiLogin')
            .then(({response}) => {
                expect(response.statusCode, 'Validação do HTTP Status code').to.eq(401)

            })

        // validar a mensagem de retorno
        cy.getElement('alert')
            .should('have.text','Credenciais inválidas')
    })
    it('valida a digitação de um e-mail inválido', () => {

        // preencher o e-mail (inc]válido)

        cy.getElement(CAMPO_EMAIL)
            .type('anderson')

        cy.getElement(CAMPO_SENHA)
            .type('abcdef')    

        // validar a máscara do campo
        cy.contains('p', 'Digite um email válido')
            .should('be.visible')
    })
})