// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('apiLogin', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/j_spring_security_check', // URL для логина
        form: true, // Указываем, что это запрос с формой
        body: {
            j_username: username,
            j_password: password,
            from: '/', // Устанавливаем дополнительные параметры формы
            Submit: ''
        }
    }).then((response) => {
        // Проверяем, что логин прошёл успешно
        expect(response.status).to.eq(200);
        // Дополнительные проверки можно сделать здесь, если требуется
    });
});