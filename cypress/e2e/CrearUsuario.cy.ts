/// <reference types="cypress" />

describe("crear usuario", () => { // cotntiene todo lo de nuestra prueba

  it("crear usuario correctamente", () => { // los it son como los casos de uso por decirlo asi
    cy.visit('http://localhost:5173/')
    cy.get('input').eq(0).type('prueba de cypress')
    cy.get('input').eq(1).type('cypress@gmail.com')
    // formas para encontrar el boton
    //cy.contains('Crear Usuario').click()
    cy.get('button[type="submit"]').click()

    //verificar el post
    cy.intercept('POST', 'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users').as('crearUsuario');

    // validar que la peticion se envio
    cy.wait('@crearUsuario').its('request.body').should('', {
      name: 'preba de cypress',
      email: 'cypress@gmail.com'
    })
  });

});
