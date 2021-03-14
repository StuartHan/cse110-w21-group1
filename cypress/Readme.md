# How to test

## In terminal, main dir
- cd to the root directory of the project
- run 'npm install --save-dev cypress' if you haven't install the cypress environment
- run './node_modules/.bin/cypress open'
- Within the the page that is pop up, located the "custom-tests.js" file under the directory of "pomodo"
- open the link and wait for the tests automatically run


# Functions that covered in the cypress tests
## basic functionality tests
   - setting page can pop up and close after click the corresponding button
   - statistics page can pop up and close after click the corresponding button
   - dog shop page can pop up and close after click the corresponding button
   - team page can pop up and close after click the corresponding button
   - login page can be pop up and close after click the corresponding button
   - the start button will be unable to click until count down run out 
## login page tests
   - create account page can be pop up and close after click the corresponding button
   - can jump directly to create account page from login page
   - can jump directly to login page from create account page
## Team page tests
   - Team account login page can be pop up and close after click the corresponding button
   - Team accoount create page can be pop up and close after click the corresponding button
## statistics page tests
   - Work phase time will change to input value
   - Short break time will change to input value
   - Long break time will change to input value
   - Long break intevral number will change to input value
   - Page language will switch to Chinese after select the option of "Chinese"
   - Page language will switch to English after select the option of "English"
   - Alert Sound will switch to Bell after select the option of Bell
   - Alert Sound will switch to Big Ben after select the option of "Big Ben"
   - Alert Sound will switch to Temple after select the option of "Temple"
   - All settings will save after click "Save" button
## Doge shop page tests
   - Check the background will changed after click the "preview" button for all the options
   - Check the background in Color Blind mode will changed after click the preview button of all the options
   - Check the background will changed after click the "buy" button for all the options
   - Check the background in Color Blind mode will changed after click the "buy" button for all the options
   - Check each options of background will deduct the right value of coins from the account
   - Check the insufficient fund alert will appear if the account does not have enough coins for purchase
   - Check the options of background will be owned and selected by the user after purchase
## Logic of adding coins tests
   - Check the user will gain 5 coins after finish a work phase each time
   - Check the user will gain 15 coins when reach to a long Break phase each time
## Logic of statistics page tests
   - Check the work time will count and display propely on the stats page
   - Check the short break time will count and display propely on the stats page
   - Check the long break time will count and display propely on the stats page
   - 
