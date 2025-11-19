/// <reference types="cypress" />

describe("crear  con fixtures", () => { // cotntiene todo lo de nuestra prueba

  beforeEach(()=>{
    cy.visit('http://localhost:5173/')
  })

  it('comprobar existiencia de los inputs', ()=> {
    cy.get('input').eq(0).should('exist')
    cy.get('input').eq(1).should('exist')
  })

  it("crear usuario correctamente", () => {
    cy.fixture('crearUsuario.json').then((mock)=>{
      cy.get('input').eq(0).type(mock.name)
      cy.get('input').eq(1).type(mock.email)
      cy.intercept('POST', 'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users').as('crearUsuario');
      cy.get('button[type="submit"]').click()
      cy.wait('@crearUsuario').its('request.body').should('', {
      name: mock.name,
      email: mock.email
    })
    })
  });

});
