/// <reference types="Cypress" />

describe('The Home Page', function () {
  it('successfully loads', () => {
    cy.visit('/');
  });
});