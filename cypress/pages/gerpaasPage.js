
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
            cy.visit('/',{headers: {"Accept-Encoding": "gzip, deflate "}})
            cy.get('a.cookies-accept-btn').click();
        });
    }
    selectPage(pageName){
        switch (pageName) {
            case 'HOME':
                this.invokeReload(() => {
                    cy.contains('HOME').click({force: true});
                });
                break;
            case 'PRODUCTS':
                this.invokeReload(() => {
                    cy.contains('PRODUCTS').click({force: true});
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
        cy.get('.next').click();
        cy.get('div[data-id=\'4312a39\'] .liner-continer h4').should('have.text',this.data.HomePageSliderText[0]);
    }
    verifyHeaderSMicons(){
        cy.get('.text-center.color-scheme-dark a').should('have.length', 4);
        cy.get('.text-center.color-scheme-dark a').each($icons =>{
            cy.wrap($icons).invoke('attr', 'href').should('be.oneOf', this.data.SMlinks)
            cy.wrap($icons).invoke('attr', 'aria-label').should('be.oneOf', this.data.SMtypes)

        })
    };

    verifyContact() {
        // Assert the existence of the contact section
        cy.get('#footer-section').should('exist');
    }

    verifyBottomLogo(){
        cy.get('img[srcset*=\'LOGO\']').should('exist');
    }

    verifyMailLink(){
        // Assert the presence of the "Mail" link
        cy.get('a[href="mailto:info@gerpaas.com"]').should('exist');
    }

    verifyPhoneLink(){
        // Assert the presence of the "Phone" link
        cy.get('a[href="tel:+902164897005"]').should('exist');
    }

    verifySubscribe(){
        cy.get('input[value=\'SUBSCRIBE\']').should('exist')
    }
    verifyFooterSMicons(){
        cy.get('div[class*=\'icons-design-bordered\'] a').should('have.length', 4);
        cy.get('div[class*=\'icons-design-bordered\'] a').each($icons =>{
            cy.wrap($icons).invoke('attr', 'href').should('be.oneOf', this.data.SMlinks)
            cy.wrap($icons).invoke('attr', 'aria-label').should('be.oneOf', this.data.SMtypes)
        })
    };

    verifyImages(locator){
        cy.get(locator).then(img =>{
            cy.wrap(locator).should('be.visible');
            expect(img[0].naturalWidth).to.be.greaterThan(0);
        })
        cy.get(locator).should('have.attr', 'src')
        /* cy.get(locator).invoke('attr', 'src').then(src => {
            // Create an image object in the browser to check the naturalWidth
            cy.request(src).then((response) => {
                // Check that the response has a successful status code (e.g., 200)
                expect(response.status).to.eq(200);

                // Continue with your assertions based on the response
                const contentType = response.headers['content-type'];
                expect(contentType).to.include('image');
            });

        });*/
    }

    verifyNewsImages(){
        let count=0;
        let stop = false;
        cy.get('[class="wd-post-img"] img').each($img =>{
            cy.wrap($img).waitForImageToBeVisible($img);
            this.verifyImages($img)
            count ++
            if(count === 4 ){
                stop=true;

            }
        })
    }

    verifyWhatWeAreDoingImages(){
        cy.get('[class="category-image-wrapp"] a img').each($img =>{
            cy.wrap($img).waitForImageToBeVisible($img);
            this.verifyImages($img)
        })
    }

    verifyAboutUsBttn(){
        cy.get('span[class=\'cretive-button-text\']').should('be.visible')
        cy.get('[class$=\'eael-creative-button--default\']').invoke('attr','href').should('contain','https://gerpaas.com/about-us/')
    }


}

export default gerpaasPage