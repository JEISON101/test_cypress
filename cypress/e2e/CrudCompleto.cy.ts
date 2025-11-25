/// <reference types="cypress"/>

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
          }
        ).as('crearUsuario');
        cy.get('input[name="name"]').clear().type(user.name)
        cy.get('input[name="email"]').clear().type(user.email)
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
        {
          statusCode: 200,
          body: mock
        }
      ).as('getUsusarios')
      cy.visit('http://localhost:5173/')
      mock.forEach((user: any) => {
        cy.contains(user.name).should('exist');
        cy.contains(user.email).should('exist');
      });
    })
  })

  it('eliminar usuario', ()=>{
    cy.fixture('usuarios.json').then((mock)=>{

      cy.fixture('crudUsuarioEliminar.json').then((mockDelete)=>{
        cy.intercept(
          'GET',
          'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?select=*',
          {
            statusCode: 200,
            body: mock
          }
        ).as('getUsusarios')
        cy.intercept(
          'DELETE',
          'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?id=eq.'+mockDelete.id, 
          {
            statusCode: 204,
            body: {}
        }).as('eliminarUsuario');

        cy.visit('http://localhost:5173/')
        cy.wait('@getUsusarios');
        cy.contains(mock[0].name).parent().find('button').contains('Eliminar').click();
        cy.wait('@eliminarUsuario');
      })
    })
  })  

})
