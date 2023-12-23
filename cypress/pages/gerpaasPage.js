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
            cy.visit('/')
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
            const href = cy.wrap($icons).invoke('attr', 'href').should('be.oneOf', this.data.SMlinks)
            const type = cy.wrap($icons).invoke('attr', 'aria-label').should('be.oneOf', this.data.SMtypes)
        })
    };

    verifyimages(locator){
        cy.get(locator).should('be.visible').should('have.attr', 'src').then((src) => {
            // Create an image object in the browser to check the naturalWidth
            cy.request(src).then((response) => {
                // Check that the response has a successful status code (e.g., 200)
                expect(response.status).to.eq(200);

                // Continue with your assertions based on the response
                const contentType = response.headers['content-type'];
                expect(contentType).to.include('image/jpeg');

                // Get the width and height of the image using image-size library
                const dimensions = sizeOf(Buffer.from(response.body, 'base64'));
                const imageWidth = dimensions.width;

                expect(imageWidth).to.be.greaterThan(0);
            });

        });
    }

    verifyNewsImages(){
        cy.get('[class="wd-post-img"] img').each($img =>{
            this.verifyimages($img)
        })
    }

    verifyWhatWeAreDoingImages(){
        cy.get('[class="category-image-wrapp"] a img').each($img =>{
            this.verifyimages($img)
        })
    }

    verifyAboutUsBttn(){
        cy.get('span[class=\'cretive-button-text\']').should('be.visible')
        cy.get('[class$=\'eael-creative-button--default\']').invoke('attr','href').should('have.text','https://gerpaas.com/about-us/')
    }


}

export default gerpaasPage