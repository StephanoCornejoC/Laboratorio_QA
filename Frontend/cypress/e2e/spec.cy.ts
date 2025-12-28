describe('Prueba de Tareas', () => {
  it('Debe mostrar tareas y permitir agregar una nueva', () => {
    // 1. Interceptar la llamada al backend para simular respuesta (Mocking)
    cy.intercept('GET', '/tareas', [
      { id: 1, nombre: 'Tarea Mock 1' }
    ]).as('getTareas');

    cy.intercept('POST', '/tareas', {
      id: 2, nombre: 'Tarea Nueva Cypress'
    }).as('postTarea');

    // 2. Visitar la web
    cy.visit('/');

    // 3. Verificar que carga la tarea inicial
    cy.wait('@getTareas');
    cy.get('[data-cy="item-tarea"]').should('contain', 'Tarea Mock 1');

    // 4. Agregar nueva tarea
    cy.get('[data-cy="input-tarea"]').type('Tarea Nueva Cypress');
    cy.get('[data-cy="btn-agregar"]').click();

    // 5. Verificar que se envió la petición
    cy.wait('@postTarea').its('request.body').should('deep.equal', {
      nombre: 'Tarea Nueva Cypress'
    });
  });
});