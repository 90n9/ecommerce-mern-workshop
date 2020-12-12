/// <reference types="Cypress" />

describe('The Home Page', function () {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('add item to cart', () => {
    cy.get(':nth-child(1) > .card > .card-body > .d-flex > .input-group > .btn').click();
    cy.get('#nav-cart-price').should('have.text', '฿ 153');
    cy.get('#nav-cart-qty').should('have.text', '1');

    cy.get(':nth-child(1) > .card > .card-body > .d-flex > .input-group > .btn').click();
    cy.get('#nav-cart-price').should('have.text', '฿ 306');
    cy.get('#nav-cart-qty').should('have.text', '2');
  });

  it('show list of cart in header', () => {
    cy.get('.dropdown-menu').should('not.be.visible');
    cy.get('#btn-cart').click({force: true});
    cy.get('.dropdown-menu').should('be.visible');
  });
  
  it('add another product to cart', () => {
    cy.get(':nth-child(2) > .card > .card-body > .d-flex > .input-group > .btn').click();
    cy.get('#nav-cart-price').should('have.text', '฿ 369');
    cy.get('#nav-cart-qty').should('have.text', '3');

    cy.get(':nth-child(3) > .card > .card-body > .d-flex > .input-group > .btn').click();
    cy.get('#nav-cart-price').should('have.text', '฿ 1,205');
    cy.get('#nav-cart-qty').should('have.text', '4');
  });

  it('click to mycart page', () => {
    cy.get('#btn-cart').click({force: true});
    cy.get('#header-nav-cart').click({force: true});
    cy.location('pathname').should('include', 'mycart')
  });
  
  it('checkout to checkout page', () => {
    cy.get('.card-body > .text-end > .btn').click({force: true});
    cy.location('pathname').should('include', 'order')
  });

  it('submit order to api', () => {
    cy.get('#shipping-name').type('Narathip Harijiratiwong');
    cy.get('#shipping-mobile').type('0840794234');
    cy.get('#shipping-address').type('The KEY BTS Wutthakat');
    cy.get('.d-flex > .btn-primary').click({force: true});
  })
});