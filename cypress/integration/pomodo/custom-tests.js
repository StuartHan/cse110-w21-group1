describe('pomodoTests', () => {
    beforeEach(() => {
        cy.visit('https://stuarthan.github.io/cse110-w21-group1/');
    });

    it('volume image change for sound level 3', () => {
        cy.get("#gear").click();
        cy.get('#volume-slider').invoke('val', 75).trigger('input');
        cy.get('#volume-pic')
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/volume-level-3.svg");
            })

    });

    it('volume image change for sound level 2', () => {
        cy.get("#gear").click();
        cy.get('#volume-slider').invoke('val', 50).trigger('input');
        cy.get("#volume-slider").click();
        cy.get('#volume-pic')
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/volume-level-2.svg");
            })


    });

    it('volume image change for sound level 1', () => {
        cy.get("#gear").click();
        cy.get('#volume-slider').invoke('val', 20).trigger('input');
        cy.get("#volume-slider").click();
        cy.get('#volume-pic')
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/volume-level-1.svg");
            })


    });

    it('volume image change for sound level 0', () => {
        cy.get("#gear").click();
        cy.get('#volume-slider').invoke('val', 0).trigger('input');
        cy.get("#volume-slider").click();
        cy.get('#volume-pic')
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/volume-level-0.svg");
            })


    });

    it('start botton disabled after click', () => {
        cy.get("#start-btn").click();
        cy.get('#start-btn')
            .then(function($el) {
                expect($el).to.have.attr("disabled", "disabled");
            })

    });
});

describe('pomodoTests', () => {
    beforeEach(() => {
        cy.visit('https://stuarthan.github.io/cse110-w21-group1/');
    });
});