describe('login in Test', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#loginCont").click();

    });

    it('login page is pop up', () => {
        cy.get("#loginMain").should('be.visible');

    });

    it('login page is close', () => {
        cy.get("#quitLogin").click();
        cy.get("#loginMain").should('not.be.visible');

    });


    it('create account page is pop up', () => {
        cy.get("#createAccInstead").click();
        cy.get("#accountCreation").should('be.visible');
        cy.get("#loginMain").should('not.be.visible');


    });

    it('create account page is close', () => {
        cy.get("#createAccInstead").click();
        cy.get("#quitCreate").click();
        cy.get("#accountCreation").should('not.be.visible');

    });


    it('jump to login in page when creating account', () => {
        cy.get("#createAccInstead").click();
        cy.get("#switchToLogin").click();
        cy.get("#loginMain").should('be.visible');
        cy.get("#accountCreation").should('not.be.visible');


    });



});







describe('Base Functionality Test', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
    });

    it('start button disabled after click', () => {
        cy.get("#start-btn").click();
        cy.get('#start-btn')
            .then(function($el) {
                expect($el).to.have.attr("disabled", "disabled");
            })
    });

    it('setting page is pop up', () => {
        cy.get("#gear").click();
        cy.get("#settingsMenu").should('be.visible');

    });

    it('setting page is hidden', () => {
        cy.get("#gear").click();
        cy.get("#saveSettings").click();
        cy.get("#settingsMenu").should('not.be.visible');

    });


    it('dogeShop page is pop up', () => {
        cy.get("#coinimg").click();
        cy.get("#dogeCoinMenu").should('be.visible');

    });

    it('dogeShop page is hidden', () => {
        cy.get("#coinimg").click();
        cy.get("#dogeSave").click();
        cy.get("#dogeCoinMenu").should('not.be.visible');

    });


    it('Team page is pop up', () => {
        cy.get("#profilepic").click();
        cy.get("#teams").should('be.visible');

    });

    it('Team page is hidden', () => {
        cy.get("#profilepic").click();
        cy.get("#teamsExit").click();
        cy.get("#teams").should('not.be.visible');


    });





    it('statistics page is pop up', () => {
        cy.get("#gear").click();
        cy.get("#statistics").click();
        cy.get("#statisticsMenu").should('be.visible');

    });

    it('statistics page is hidden', () => {
        cy.get("#gear").click();
        cy.get("#statistics").click();
        cy.get("#OKbtn-statistics").click();
        cy.get("#statisticsMenu").should('not.be.visible');

    });





});


describe('Team page pop up', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.get("#profilepic").click();
    });

    it('Team create page is pop up', () => {
        cy.get("#createTeamButton").click();
        cy.get("#createTeam").should('be.visible');
        cy.get("#teams").should('not.be.visible');

    });

    it('Team create page is close', () => {
        cy.get("#createTeamButton").click();
        cy.get("#quitCreateTeam").click();
        cy.get("#createTeam").should('not.be.visible');

    });

    it('Team account login page is pop up', () => {
        cy.get("#teamsAccountLogin").click();
        cy.get("#loginMain").should('be.visible');
        cy.get("#teams").should('not.be.visible');

    });


});




describe('Volume Tests', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.get("#gear").click();
    });

    it('volume image change for sound level 3', () => {
        cy.get('#volume-slider').invoke('val', 75).trigger('input');
        cy.get('#volume-pic')
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/volume-level-3.svg");
            })

    });

    it('volume image change for sound level 2', () => {
        cy.get('#volume-slider').invoke('val', 50).trigger('input');
        cy.get("#volume-slider").click();
        cy.get('#volume-pic')
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/volume-level-2.svg");
            })


    });

    it('volume image change for sound level 1', () => {
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
});





describe('time and interval changes Tests', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.get("#gear").click();
    });

    it('work time changes', () => {
        cy.get('#work-time-number').invoke('val', 20).trigger('input');
        cy.get("#saveSettings").click();
        cy.get('#workTime')
            .then(function($el) {
                expect($el).to.have.text("20m");
            })
    });


    it('short break time changes', () => {
        cy.get('#short-break-number').invoke('val', 2).trigger('input');
        cy.get("#saveSettings").click();
        cy.get('#shortBreakTime')
            .then(function($el) {
                expect($el).to.have.text("2m");
            })
    });


    it('long break time changes', () => {
        cy.get('#long-break-number').invoke('val', 10).trigger('input');
        cy.get("#saveSettings").click();
        cy.get('#longBreakTime')
            .then(function($el) {
                expect($el).to.have.text("10m");
            })
    });


    it('long break interval changes', () => {
        cy.get('#long-break-interval').invoke('val', 3).trigger('input');
        cy.get("#saveSettings").click();
        cy.get('#counter')
            .then(function($el) {
                expect($el).to.have.text("3x");
            })
    });



});



describe('Language changes', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.get("#gear").click();
    });

    it('switch to English', () => {
        cy.get("#language-form").select('English');
        cy.get("#saveSettings").click();
        cy.get("#workText")
            .then(function($el) {
                expect($el).to.have.text("Work Phase");
            })
    });

    it('switch to Chinese', () => {
        cy.get("#language-form").select('Chinese');
        cy.get("#saveSettings").click();
        cy.get("#workText")
            .then(function($el) {
                expect($el).to.have.text("工作时段");
            })
    });


});


describe('Sound changes', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.get("#gear").click();
    });


    it('switch to Bell', () => {
        cy.get("#sound-selection").select('Bell');
        cy.get("#saveSettings").click();
        cy.get("#sound-effect")
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/bellChime.mp3");
            })
    });

    it('switch to BigBen', () => {
        cy.get("#sound-selection").select('BigBen');
        cy.get("#saveSettings").click();
        cy.get("#sound-effect")
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/BigBenBellChime.mp3");
            })
    });


    it('switch to Temple', () => {
        cy.get("#sound-selection").select('Temple');
        cy.get("#saveSettings").click();
        cy.get("#sound-effect")
            .then(function($el) {
                expect($el).to.have.prop("src", "https://stuarthan.github.io/cse110-w21-group1/source/Front-end/css/assets/TempleBell.mp3");
            })
    });




});