describe('API - PROFILE', () => {
    context('valida a API de perfis', () => {
        it('todos os perfis', () => {
            //cy.request('/api/profile', 'GET')
            cy.request({
                url: '/api/profile',
                method: 'GET'
            }).then(({status, duration, body}) => {
                expect(status, 'Status Code').to.eq(200)
                expect(duration, 'Duração').to.be.lessThan(1000)
                expect(body[0].status, 'Cargo usúario 0').to.eq('QA Junior')
                expect(body[1].user.name).to.eq('Iterasys')
                expect(body[0].skills).to.be.have.lengthOf(4)
                expect(body[0].date).to.not.be.null
                
                // cy.writeFile('cypress/fixtures/user.json', body[1].user)
            })
        })
    })

    context('valida um perfil específico', () => {

        let urlApiPerfil = '/api/profile/user'
        let method = 'GET'

        it('seleciona um usuário inválido', () => {

            let usuarioId = '1'

            cy.request({
                method: method,
                url: `${urlApiPerfil}/${usuarioId}`,
                failOnStatusCode: false

            }).then(({status, body}) => {
                expect(status, 'Status Code').to.eq(404)
                expect(body.errors[0].msg, 'Mensagem de erro').to.eq('Perfil não encontrado')
            })
        })

        it('seleciona usuários válidos', () => {
            let usuarioId = '638e46754c44ad0164056f3f'

            cy.request({
                method: method,
                url: `${urlApiPerfil}/${usuarioId}`
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.user.name).to.eq('dino')
            })
           
        })
        it('testa usuário válido', () => {
            let usuarioId = '63a57f44530925d8f4e54735'

            cy.request({
                method: method,
                url: `${urlApiPerfil}/${usuarioId}`
            }).then(({ status, body}) => {
                expect(status).to.eq(200)
                expect(body.user.name).to.eq('Iterasys')

            })
            
        })
    })
})