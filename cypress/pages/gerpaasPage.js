class gerpaasPage {

    constructor(locators, data) {
        this.locators = locators
        this.data = data
    }

    weblocators = {
    }

    invokeReload (callBack) {
        cy.window().then((win) => {
            win.document.addEventListener('click', () => {
                setTimeout(() => {
                    win.document.location.reload();
                }, 5000);
            });

            callBack();
        });
    };

    navigateTo(website){
        this.invokeReload(() => {
            cy.intercept('**').as('requests')
            cy.visit('/')
            cy.get('@requests.all')
            cy.get('a.cookies-accept-btn').click();
        });
    }
    selectPage(pageName){
        switch (pageName) {
            case 'HOME':
                this.invokeReload(() => {
                    cy.contains('HOME').click({force:true});
                });
                break;
            case 'PRODUCTS':
                this.invokeReload(() => {
                    cy.contains('PRODUCTS').click({force:true});
                });
                break;
            case 'Cable Trays':
                cy.get('li[id=\'menu-item-10915\'] a span').trigger('onmouseover');
                cy.get('#menu-item-8642').trigger('onmouseover', { force: true });
                cy.get('#menu-item-8642 a').contains("Cable Trays").click({force: true});
                break;
            case 'justifyText':
                cy.get(this.weblocators.justifyText).click()
                break;
            default:
                break;
        }
    }
    verifyURLContains(searchText) {
                cy.url().should('include', searchText);


    }
    checkSliderText(){
        cy.get('div[class*=\'subtitle-style-default\'] strong').should('have.text', "More than 90 countries globally in 6 continents");
        cy.get('div[data-id=\'91bb470\'] .liner-continer h4').should('have.text',this.data.HomePageSliderText[1]);
        //cy.get('div[data-id=\'91bb470\'] .liner-continer h4 strong').should('have.text',this.data.HomePageSliderSubText[1]);
        cy.get('.next').click();
        cy.get('div[data-id=\'4312a39\'] .liner-continer h4').should('have.text',this.data.HomePageSliderText[0]);
        //cy.get('div[data-id=\'4312a39\'] .liner-continer h4 strong').should('have.text',this.data.HomePageSliderSubText[0]);
        cy.get('.next').click();
        cy.get('div[data-id=\'3b14e52\'] .liner-continer h4').should('have.text',this.data.HomePageSliderText[2]);
        //cy.get('div[data-id=\'3b14e52\'] .liner-continer h4 strong').should('have.text',this.data.HomePageSliderSubText[2]);
    }
    verifyHeaderSMicons(){
        cy.get('.text-center.color-scheme-dark a').should('have.length', 4);
        cy.get('.text-center.color-scheme-dark a').each($icons =>{
            const href = cy.wrap($icons).invoke('attr', 'href').should('be.oneOf', this.data.SMlinks)
            console.log('href burada'+this.data.SMlinks)
            const type = cy.wrap($icons).invoke('attr', 'aria-label').should('be.oneOf', this.data.SMtypes)

        })
    };

    verifyContact() {
        // Assert the existence of the contact section
        cy.get('#footer-section').should('exist');
    }

    verifyBottomLogo(){
        cy.get('img[srcset*=\'LOGO\']').should('exist');
    }




        // Assert the presence of the company name
        cy.get('.elementor-widget-heading:contains("Company")').should('exist');

        // Assert the presence of the "Mail" link
        cy.get('a[href="mailto:info@gerpaas.com"]').should('exist');

        // Assert the presence of the "Phone" link
        cy.get('a[href="tel:+902164897005"]').should('exist');

        // Assert the presence of the "Latest News" section
        cy.get('.elementor-widget-heading:contains("Latest News")').should('exist');


}

export default gerpaasPage