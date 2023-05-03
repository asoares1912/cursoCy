describe('API - Profile', () => {

  context('valida a API de perfis', () => {
    it('todos os perfis', () => {

      cy.request({
        url: '/api/profile',
        methodo: 'GET'

      }).then((resposta)) => {
        expect(resposta.status,'Status Code').to.eq(200)
      }
      
    })
      
  })
})