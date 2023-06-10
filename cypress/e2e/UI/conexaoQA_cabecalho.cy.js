describe('cabeçalho de página home', () => {

    context('não logado', () => {
        beforeEach(() => {
            cy.visit('/')
        })

        it('valida o menu conexaoQA', () => {
            
            /**
             * Clicar uma vez .click()
             * Clicar duas vezes .dbclick()
             * clicar com botão direito .rightclick()
             */
            cy.get('[data-test=navbar-conexaoQA]')
                .should('have.attr', 'href','/')
                .and('not.have.attr', 'target')
        })

        it('valida o menu QAs', () => {
            cy.get('[data-test=navbar-QAs]')
                .should('have.attr', 'href','/perfis')
                .and('not.have.attr', 'target')
            
        })

        it('valida o menu sobre', () => {
            cy.get('[data-test=navbar-about]')
                .should('have.attr', 'href','/sobre')
                .and('not.have.attr', 'target')
            
        })
        it('valida o menu cadastrar', () => {
            cy.get('[data-test=navbar-register]')
                .should('have.attr', 'href','/cadastrar')
                .and('not.have.attr', 'target')
            
        })

        it('valida o menu login', () => {
            cy.get('[data-test=navbar-login]')
                .should('have.attr', 'href','/login')
                .and('not.have.attr', 'target')
            
        })

        it('valida os menus utilizando Arrays', () => {

            const menus = [
                {seletor: 'navbar-conexaoQA', link: '/'},
                {seletor: 'navbar-QAs', link: '/perfis'},
                {seletor: 'navbar-about', link: '/sobre'},
                {seletor: 'navbar-register', link: '/cadastrar'},
                {seletor: 'navbar-login', link: '/login'}
            ]

            menus.forEach(({seletor, link})=> {
                cy.get(`[data-test=${seletor}]`)
                    .should('have.attr','href',link)
            })
        })

        // independência dos testes
        ;[
            {seletor: 'navbar-conexaoQA', link: '/', menu: ' ConexãoQA'},
            {seletor: 'navbar-QAs', link: '/perfis', menu: 'QAs'},
            {seletor: 'navbar-about', link: '/sobre', menu: 'Sobre'},
            {seletor: 'navbar-register', link: '/cadastrar', menu: 'Cadastrar'},
            {seletor: 'navbar-login', link: '/login', menu: 'Login'}
        ].forEach(({seletor, link, menu }) => {
            it.only(`valida o menu ${menu}`, () => {
                cy.get(`[data-test=${seletor}]`)
                    .should('have.attr','href',link)
                    .and('not.have.attr', 'target')

            // .and('have.text', menu)
            })

        })

    })

    context('logado', () => {
        
    })
    
})