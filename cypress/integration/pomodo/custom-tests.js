describe('Login in page Tests', () => {
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







describe('Base Functionality Tests', () => {
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
        cy.get("#stats").click();
        cy.get("#statisticsMenu").should('be.visible');

    });

    it('statistics page is hidden', () => {
        cy.get("#stats").click();
        cy.get("#OKbtn-statistics").click();
        cy.get("#statisticsMenu").should('not.be.visible');

    });





});


describe('Team page Tests', () => {
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





describe('Time and break interval changes Tests', () => {
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



describe('Language changes Tests', () => {
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
                expect($el).to.have.text("工作");
            })
    });


});


describe('Sound changes Tests', () => {
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

describe('Coins adding logic Tests', () => {

    it('Add 5 coin each time after finish a work phase', () => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.window().then(win => win.cypressSetCoin(0));
        cy.window().then(win => win.setms(10));
        cy.get("#guestCont").click();
        cy.get("#gear").click();
        cy.get('#work-time-number').invoke('val', 1).trigger('input');
        cy.get("#saveSettings").click();
        cy.get("#start-btn").click();
        cy.wait(2000);
        cy.get("#cointext")
            .then(function($el) {
                expect($el).to.have.text("5");
            })
    });


    it('Add 15 coins each time after reach a long break', () => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.window().then(win => win.cypressSetCoin(0));
        cy.window().then(win => win.setms(10));
        cy.get("#guestCont").click();
        cy.get("#gear").click();
        cy.get('#work-time-number').invoke('val', 1).trigger('input');
        cy.get('#long-break-interval').invoke('val', 0).trigger('input');
        cy.get("#saveSettings").click();
        cy.get("#start-btn").click();
        cy.wait(2000);
        cy.get("#cointext")
            .then(function($el) {
                expect($el).to.have.text("15");
            })
    });


});



describe('Background image preview Tests', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.get("#coinimg").click();

    });

    it('preview for WildJungle', () => {
        cy.get("#wildjungletitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/wildjungle.jpg");
    });

    it('preview for NightMode', () => {
        cy.get("#nightmodetitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/night.jpg");
    });


    it('preview for Aquatic', () => {
        cy.get("#aquatictitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/aquatic.jpg");
    });


    it('preview for San Fransisco', () => {
        cy.get("#sanfranciscotitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/sanfrancisco.jpg");
    });


    it('preview for DogeLand', () => {
        cy.get("#dogelandtitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/god.jpg");
    });



});



describe('Background image preview Tests color blind mode', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.window().then(win => win.cypressSetCoin(900));
        cy.get("#gear").click();
        cy.get("#colorblindbox").check();
        cy.get("#saveSettings").click();
        cy.get("#coinimg").click();

    });

    it('preview for WildJungle', () => {
        cy.get("#wildjungletitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbwildjungle.jpg");
    });

    it('preview for NightMode', () => {
        cy.get("#nightmodetitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbnight.jpg");
    });


    it('preview for Aquatic', () => {
        cy.get("#aquatictitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbaquatic.jpg");
    });


    it('preview for San Fransisco', () => {
        cy.get("#sanfranciscotitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbsanfrancisco.jpg");
    });


    it('preview for DogeLand', () => {
        cy.get("#dogelandtitle").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbgod.jpg");
    });



});





describe('Buy background images Tests', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.window().then(win => win.cypressSetCoin(900));
        cy.get("#coinimg").click();

    });

    it('Buy for WildJungle, cost 0', () => {
        cy.get("#wildjunglebuy").click();
        cy.get("#insufficientText").should('not.be.visible');
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/wildjungle.jpg");
        cy.get("#cointext")
            .then(function($el) {
                expect($el).to.have.text("900");
            });
        cy.get("#wildjunglebuy")
            .then(function($el) {
                expect($el).to.have.text("Selected");
            });
    });

    it('Buy for Night mode, cost 0', () => {
        cy.get("#nightbuy").click();
        cy.get("#insufficientText").should('not.be.visible');
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/night.jpg");
        cy.get("#cointext")
            .then(function($el) {
                expect($el).to.have.text("900");
            });
        cy.get("#nightbuy")
            .then(function($el) {
                expect($el).to.have.text("Selected");
            });
    });



    it('Buy for Aquatic, cost 50', () => {
        cy.get("#aquaticbuy").click();
        cy.get("#insufficientText").should('not.be.visible');
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/aquatic.jpg");
        cy.get("#cointext")
            .then(function($el) {
                expect($el).to.have.text("850");
            });
        cy.get("#aquaticbuy")
            .then(function($el) {
                expect($el).to.have.text("Selected");
            });
    });

    it('Buy for San Francisco, cost 100', () => {
        cy.get("#sanfranciscobuy").click();
        cy.get("#insufficientText").should('not.be.visible');
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/sanfrancisco.jpg");
        cy.get("#cointext")
            .then(function($el) {
                expect($el).to.have.text("800");
            });
        cy.get("#sanfranciscobuy")
            .then(function($el) {
                expect($el).to.have.text("Selected");
            });
    });

    it('Buy for Doge Land, cost all', () => {
        cy.get("#dogebuy").click();
        cy.get("#insufficientText").should('not.be.visible');
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/god.jpg");
        cy.get("#cointext")
            .then(function($el) {
                expect($el).to.have.text("0");
            });
        cy.get("#dogebuy")
            .then(function($el) {
                expect($el).to.have.text("Selected");
            });
    });


    it('Buy All, all owned', () => {
        cy.get("#wildjunglebuy").click();
        cy.get("#nightbuy").click();
        cy.get("#aquaticbuy").click();
        cy.get("#sanfranciscobuy").click();
        cy.get("#dogebuy").click();
        cy.get("#wildjunglebuy")
            .then(function($el) {
                expect($el).to.have.text("Owned");
            });
        cy.get("#nightbuy")
            .then(function($el) {
                expect($el).to.have.text("Owned");
            });
        cy.get("#aquaticbuy")
            .then(function($el) {
                expect($el).to.have.text("Owned");
            });
        cy.get("#sanfranciscobuy")
            .then(function($el) {
                expect($el).to.have.text("Owned");
            });
        cy.get("#wildjunglebuy").click();
        cy.get("#dogebuy")
            .then(function($el) {
                expect($el).to.have.text("Owned");
            });
    });


});



describe('Buy background images Tests blind mode', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.window().then(win => win.cypressSetCoin(900));
        cy.get("#gear").click();
        cy.get("#colorblindbox").check();
        cy.get("#saveSettings").click();
        cy.get("#coinimg").click();

    });

    it('Buy for WildJungle blind mode', () => {
        cy.get("#wildjunglebuy").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbwildjungle.jpg");

    });

    it('Buy for Night mode blind mode', () => {
        cy.get("#nightbuy").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbnight.jpg");

    });



    it('Buy for Aquatic blind mode', () => {
        cy.get("#aquaticbuy").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbaquatic.jpg");

    });

    it('Buy for San Francisco blind mode', () => {
        cy.get("#sanfranciscobuy").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbsanfrancisco.jpg");

    });

    it('Buy for DogeLand blind mode', () => {
        cy.get("#dogebuy").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/cbgod.jpg");

    });
});





describe('Buy background images Tests insufficient fund', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.get("#guestCont").click();
        cy.window().then(win => win.cypressSetCoin(0));
        cy.get("#coinimg").click();

    });


    it('Buy for Aquatic insufficient fund', () => {
        cy.get("#aquaticbuy").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/wildjungle.jpg");
        cy.get("#insufficientText").should('be.visible');
        cy.get("#aquaticbuy")
            .then(function($el) {
                expect($el).to.have.text("Buy");
            });

    });

    it('Buy for San Francisco insufficient fund', () => {
        cy.get("#sanfranciscobuy").click();
        cy.get("#body")
            .should('have.css', "background-image")
            .and("include", "assets/wildjungle.jpg");
        cy.get("#insufficientText").should('be.visible');
        cy.get("#sanfranciscobuy")
            .then(function($el) {
                expect($el).to.have.text("Buy");
            });

    });


});




describe('Stats logic Tests', () => {
    beforeEach(() => {
        cy.visit("https://stuarthan.github.io/cse110-w21-group1/");
        cy.window().then(win => win.setms(10));
        cy.get("#guestCont").click();
        cy.get("#gear").click();
        cy.get('#work-time-number').invoke('val', 1).trigger('input');
        cy.get('#short-break-number').invoke('val', 1).trigger('input');
        cy.get('#long-break-number').invoke('val', 1).trigger('input');
        cy.get('#long-break-interval').invoke('val', 2).trigger('input');
        cy.get("#saveSettings").click();
        cy.get("#start-btn").click();
        cy.wait(2000);
    });

    it('work time counts properly', () => {
        cy.get("#stats").click();
        cy.get("#statsWork")
            .then(function($el) {
                expect($el).to.have.text("You have worked 1 mins.");
            })

    });

    it('short break time couonts properly', () => {
        cy.get("#start-btn").click();
        cy.wait(2000);
        cy.get("#stats").click();
        cy.get("#statsWork")
            .then(function($el) {
                expect($el).to.have.text("You have worked 1 mins.");
            })
        cy.get("#statsBreak")
            .then(function($el) {
                expect($el).to.have.text("And rested 1 mins.");
            })


    });


    it('work time couonts properly another round ', () => {
        cy.get("#start-btn").click();
        cy.wait(2000);
        cy.get("#start-btn").click();
        cy.wait(2000);
        cy.get("#stats").click();
        cy.get("#statsWork")
            .then(function($el) {
                expect($el).to.have.text("You have worked 2 mins.");
            })

    });


    it('long break time couonts properly', () => {
        cy.get("#start-btn").click();
        cy.wait(2000);
        cy.get("#start-btn").click();
        cy.wait(2000);
        cy.get("#start-btn").click();
        cy.wait(2000);
        cy.get("#stats").click();
        cy.get("#statsWork")
            .then(function($el) {
                expect($el).to.have.text("You have worked 2 mins.");
            })
        cy.get("#statsBreak")
            .then(function($el) {
                expect($el).to.have.text("And rested 2 mins.");
            })


    });




});