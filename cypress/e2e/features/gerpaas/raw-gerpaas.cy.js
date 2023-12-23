// cypress/integration/navigation_spec.js

describe('Website Navigation', {baseUrl: 'https://www.gerpaas.com/'}, () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('a.cookies-accept-btn').click();
    });

    it('should navigate to the home page', () => {
        // Verify the "HOME" link and navigate to the home page
        cy.get('#menu-item-8491 a span').click();
        cy.url().should('eq', 'https://gerpaas.com/');
    });

    it('should navigate to the Cable Trays section', () => {
        // Hover over "PRODUCTS" link, then click on "Cable Trays" link
        cy.get('li[id=\'menu-item-10915\'] a span').trigger('onmouseover');
        cy.get('#menu-item-8642').trigger('onmouseover', { force: true });
        cy.get('#menu-item-8642 a').contains("Cable Trays").click({force: true});
        cy.url().should('include', '/product-category/cable-management/cable-trays/');
    });

    it('should explore Earthing Systems', () => {
        // Click on "Earthing Systems" link
        cy.get('.woodmart-nav-link:contains("Earthing Systems")').click();
        cy.url().should('include', '/product-category/earthing-systems/');
    });

    it('should download Certificates', () => {
        // Hover over "DOWNLOADS" link, then click on "Certificates" link
        cy.get('.woodmart-nav-link:contains("DOWNLOADS")').trigger('mouseover');
        cy.get('.woodmart-nav-link:contains("Certificates")').click();
        cy.url().should('include', '/certificates/');
    });

    it('should visit the News section', () => {
        // Hover over "About us" link, then click on "News" link
        cy.get('.woodmart-nav-link:contains("About us")').trigger('mouseover');
        cy.get('.woodmart-nav-link:contains("News")').click();
        cy.url().should('include', '/news/');
    });
});
