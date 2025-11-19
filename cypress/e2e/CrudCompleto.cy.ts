/// <reference types="cypress"/>

/* 
  - PARA LA PROXIMA CLASE TENER EL CRUD COMPLETO DE ESTE FLUJO
  - ITERAR BIEN EL ARRAY PARA QUE EL BODY NO LE LLEGUE UN ARRAY
*/

describe('Crud de usuarios', ()=> {

  it('crear usuario',()=>{
    cy.fixture('usuarios.json').then((mock)=> {
      cy.visit('http://localhost:5173');
      // verificar que los campos existan
      cy.get('input[name="name"]').should('exist')
      cy.get('input[name="email"]').should('exist')

      // recorremos el mock para llenar los campos
      mock.forEach((user:any) => {
        cy.intercept(
          'POST', 
          'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users',
          {
            statusCode: 201,
            body:user
        }).as('crearUsuario');
        cy.get('input[name="name"]').type(user.name)
        cy.get('input[name="email"]').type(user.email)
        cy.get('button[type="submit"]').click()
        cy.wait('@crearUsuario').its('request.body').should('deep.equal', {
          name: user.name,
          email: user.email
        })
      });
    })
  })

  it('listar usuarios', ()=> {
    cy.fixture('usuarios.json').then((mock)=>{
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
