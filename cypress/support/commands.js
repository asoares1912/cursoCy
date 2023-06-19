// loga na aplicação via API
/*
Cypress.Commands.add('login', (email, password) => {

    cy.session([email, password], () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                email,
                password
            }
        })
    }, { cacheAcrossSpecs: true})
})

Cypress.Commands.add('getElement', seletor => {
    return cy.get(`[data-text=${seletor}]`)
})

*/

// loga na aplicação via API
Cypress.Commands.add('login', (email, password) => {

    cy.session(email, () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                email,
                password
            }
        })
    }, { cacheAcrossSpecs: true })
})

// seleciona um elemento pelo atributo data-test
Cypress.Commands.add('getElement', seletor => {
    return cy.get(`[data-test=${seletor}]`)
})