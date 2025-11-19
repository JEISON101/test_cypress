/// <reference types='cypress' />

describe('listar usuarios con fixture', ()=> {

  it('listar  del fixture', ()=> {
    cy.fixture('listaUsuarios.json').then((mock)=>{
      cy.intercept(
        'GET',
        'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?select=*',
        mock
      ).as('getUsusarios')
      cy.visit('http://localhost:5173/')
      mock.forEach((user: any) => {
        cy.contains(user.name)
      });
    })
  })
})