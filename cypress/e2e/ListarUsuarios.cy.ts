/// <reference types='cypress' />

describe('listar usuarios', ()=> {

  beforeEach(()=> {
    cy.visit('http://localhost:5173/')
  }) 

  it('listar gentes', ()=> {
    cy.intercept(
      'GET',
      'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?select=*'
    ).as('getUsusarios')
    cy.get('table tbody tr').should('exist'); // verificamos que exista
    cy.get('table tbody tr').its('length').should('be.gt', 0);
    /*
    - be.gt > mayor que
    - be.lt < menor que
    - be.gte >= mayor o igual que
    - be.lte <= menor o igual que
    */
    cy.get('table tbody tr').each(($tr)=>{
      cy.wrap($tr).find('td').eq(0).should('not.be.empty')
      cy.wrap($tr).find('td').eq(1).should('not.be.empty')
    })
  })
})