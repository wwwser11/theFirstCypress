/// <reference types="cypress" />


describe('log-in page test suit', () =>{
    beforeEach(() => {
        cy.visit('http://localhost:8080/login?from=%2F');

    })
    it('successful loading', () => {
        const elements= [
            'img[alt]',
            '#j_username',
            '#j_password',
            '.jenkins-button',
            '#remember_me',
        ];

        elements.forEach(selector => {
            cy.get(selector).should('be.visible');
        });
    });

    it('unsuccsesfull sign in', () => {
        cy.get('#j_username').type('randomName');
        cy.get('#j_password').type('randomPass1!');
        cy.get('.jenkins-button').click();
        cy.get('.app-sign-in-register__error').should('be.visible');
    });

    it('succsesfull sign in', () => {
        
        cy.fixture('testData').then((user) => {
            cy.get('#j_username').type(user.name);
            cy.get('#j_password').type(user.password);
            cy.get('.jenkins-button').click();  
        })
        cy.get('.model-link > [data-href="http://localhost:8080/"]').should('be.visible');
        
    });

    it('succsesfull API sign in', () => {
        cy.fixture('testData').then((user) =>{
            cy.apiLogin(user.name, user.password);
        })

    })


});