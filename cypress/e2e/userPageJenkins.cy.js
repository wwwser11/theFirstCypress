/// <reference types="cypress" />

describe('User page test suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login?from=%2F');
        cy.fixture('testData').then((user) => {
            cy.get('#j_username').type(user.name);
            cy.get('#j_password').type(user.password);
            cy.get('.jenkins-button').click();  
        })
        cy.get('.model-link > [data-href="http://localhost:8080/"]').should('be.visible');

    })

    it('elements visability test', () => {
        cy.fixture('testData').then((user) =>{
            cy.visit(`http://localhost:8080/user/${user.name}/`);
        });
        cy.get('h1').should('be.visible');

    })

    it('Dashboard dropdown list buttons visibility test', () => {

        cy.get('.jenkins-breadcrumbs__list-item  .model-link')
        .trigger('mouseover', { clientX: 10, clientY: 10 })
        .wait(1500);
        cy.get('.jenkins-menu-dropdown-chevron[data-href="http://localhost:8080/"]').should('be.visible')
        //does not work without force:true
        cy.get('.jenkins-menu-dropdown-chevron[data-href="http://localhost:8080/"]').click({force: true})
        cy.get('.jenkins-dropdown__item[href="/view/all/newJob"]').should('be.visible')
        //move to another palce
        let dropDownArray = ['New Item', 'Build History', 'Manage Jenkins', 'My Views'];
        //it checks only text mach
        cy.get('.jenkins-dropdown .jenkins-dropdown__item').each(($dropItem, index) => {
            cy.wrap($dropItem).should('include.text', dropDownArray[index]);
        })
    })
});