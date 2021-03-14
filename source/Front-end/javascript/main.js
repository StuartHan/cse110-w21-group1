/******************************************************************************
 * File Name    : main.js
 * First Created: Feb 14
 * Last  Revised: Mar 14 
 * Curr  Version: 3.0
 * 
 * INDEX:
 * #1 Global Variables
 * #2 User information load/store
 * #3 Teams feature create/invite/remove
 * #4 Open/Close menus, settings, store, etc.
 * #5 Doge Store
 * #6 Login Page/Create Account
 * #7 Timer functions/helper functions
 *****************************************************************************/

//#1 Global Variables
var workSec = 1500; // total seconds in work mode, 1500 for Pomodoro 
var sBrkSec = 300; // total seconds in short break mode, 300 for Pomodoro 
var lBrkSec = 900; // total seconds in long break mode, 900 for Pomodoro 
var ms = 10; // 1000 = 1s

/* Test function： ms smaller, timer runs faster */
function setms(thisms) { ms = thisms; }

var currMode = "w"; // current mode. Default is working mode
var counts = 0; // # of working periods. counts >= countsThres -> long break
var countsThres = 4; // = Long break interval
var color = "rgba(3,165,89,0.6)";
var language = "EN";
var loggedIn = false;

var totalSec = workSec; // default starting mode is working mode
document.getElementById("time").innerHTML = secToTime(workSec); //On load

/* ============================================================================
 * First Created: Mar 2  -- Yichen Han
 * Last  Revised: Mar 2  -- Yichen Han
 * Revised Times: 1
 * 
 * Description  : Variables shown in Statistics.
 * Discrip in CN: 统计窗口中展示的变量。
 * Type         : Global Variables.
 =========================================================================== */
 var totalWorkMins  = 0;
 var totalBreakMins = 0;
 var totalWorkCount = 0;
 var totalSBrkCount = 0;
 var totalLBrkCount = 0;

/* ============================================================================
 * Name         : DOMContentLoaded (#1)
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * 
 * Description  : When the DOM Content is loaded, if it is a user's first time visiting
 *                the website, load in the coin, shopitems, and active localStorage items.
 *                Otherwise, load the most recently used background and coins.
 =========================================================================== */
 window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('coin') == null || localStorage.getItem('shopitems') == null || localStorage.getItem('visited') == null){ //Initialize Doge Coins
        window.localStorage.setItem('coin', "900");
        window.localStorage.setItem('shopitems', "000"); //Bit based indexing
        window.localStorage.setItem('active', "10000");
        window.localStorage.setItem('colorblind', "0");
        document.getElementById("cointext").innerHTML = "900";
        window.localStorage.setItem('visited',"true");
    }
    else{
        document.getElementById("cointext").innerHTML = window.localStorage.getItem('coin');
        if (localStorage.getItem("colorblind") == "1")
            document.getElementById("colorblindbox").checked = true;
        if (localStorage.getItem("visited") == "true"){
            document.getElementById("loginNotification").style.visibility = "hidden";
            document.getElementById("greywrapper").style.visibility = "hidden";
        }
    }
    loadUserSettings();
    loadActive();
    darkenChosen();
});

// #2 User information load/store
/* ============================================================================
 * Name         : loadUserSettings()
 * First Created: March 10 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 10 -- Suk Chan (Kevin) Lee
 * Revised Times: 3
 * 
 * Description  : If logged in, load user settings into local storage and change
 *      button innerHTML accordingly.
 * Description in CN: 
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
function loadUserSettings(){
    if (localStorage.getItem("username") != null) {
        firebase.auth().signInWithEmailAndPassword(localStorage.getItem("username"),localStorage.getItem("password"))
        .then((userCredential) => {
            let user = userCredential.user;
            document.getElementById("welcome").innerHTML = "Welcome "+user.displayName+"!";
            document.getElementById("loginNotification").style.visibility = "hidden";
            document.getElementById("greywrapper").style.visibility = "hidden";
            document.getElementById("teamsAccountLogin").innerHTML = "Logout";
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            document.getElementById("teamsAccountLogin").innerHTML = "Login";
            if(language=="CN") {document.getElementById("teamsAccountLogin").innerHTML = "登陆";}
        });
    }
    else{ //Not logged in
        document.getElementById("teamsAccountLogin").innerHTML = "Login";
        if(language=="CN") {document.getElementById("teamsAccountLogin").innerHTML = "登陆";}
    }
}

/* ============================================================================
 * Name         : proceedLogin Event Listener
 * First Created: March 10 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 10 -- Suk Chan (Kevin) Lee
 * Revised Times: 3
 * 
 * Description  : If login is valid, log in user and load settings into local storage.
 *      If invalid, throw error message onto interface.
 * Description in CN: 
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
document.getElementById("proceedLogin").addEventListener("click", function() { //Login Press
    document.getElementById("invalidLogin").style.visibility = "hidden";
    document.getElementById("loadingNotif").style.visibility = "visible";
    firebase.auth().signInWithEmailAndPassword(document.getElementById("user").value, document.getElementById("pass").value)
    .then((userCredential) => {
        var user = userCredential.user;
        localStorage.setItem("username", document.getElementById("user").value);
        localStorage.setItem("password",document.getElementById("pass").value);
        document.getElementById("welcome").innerHTML = "Welcome "+user.displayName+"!";
        document.getElementById("loginMain").style.visibility = "hidden";
        document.getElementById("greywrapper").style.visibility = "hidden";
        document.getElementById("loadingNotif").style.visibility = "hidden";
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("invalidLogin").style.visibility = "visible";
        document.getElementById("loadingNotif").style.visibility = "hidden";
    });
});

/* ============================================================================
 * Name         : createUserData(email,name,coins,shopitems,active,colorblind)
 * First Created: March 10 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 10 -- Suk Chan (Kevin) Lee
 * Revised Times: 1
 * 
 * Description  : Helper function to create user data in Google Firebase Auth
 * Description in CN: 
 * Parameter    : email - email of user
 *                name - name of user
 *                coins - amount of coins user has
 *                shopitems - items user has already bought
 *                active - active background
 *                colorblind - if user has enabled colorblind mode
 * Return       : N/A
 =========================================================================== */
 function createUserData(email,name,coins,shopitems,active,colorblind){
    firebase.database().ref('users/'+email).set({
        username: name,
        coin: coins,
        shopitems: shopitems,
        active: active,
        colorblind: colorblind,
        teams: {}
    });
}

/* ============================================================================
 * Name         : getUserData(userEmail)
 * First Created: March 10 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 10 -- Suk Chan (Kevin) Lee
 * Revised Times: 1
 * 
 * Description  : Helper function to get user data in Google Firebase Auth
 * Description in CN: 
 * Parameter    : userEmail - email of user
 * Return       : N/A
 =========================================================================== */
function getUserData(userEmail){ //Working with GitHub Pages
    database.child("users").child(userEmail).get().then(function(snapshot) {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        }
        else {
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
    });
}

//#3 Teams Feature
/* ============================================================================
 * Name         : teamsAccountLogin Event Listener
 * First Created: March 10 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 10 -- Suk Chan (Kevin) Lee
 * Revised Times: 1
 * 
 * Description  : Logout user if logged in, otherwise direct to login screen.
 * Description in CN: 
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
document.getElementById("teamsAccountLogin").addEventListener("click", function() { //Login/Logout Button
    if (loggedIn){//Logout Operation, DON'T remove accessibility settings
        document.getElementById("welcome").innerHTML = "Welcome Guest!";
        document.getElementById("teamsAccountLogin").innerHTML = "Login";
        localStorage.setItem("coin","0")//Remove coins
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        //Stop GET requests
    }
    else{
        document.getElementById("loginMain").style.visibility = "visible";
        document.getElementById("teams").style.visibility = "hidden";
    }
});



/* ============================================================================
 * Name         : createTeam(name,worktime,shorttime,longtime,user)
 * First Created: March 10 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 10 -- Suk Chan (Kevin) Lee
 * Revised Times: 1
 * 
 * Description  : Helper function to create team data in Google Firebase Auth
 * Description in CN: 
 * Parameter    : name - name of team
 *                worktime - work time length of team
 *                shorttime - short break time length of team
 *                longtime - long break time length of team
 *                user - users in team
 * Return       : N/A
 =========================================================================== */
function createTeam(name,worktime,shorttime,longtime,user){
    firebase.database().ref('teams/'+name).set({
        worktime: worktime,
        shorttime: shorttime,
        longtime: longtime,
        admins: {user1: user}, //Person who created team is admin
        users: {user1: user}
    });
}

/* ============================================================================
 * Name         : createTeam(name,worktime,shorttime,longtime,user)
 * First Created: March 10 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 10 -- Suk Chan (Kevin) Lee
 * Revised Times: 1
 * 
 * Description  : Helper function to create team data in Google Firebase Auth
 * Description in CN: 
 * Parameter    : name - name of team
 *                worktime - work time length of team
 *                shorttime - short break time length of team
 *                longtime - long break time length of team
 *                user - users in team
 * Return       : N/A
 =========================================================================== */
function updateUser(email,name,coins,shopitems,active,colorblind){
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };
}

function updateCoin(user,amount){
    let string = '/users/' + user +'/coin'
    firebase.database().ref().update({string : amount})
}

// #4 Open/Close menus, settings, store, etc.

// Open Settings / Gear
document.getElementById("gear").addEventListener("click", function() { //On click, show settings
    document.getElementById("settingsMenu").style.visibility = "visible";
    document.getElementById("main").style.visibility = "hidden";
    document.getElementById("statisticsMenu").style.visibility = "hidden";
    document.getElementById("dogeCoinMenu").style.visibility = "hidden";
    chooseSoundEffect();
});

// Open Statistics / Stats
document.getElementById("stats").addEventListener("click", function() { //On click, show statistics
    document.getElementById("statisticsMenu").style.visibility = "visible";
    document.getElementById("main").style.visibility = "hidden";
    document.getElementById("settingsMenu").style.visibility = "hidden";
    document.getElementById("dogeCoinMenu").style.visibility = "hidden";
    showStats();
});

// Close Statistics / Stats
document.getElementById("OKbtn-statistics").addEventListener("click", function() { //On click, hide statistics page
    document.getElementById("statisticsMenu").style.visibility = "hidden";
    // document.getElementById("gear").click();
    document.getElementById("main").style.visibility = "visible";
});

//Choose sound
document.getElementById("sound-selection").addEventListener("input", function(){//On click, preview corresponding sound
    if (document.getElementById("sound-selection").value == "Bell"){
        document.getElementById("sound-effect").src = "source/Front-end/css/assets/bellChime.mp3";
        document.getElementById("sound-effect").play();
    }
    else if (document.getElementById("sound-selection").value == "BigBen"){
        document.getElementById("sound-effect").src = "source/Front-end/css/assets/BigBenBellChime.mp3";
        document.getElementById("sound-effect").play();
    }
    else{
        document.getElementById("sound-effect").src = "source/Front-end/css/assets/TempleBell.mp3";
        document.getElementById("sound-effect").play();
    }
});

//Select colorblind option
document.getElementById("colorblindbox").addEventListener("click",function(){
    if (document.getElementById("colorblindbox").checked)
        localStorage.setItem("colorblind","1");
    else
    localStorage.setItem("colorblind","0");
});

//Save and load Settings info
document.getElementById("saveSettings").addEventListener("click", function() { //On click, hide settings
    document.getElementById("settingsMenu").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "visible";
    saveTimeSettings();
    if (document.getElementById("language-form").value == "Chinese") {
        SwitchToChinese();
    } 
    else if (document.getElementById("language-form").value == "English") {
        SwitchToEnglish();
    }
    chooseSoundEffect();
    loadActive();
});


// #5 Doge Shop
// Open Doge shop
document.getElementById("dogecoin").addEventListener("click", function() { //On click, show Doge Store
    document.getElementById("dogeCoinMenu").style.visibility = "visible";
    document.getElementById("statisticsMenu").style.visibility = "hidden";
    document.getElementById("settingsMenu").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "hidden";
    saveTimeSettings();
});

//On click, hide Doge Store
document.getElementById("dogeSave").addEventListener("click", function() {
    document.getElementById("insufficientText").style.visibility = "hidden";
    document.getElementById("dogeCoinMenu").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "visible";
    loadActive();
    darkenChosen();
});

//On click, preview the Jungle Theme
document.getElementById("wildjungle").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbwildjungle.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/wildjungle.jpg")';
    turnLight();
});

//On click, switch to Jungle Theme
document.getElementById("wildjunglebuy").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    setActive(0);
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbwildjungle.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/wildjungle.jpg")';
    turnLight();
    darkenChosen();
});

//On click, preview night Theme
document.getElementById("night").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbnight.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/night.jpg")';
    turnLight();
});

//On click, switch to night Theme
document.getElementById("nightbuy").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    setActive(1);
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbnight.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/night.jpg")';
    turnDark();
    darkenChosen();
});

//On click, preview Aquatic Theme
document.getElementById("aquatic").addEventListener("click", function() {
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbaquatic.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/aquatic.jpg")';
    turnLight();
});

//On click, switch to Aquatic Theme if enough coins
document.getElementById("aquaticbuy").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (window.localStorage.getItem('shopitems')[0] == '1'){
        if (document.getElementById("colorblindbox").checked)
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbaquatic.jpg")';
        else
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/aquatic.jpg")';
        turnLight();
        setActive(2);
    }
    else if (parseInt(window.localStorage.getItem('coin')) >= 50){
        document.getElementById("cointext").innerHTML = (parseInt(window.localStorage.getItem('coin')) - 50).toString();
        window.localStorage.setItem('coin',(parseInt(window.localStorage.getItem('coin')) - 50).toString());
        if (document.getElementById("colorblindbox").checked)
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbaquatic.jpg")';
        else
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/aquatic.jpg")';
        setShopItems(0);
        turnLight();
        setActive(2);
    }
    else
        document.getElementById("insufficientText").style.visibility = "visible";
    darkenChosen();
});

//On click, preview San Francisco Theme
document.getElementById("sanfrancisco").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbsanfrancisco.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/sanfrancisco.jpg")';
    turnLight();
});

//On click, switch to San Francisco Theme if enough coins
document.getElementById("sanfranciscobuy").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (window.localStorage.getItem('shopitems')[1] == '1'){
        if (document.getElementById("colorblindbox").checked)
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbsanfrancisco.jpg")';
        else
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/sanfrancisco.jpg")';
        turnLight();
        setActive(3);
    }
    else if (parseInt(window.localStorage.getItem('coin')) >= 100){
        document.getElementById("cointext").innerHTML = (parseInt(window.localStorage.getItem('coin')) - 100).toString();
        window.localStorage.setItem('coin',(parseInt(window.localStorage.getItem('coin')) - 100).toString());
        setShopItems(1);
        if (document.getElementById("colorblindbox").checked)
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbsanfrancisco.jpg")';
        else
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/sanfrancisco.jpg")';
        turnLight();
        setActive(3);
    }
    else
        document.getElementById("insufficientText").style.visibility = "visible";
    darkenChosen();
});

//On click, preview Doge Theme
document.getElementById("dogeland").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbgod.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/god.jpg")';
    turnLight();
});

//On click, switch to Doge Theme if enough coins
document.getElementById("dogebuy").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (window.localStorage.getItem('shopitems')[2] == '1'){
        if (document.getElementById("colorblindbox").checked)
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbgod.jpg")';
        else
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/god.jpg")';
        turnLight();
        setActive(4);
    }
    else{
        window.localStorage.setItem("coin","0");//Take away everything they own. Everything.
        document.getElementById("cointext").innerHTML = "0";
        setShopItems(2);
        if (document.getElementById("colorblindbox").checked)
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbgod.jpg")';
        else
            document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/god.jpg")';
        turnLight();
        setActive(4);
    }
    darkenChosen();
});

//Cypress function to test coins
function cypressSetCoin(amount){
    localStorage.setItem("coin",amount);
    document.getElementById("cointext").innerHTML = amount;
}

//#6 Login Page/Create Account
//Continue as guest
document.getElementById("guestCont").addEventListener("click", function() {
    document.getElementById("loginNotification").style.visibility = "hidden";
    document.getElementById("greywrapper").style.visibility = "hidden";
});

//Continue to login page
document.getElementById("loginCont").addEventListener("click", function() { 
    document.getElementById("loginNotification").style.visibility = "hidden";
    document.getElementById("loginMain").style.visibility = "visible";
});

//Quit Login Page
document.getElementById("quitLogin").addEventListener("click", function() { 
    document.getElementById("loginMain").style.visibility = "hidden";
    document.getElementById("greywrapper").style.visibility = "hidden";
    document.getElementById("invalidLogin").style.visibility = "hidden";
});

/* ============================================================================
 * Name         : createAcc Event Listener
 * First Created: March 10 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 10 -- Suk Chan (Kevin) Lee
 * Revised Times: 1
 * 
 * Description  : Helper function to create team data in Google Firebase Auth
 * Description in CN: 
 * Parameter    : name - name of team
 *                worktime - work time length of team
 *                shorttime - short break time length of team
 *                longtime - long break time length of team
 *                user - users in team
 * Return       : N/A
 =========================================================================== */
document.getElementById("createAcc").addEventListener("click", function() { //Create User
    if ((String)(document.getElementById("emailCreate").value).includes("@") && (String)(document.getElementById("emailCreate").value).includes(".")
    && (String)(document.getElementById("nameCreate").value).length <= 15 && (String)(document.getElementById("passCreate").value).length >= 8){
        document.getElementById("createError").style.visibility = "hidden";
        firebase.auth().createUserWithEmailAndPassword(
            document.getElementById("emailCreate").value, document.getElementById("passCreate").value)
        .then((userCredential) => {
            var user = userCredential.user;
            user.updateProfile({
                displayName: document.getElementById("nameCreate").value
            });
            createUserData(
                document.getElementById("emailCreate").value,
                document.getElementById("nameCreate").value,
                localStorage.getElementById('coin'),
                localStorage.getElementById('shopitems'),
                localStorage.getElementById('active'),
                localStorage.getElementById('colorblind'),
            );
            localStorage.setItem("username", document.getElementById("emailCreate").value);
            localStorage.setItem("password",document.getElementById("passCreate").value);
            document.getElementById("welcome").innerHTML = "Welcome "+document.getElementById("nameCreate").value+"!";
            //if (language == "CN") {document.getElementById("welcome").innerHTML = "欢迎使用， "+document.getElementById("nameCreate").value+"!";} // change language 
            document.getElementById("greywrapper").style.visibility = "hidden";
            document.getElementById("accountCreation").style.visibility = "hidden";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
    }
    else if (!(String)(document.getElementById("emailCreate").value).includes("@") || !(String)(document.getElementById("emailCreate").value).includes(".")){
        document.getElementById("createError").innerHTML = "Invalid Email";
        document.getElementById("createError").style.visibility = "visible";
    }
    else if ((String)(document.getElementById("nameCreate").value).length > 15) {
        document.getElementById("createError").innerHTML = "Names must be at most 15 characters";
        document.getElementById("createError").style.visibility = "visible";
    }
    else if ((String)(document.getElementById("passCreate").value).length < 8) {
        document.getElementById("createError").innerHTML = "Password must be at least 8 characters";
        document.getElementById("createError").style.visibility = "visible";
    }
});

document.getElementById("quitCreate").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("greywrapper").style.visibility = "hidden";
    document.getElementById("accountCreation").style.visibility = "hidden";
    document.getElementById("createError").style.visibility = "hidden";
});

document.getElementById("notifCreate").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("loginNotification").style.visibility = "hidden";
    document.getElementById("accountCreation").style.visibility = "visible";
});

document.getElementById("createAccInstead").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("loginMain").style.visibility = "hidden";
    document.getElementById("accountCreation").style.visibility = "visible";
    document.getElementById("invalidLogin").style.visibility = "hidden";
});

document.getElementById("switchToLogin").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("loginMain").style.visibility = "visible";
    document.getElementById("accountCreation").style.visibility = "hidden";
    document.getElementById("createError").style.visibility = "hidden";
});

document.getElementById("profilepic").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
        document.getElementById("teams").style.visibility = "visible";
});

document.getElementById("teamsExit").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("teams").style.visibility = "hidden";
});

document.getElementById("quitCreateTeam").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("createTeam").style.visibility = "hidden";
});

document.getElementById("createTeamButton").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("createTeam").style.visibility = "visible";
});

document.getElementById("backToTeams").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("teams").style.visibility = "visible";
    document.getElementById("createTeam").style.visibility = "hidden";
});

/* ============================================================================
 * Name         : incrementCoin(amount)
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Volume Slider controls. Change image and sound accordingly.
 * Description in CN: 音量滑块控件。相应地更改图像和声音
 * Parameter    : amount, the amount to increase coin inventory by.
 * Return       : N/A
 =========================================================================== */
function incrementCoin(amount){
    let newNum = (parseInt(localStorage.getItem("coin"))+amount).toString();
    localStorage.setItem("coin",newNum);
    if (loggedIn)
        updateCoin(localStorage.getItem("username"),localStorage.getItem("coin"));
    document.getElementById("cointext").innerHTML = newNum;
}

/* ==========================================================================
 * Name         : loadActive()
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Load the last selected theme
 * Description in CN： 加载最近选择的主题
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
function loadActive(){
    let active = window.localStorage.getItem('active');
    if (active[0] == 1){
        document.getElementById('wildjunglebuy').click();
    }
    else if (active[1] == 1){
        document.getElementById('nightbuy').click();
    }
    else if (active[2] == 1){
        document.getElementById('aquaticbuy').click();
    }
    else if (active[3] == 1){
        document.getElementById('sanfranciscobuy').click();
    }
    else if (active[4] == 1){
        document.getElementById('dogebuy').click();
    }
}

/* ============================================================================
 * Name         : darkenChosen()
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Darken the last selected theme's button
 * Description in CN： 使上一个选定主题的按钮变暗
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
function darkenChosen(){
    let active = window.localStorage.getItem('active');
    let shopitems = window.localStorage.getItem('shopitems');
    let english = document.getElementById("language-form").value == "English";
    document.getElementById('wildjunglebuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('nightbuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('aquaticbuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('sanfranciscobuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('dogebuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('wildjunglebuy').innerHTML = "Owned";
    if(!english) {document.getElementById('wildjunglebuy').innerHTML = "已拥有";}
    document.getElementById('nightbuy').innerHTML = "Owned";
    if(!english) {document.getElementById('nightbuy').innerHTML = "已拥有";}
    if (shopitems[0] == 1){
        if (english)
            document.getElementById('aquaticbuy').innerHTML = "Owned";
        else
            document.getElementById('aquaticbuy').innerHTML = "已拥有";
    }
    else{
        if (english)
            document.getElementById('aquaticbuy').innerHTML = "Buy";
        else
            document.getElementById('aquaticbuy').innerHTML = "购买";
    }
    if (shopitems[1] == 1){
        if (english)
            document.getElementById('sanfranciscobuy').innerHTML = "Owned";
        else
            document.getElementById('sanfranciscobuy').innerHTML = "已拥有";
    }
    else{
        if (english)
            document.getElementById('sanfranciscobuy').innerHTML = "Buy";
        else
            document.getElementById('sanfranciscobuy').innerHTML = "购买";
    }
    if (shopitems[2] == 1){
        if (english)
            document.getElementById('dogebuy').innerHTML = "Owned";
        else
            document.getElementById('dogebuy').innerHTML = "已拥有";
    }
    else{
        if (english)
            document.getElementById('dogebuy').innerHTML = "Buy";
        else
            document.getElementById('dogebuy').innerHTML = "购买";
    }
    if (active[0] == 1){
        document.getElementById('wildjunglebuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        if (english)
            document.getElementById('wildjunglebuy').innerHTML = "Selected";
        else
            document.getElementById('wildjunglebuy').innerHTML = "已选择";
    }
    else if (active[1] == 1){
        document.getElementById('nightbuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        if (english)
            document.getElementById('nightbuy').innerHTML = "Selected";
        else
            document.getElementById('nightbuy').innerHTML = "已选择";
    }
    else if (active[2] == 1){
        document.getElementById('aquaticbuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        if (english)
            document.getElementById('aquaticbuy').innerHTML = "Selected";
        else
            document.getElementById('aquaticbuy').innerHTML = "已选择";
    }
    else if (active[3] == 1){
        document.getElementById('sanfranciscobuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        if (english)
            document.getElementById('sanfranciscobuy').innerHTML = "Selected";
        else
            document.getElementById('sanfranciscobuy').innerHTML = "已选择";
    }
    else if (active[4] == 1){
        document.getElementById('dogebuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        if (english)
            document.getElementById('dogebuy').innerHTML = "Selected";
        else
            document.getElementById('dogebuy').innerHTML = "已选择";
    }
}

/* ============================================================================
 * Name         : setShopItems(index)
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Set the index to 1 in shopitems in localStorage
 * Description in CN：在本地存储的可购物品中将指标设置为1
 * Parameter    : index, index to turn to 1
 * Return       : N/A
 =========================================================================== */
function setShopItems(index){
    let shopitems = window.localStorage.getItem('shopitems');
    let temp = "";
    for (let i = 0; i < shopitems.length; i++){
        if (i == index)
            temp += "1"
        else
            temp += shopitems[i]
    }
    window.localStorage.setItem('shopitems',temp);
}

/* ============================================================================
 * Name         : Volume Slider
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Volume Slider controls. Change image and sound accordingly.
 * Description in CN：音量滑块控件。相应地更改图像和声音。
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
document.getElementById("volume-slider").addEventListener("click", function() { //Alter volume
    let source = document.getElementById("volume-pic");
    let volume = document.getElementById("volume-slider").value;
    document.getElementById("sound-effect").volume = volume / 100;
    if (volume == 0)
        source.src = "source/Front-end/css/assets/volume-level-0.svg";
    else if (volume > 0 && volume < 33)
        source.src = "source/Front-end/css/assets/volume-level-1.svg";
    else if (volume > 33 && volume < 66)
        source.src = "source/Front-end/css/assets/volume-level-2.svg";
    else
        source.src = "source/Front-end/css/assets/volume-level-3.svg";
});

/* ============================================================================
 * First Created: Mar 2  -- Yichen Han
 * Last  Revised: Mar 2  -- Yichen Han
 * Revised Times: 1
 * 
 * Description  : Fetch workSec, sBrkSec, lBrkSec, and countsTres (which are
 *                time of working, short/long break, and long break interval)
 *                if local storage have them.
 * Discrip in CN: 如果本地储存包含 workSec, sBrkSec, lBrkSec, 和 countsTres（即
 *                工作时长，长短休息时常，和长休息间隔），获取它们。
 * Type         : Global Variables.
 =========================================================================== */
var storage = window.localStorage;
if (storage["workSec"]) {
    workSec = storage["workSec"];
    document.getElementById("work-time-number").value = (workSec / 60);
}
if (storage["sBrkSec"]) {
    sBrkSec = storage["sBrkSec"];
    document.getElementById("short-break-number").value = (sBrkSec / 60);
}
if (storage["lBrkSec"]) {
    lBrkSec = storage["lBrkSec"];
    document.getElementById("long-break-number").value = (lBrkSec / 60);
}
if (storage["lBrkItv"]) {
    countsThres = storage["lBrkItv"];
    document.getElementById("long-break-interval").value = countsThres;
}
if (storage["sound-selection"]){
    document.getElementById("sound-effect").src = storage["sound-selection"];
    if(storage["sound-selection"] == "source/Front-end/css/assets/bellChime.mp3"){
        document.getElementById("sound-selection").value = "Bell";
    }
    else if(storage["sound-selection"] == "source/Front-end/css/assets/BigBenBellChime.mp3"){
        document.getElementById("sound-selection").value = "BigBen";
    }
    else{
        document.getElementById("sound-selection").value = "Temple";
    }
}
else{
    document.getElementById("sound-effect").src = "source/Front-end/css/assets/bellChime.mp3";
    document.getElementById("sound-selection").value = "Bell";
}
saveTimeSettings();

/* ============================================================================
 * First Created: Mar 8  -- Yichen Han
 * Last  Revised: Mar 8  -- Yichen Han
 * Revised Times: 1
 * 
 * Description  : Fetch language from local storage
 * Discrip in CN: 从本地储存读取语言（用户就不用每次打开都要切换语言了）。
 * Type         : Global Variables.
 =========================================================================== */
 if (storage["language"]) {
    language = window.localStorage.getItem("language");
    if (language == "CN") {
        document.getElementById("language-form").value = "Chinese";
        SwitchToChinese();
    }
    if (language == "EN") {
        document.getElementById("language-form").checked = "English";
        SwitchToEnglish();
    }
}

/* ============================================================================
 * Name         : turnLight()
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Set header + main + footer to white and opaque settings.
 * Description in CN：将页眉+主+页脚设置为白色及模糊。
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
function turnLight(){
    document.getElementById("header").style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById("main").style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById("footer").style.backgroundColor = "rgba(256,256,256,0.4)";
    color = "rgba(256,256,256,0.4)";
}

/* ============================================================================
 * Name         : turnDark()
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Set header + main + footer to grey and opaque settings.
 * Description in CN：将页眉+主+页脚设置为灰色及模糊。
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
function turnDark(){
    document.getElementById("header").style.backgroundColor = "rgba(102,102,102,0.4)";
    document.getElementById("main").style.backgroundColor = "rgba(102,102,102,0.4)";
    document.getElementById("footer").style.backgroundColor = "rgba(102,102,102,0.4)";
    color = "rgba(102,102,102,0.4)";
}

/* ============================================================================
 * Name         : setActive(index)
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Set active index to 1 and all else to 0
 * Description in CN：将有效指标设置为1，其他所有设置为0
 * Parameter    : index, indice to turn to 1
 * Return       : N/A
 =========================================================================== */
function setActive(index){
    let string = ""
    for (let int = 0; int < 5; int++){
        if (int == index)
            string += "1";
        else
            string += "0";
    }
    localStorage.setItem('active', string);
}


//#7 Timer functions/helper functions
/* ============================================================================
 * Name         : runCounter()
 * First Created: Feb 14 -- Yichen Han
 * Last  Revised: Feb 15 -- Yichen Han
 * Revised Times: 2
 * 
 * Description  : Listen to button, if clicked, call runCounter().
 *                runCounter() increase counts if now is working mode. 
 *                Then deligate countDown()
 * Discrip in CN: 监听按钮，如果单击，则调用runCounter（）。
 *                runCounter（）如果现在处于工作模式，则增加计数。
 *                然后使用countDown（）
 * Type         : Manager Function.
 * Parameter    : N/A. But need to listen radios.
 * Return       : N/A.
 =========================================================================== */
var startBtn = document.getElementById("start-btn"); // button
startBtn.addEventListener("click", runCounter); // listen & call runCounter

function runCounter() {
    // If now's working mode, increase counts by 1.
    updateTable();
    if (currMode == "w") {
        counts++;
        drainColor();
        //document.getElementById("sound-effect").play();
    }
    countDown();
}

/* ============================================================================
 * Name         : changeMode()
 * First Created: Feb 15 -- Yichen Han
 * Last  Revised: Feb 15 -- Yichen Han
 * Revised Times: 1
 * 
 * Description  : Listen mode radios. If another radio is checked, call
 *                changeMode() to change time(HTML), seconds(int), mode(Str).
 *                changeMode() can also be called by autoSwitchMode().
 * Discrip in CN: 监听模式的单选框。如果另一个单选框被选择，请调用
 *                changeMode（）来改变time（HTML），seconds（int），mode（Str）。
 *                changeMode（）也可以由autoSwitchMode（）调用。
 * Type         : Major Function.
 * Parameter    : N/A. But need to listen radios.
 * Return       : N/A.
 =========================================================================== */
// Listen fieldset, if radio is reckected, call changeMode()
var modeSelect = document.getElementById("mode-selection"); // fieldset
modeSelect.addEventListener("input", changeMode); // listener
var radioMode = document.getElementsByName("radio-mode"); // radios

function changeMode() {
    // Find which radio is checked. Then reset time, seconds, and mode.
    // Working mode.
    if (radioMode[0].checked) {
        document.getElementById("time").innerHTML = secToTime(workSec); // time
        totalSec = workSec; // seconds
        currMode = "w"; // mode
    }
    // Short break mode.
    else if (radioMode[1].checked) {
        document.getElementById("time").innerHTML = secToTime(sBrkSec); // time
        totalSec = sBrkSec; // seconds
        currMode = "s"; // mode'
    }
    // Long break mode.
    else {
        document.getElementById("time").innerHTML = secToTime(lBrkSec); // time
        totalSec = lBrkSec; // seconds
        currMode = "l"; // mode
    }
    updateTable();
    fillColor();
}



/* ============================================================================
 * Name         : countDown()
 * First Created: Feb 14 -- Yichen Han
 * Last  Revised: Feb 15 -- Yichen Han
 * Revised Times: 2
 * 
 * Description  : Called when countdown timer starts. Decrease 1 sec per sec.
 *                Call secToTime(int) to change sec into time.
 *                Reset time HTML (-1 per sec).
 *                When finished, deligate autoSwitchMode() to switch mode.
 * Discrip in CN: 倒数计时器启动时调用。每秒降低1秒。
 *                调用secToTime（int）将sec更改为时间。
 *                重置时间HTML（每秒-1）。
 *                完成后，将autoSwitchMode（）设置为切换模式。
 * Type         : Major Function.
 * Parameter    : N/A. But need var totalSec.
 * Return       : N/A. But change HTML.
 =========================================================================== */
function countDown() {
    startBtn.disabled = true; // disable start button
    let currSec = totalSec; // will count down from totalSec
    let timer = setInterval(function() {
        if (currSec == 0) { // time ends
            startBtn.disabled = false; // enable start button
            document.getElementById("sound-effect").play(); //Play alarm
            clearInterval(timer);
            autoSwitchMode(); // curr sections ends, enter next mode
        } else {
            currSec--; // decrease remaining sec by 1
            let currTime = secToTime(currSec);
            //console.log(currTime); // TEST CODE
            document.getElementById("time").innerHTML = currTime; // reset HTML
        }
    }, ms); // decrease 1 per sec. DECREASE IT FOR FASTER TESTING!!!
}



/* ============================================================================
 * Name         : autoSwitchMode()
 * First Created: Feb 15 -- Yichen Han
 * Last  Revised: Mar 2  -- Yichen Han, add statistics
 * Revised Times: 2
 * 
 * Description  : If   current mode is working & counts < countsThres, 
 *                Then enter short break mode.
 *                If   current mode is working & count >= countsThres,
 *                Then enter long break mode   & clear count.
 *                If   current mode is short break / long break,
 *                Then enter working mode.
 *                Finally deligate changeMode() to change totalSec & HTML.
 * Discrip in CN: 如果当前模式有效且计数小于countsThres，
 *                进入短暂休息模式。
 *                如果当前模式正在运行且计数大于等于countsThres，
 *                进入长时间休息模式并清除计数。
 *                如果当前模式是短暂或者长时间休息，
 *                进入工作模式。
 *                最后使用changeMode（）更改totalSec和HTML。
 * Type         : Major Function.
 * Parameter    : N/A. But need var currMode.
 * Return       : N/A.
 =========================================================================== */
function autoSwitchMode() {
    // Now: working mode
    if (currMode == "w") {
        totalWorkMins += (workSec / 60); // Statistics
        totalWorkCount ++;               // Statistics
        // count < countsThres. Next: short break mode
        if (counts < countsThres) {
            document.getElementById("radio-shortBreak-mode").checked = true;
            incrementCoin(5); //5 coin reward
        }
        // count >= countsThres. Next: long break mode
        else {
            counts = 0;
            document.getElementById("radio-longBreak-mode").checked = true;
            incrementCoin(15); //15 coin reward
        }
    }
    // Now: short/long break mode. Next: working mode
    else {
        // Statistics
        if (currMode == "s") {
            totalBreakMins += sBrkSec / 60;
            totalSBrkCount ++;
        }
        else {
            totalBreakMins += lBrkSec / 60;
            totalLBrkCount ++;
        }
        document.getElementById("radio-working-mode").checked = true;
    }
    changeMode(); // deligate changeMode() to change totalSec & HTML
}

/* ============================================================================
 * Name         : secToTime(int)
 * First Created: Feb 14 -- Yichen Han
 * Last  Revised: Feb 14 -- Yichen Han
 * Revised Times: 1
 * 
 * Description  : Take in seconds, change it to time. Eg: 120 -> "02:00"
 * Discrip in CN: 秒为单位，将其更改为时间。例如：120更改为“ 02:00”
 * Type         : Helper Function.
 * Parameter    : int   : how many seconds. Eg: 120
 * Return       : String: time.             Eg: "02:00"
 =========================================================================== */
function secToTime(currSec) {
    let minInt = parseInt(currSec / 60); // minite in int
    let minStr = "" + minInt; // minite in str
    // If minInt < 10, add 0 before minStr. Eg: 1 -> 01
    if (minInt < 10) {
        minStr = "0" + minStr;
    }
    let secInt = currSec % 60; // second in int
    let secStr = "" + secInt; // second in str
    // If secInt < 10, add 0 before secStr. Eg: 1 -> 01
    if (secInt < 10) {
        secStr = "0" + secStr;
    }
    return (minStr + ":" + secStr); // concate "min:sec"
}

/* ============================================================================
 * Name         : timeToSec(String)
 * First Created: Feb 14 -- Yichen Han
 * Last  Revised: Feb 14 -- Yichen Han
 * Revised Times: 1
 * 
 * Description  : Take in time, change it to seconds. Eg: "02:00" -> 120
 * Discrip in CN: 输入时间，将其更改为秒。例如：“ 02:00”变为 120
 * Type         : Helper Function.
 * Parameter    : String: time.             Eg: "02:00"
 * Return       : int   : how many seconds. Eg: 120
 =========================================================================== */
function timeToSec(currTime) {
    let minStr = currTime.substr(0, 2);
    let minInt = parseInt(minStr);

    let secStr = currTime.substr(3, 5);
    let secInt = parseInt(secStr);

    return (minInt * 60 + secInt);
}

/* ============================================================================
 * Name         : drainColor()
 * First Created: Feb 15 -- Suk Chan Lee
 * Last  Revised: Feb 15 -- Suk Chan Lee
 * Revised Times: 0
 * 
 * Description  : Take the color out of the page
 * Discrip in CN: 将页面颜色抹除
 * Type         : Helper Function.
 =========================================================================== */
function drainColor() {
    document.getElementById("header").style.backgroundColor = "grey";
    document.getElementById("header").style.color = "black";
    document.getElementById("header").style.textShadow = "0px 0px black";
    document.getElementById("footer").style.backgroundColor = "grey";
    document.getElementById("gear").src = "./source/Front-end/css/assets/gearblack.png";
}



/* ============================================================================
* Name         : fillColor()
* First Created: Feb 15 -- Suk Chan Lee
* Last  Revised: Feb 15 -- Suk Chan Lee
* Revised Times: 0
* 
* Description  : Put the color back in the page.
* Discrip in CN: 将颜色填入页面中。
* Type         : Helper Function.
=========================================================================== */
function fillColor() {
    document.getElementById("header").style.backgroundColor = color;
    document.getElementById("header").style.color = "white";
    document.getElementById("header").style.textShadow = "2px 2px black";
    document.getElementById("footer").style.backgroundColor = color;
    document.getElementById("gear").src = "./source/Front-end/css/assets/Geartransparent.png";
}

/* ============================================================================
 * Name         : updateTable()
 * First Created: Feb 15 -- Suk Chan Lee
 * Last  Revised: Feb 26 -- Yichen Han, update counter logic again
 * Revised Times: 3
 * 
 * Description  : Set the table below the clock when timer tuns
 * Discrip in CN: 计时器开始时，将表格设置在时钟下方
 * Type         : Helper Function.
 =========================================================================== */
function updateTable() {
    document.getElementById("counter").style.opacity = 0.4;
    if (currMode == "w") {
        document.getElementById("workPhase").style.opacity = 1;
        document.getElementById("longBreak").style.opacity = 0.4;
        document.getElementById("shortBreak").style.opacity = 0.4;
    } else if (counts < 4 && currMode == "s") {
        document.getElementById("workPhase").style.opacity = 0.4;
        document.getElementById("longBreak").style.opacity = 0.4;
        document.getElementById("shortBreak").style.opacity = 1;
    } else if (counts == 0 && currMode == "l") {
        document.getElementById("workPhase").style.opacity = 0.4;
        document.getElementById("longBreak").style.opacity = 1;
        document.getElementById("shortBreak").style.opacity = 0.4;
    }
    document.getElementById("counter").innerHTML 
    = ((countsThres - counts) > 1 ? (countsThres - counts) : 1) + "x";
}

/* ============================================================================
 * Name         : saveTimeSettings()
 * First Created: Feb 23 -- Jiaming Li
 * Last  Revised: Mar 2  -- Yichen Han add local storage & updates input check: edge case = 0
 * Revised Times: 4
 * 
 * Description  : Update vars and HTMLs according to Settings
 * Discrip in CN: 根据设置更新var和HTML
 * Type         : Major Function.
 =========================================================================== */
/* --------------------------------------------------------------------------
 * Check the range of input values
 --------------------------------------------------------------------------- */
var regex=/^[0-9]+$/; // RegEx
// Alerts
var alertTime = "Please enter an integer between 1 and 120.";
var alertIntv = "Please enter an integer between 1 and 10."

// Work phase (min)
document.getElementById("work-time-number").addEventListener("input", function() {
    let worknumber = document.getElementById("work-time-number").value;
    if ((worknumber != "" && !worknumber.match(regex)) // RegEx: "" or int
    ||  !(worknumber >= 0 && worknumber <= 120)) {     // Range: 0~120
        alert(alertTime);
        document.getElementById("work-time-number").value = workSec / 60;
    }
});

// Short break (min)
document.getElementById("short-break-number").addEventListener("input", function() {
    let shortBreaknumber = document.getElementById("short-break-number").value;
    if ((shortBreaknumber != "" && !shortBreaknumber.match(regex)) // RegEx: "" or int
    ||  !(shortBreaknumber >= 0 && shortBreaknumber <= 120)) {     // Range: 0~120
        alert(alertTime);
        document.getElementById("short-break-number").value = sBrkSec / 60;
    }
});

// Long break (min)
document.getElementById("long-break-number").addEventListener("input", function() {
    let longBreaknumber = document.getElementById("long-break-number").value;
    if ((longBreaknumber != "" && !longBreaknumber.match(regex)) // RegEx: "" or int
    ||  !(longBreaknumber >= 0 && longBreaknumber <= 120)) {     // Range: 0~120
        alert(alertTime);
        document.getElementById("long-break-number").value = lBrkSec / 60;
    }
});

// Long break interval
document.getElementById("long-break-interval").addEventListener("input", function() {
    let longBreakinterval = document.getElementById("long-break-interval").value;
    if ((longBreakinterval != "" && !longBreakinterval.match(regex)) // RegEx: "" or int
    ||  !(longBreakinterval >= 0 && longBreakinterval <= 10)) {      // Range: 0~10
        alert(alertIntv);
        document.getElementById("long-break-interval").value = countsThres;
    }
});


/* --------------------------------------------------------------------------
 * Read & update Settings
 --------------------------------------------------------------------------- */
function saveTimeSettings() {
    //Work & Break time
    // get values
    let worknumber = document.getElementById("work-time-number").value;
    let shortBreaknumber = document.getElementById("short-break-number").value;
    let longBreaknumber = document.getElementById("long-break-number").value;

    // edge cases = 0
    if (worknumber == 0) {
        worknumber = 1;
        document.getElementById("work-time-number").value = 1;
    }
    if (shortBreaknumber == 0) {
        shortBreaknumber = 1;
        document.getElementById("short-break-number").value = 1;
    }
    if (longBreaknumber == 0) {
        longBreaknumber = 1;
        document.getElementById("long-break-number").value = 1;
    }

    // update HTMLs
    document.getElementById("workTime").innerHTML = worknumber + "m";
    document.getElementById("shortBreakTime").innerHTML = shortBreaknumber + "m";
    document.getElementById("longBreakTime").innerHTML = longBreaknumber + "m";

    // update modes' seconds
    workSec = worknumber * 60;
    sBrkSec = shortBreaknumber * 60;
    lBrkSec = longBreaknumber * 60;
  
    //document.getElementById("time").innerHTML = secToTime(workSec); Merge Keep or not

    // update totalSec
    if (currMode == "w") {
        totalSec = parseInt(worknumber * 60);
    } else if (currMode == "s") {
        totalSec = shortBreaknumber * 60;
    } else {
        totalSec = longBreaknumber * 60;
    }

    // update timer's HTML
    document.getElementById("time").innerHTML = secToTime(totalSec);


    //Long break interval
    countsThres = document.getElementById("long-break-interval").value;
    // edge case 0 -> 1
    if (countsThres == 0) {
        countsThres = 1;
        document.getElementById("long-break-interval").value = 1;
    }
    document.getElementById("counter").innerHTML 
    = ((countsThres - counts) > 1 ? (countsThres - counts) : 1) + "x";

    //Local Storage
    storage["workSec"] = workSec;
    storage["sBrkSec"] = sBrkSec;
    storage["lBrkSec"] = lBrkSec;
    storage["lBrkItv"] = countsThres;
}



/* ============================================================================
 * Name         : SwitchToLanguage
 * First Created: Feb 27 -- Jiaming Li
 * Last  Revised: Mar 5  -- Yichen Han -- Add new translations
 * Revised Times: 3
 * 
 * Description  : Switch the language of content based on the option selected
 * Discrip in CN: 根据选择的选项切换内容的语言
 * Type         : Helper Function.
 =========================================================================== */
function SwitchToChinese() {
    language = "CN";
    storage["language"] = "CN";
    // Login- 1st page
    document.getElementById("heytitle").innerHTML = "嗨！";
    document.getElementById("lookstitle").innerHTML = "您还未登陆";
    document.getElementById("guestCont").innerHTML = "访客使用";
    document.getElementById("loginCont").innerHTML = "登陆";
    document.getElementById("notifCreate").innerHTML = "创建账号";
    document.getElementById("createTitle").innerHTML = "创建账号";
    // Login - login
    document.getElementById("logintitle").innerHTML = "登陆";
    document.getElementById("usertext").innerHTML = "用户名";
    document.getElementById("passtext").innerHTML = "密码";
    document.getElementById("proceedLogin").innerHTML = "登陆";
    document.getElementById("createAccInstead").innerHTML = "去注册";
    // Login - create account
    document.getElementById("emailtext").innerHTML = "邮箱";
    document.getElementById("createPassText").innerHTML = "密码";
    document.getElementById("nameText").innerHTML = "用户名";
    document.getElementById("switchToLogin").innerHTML = "去登陆";
    document.getElementById("createAcc").innerHTML = "注册";
    // Team
    document.getElementById("teamsLabel").innerHTML = "小队";
    document.getElementById("invite").innerHTML = "邀请";
    document.getElementById("createTeamButton").innerHTML = "组建";
    document.getElementById("teamsAccountLogin").innerHTML = "登陆";
    document.getElementById("disableText").innerHTML = "解散";
    // Create team
    document.getElementById("createTeamTag").innerHTML = "组建小队";
    document.getElementById("backToTeams").innerHTML = "返回";
    document.getElementById("teamName").innerHTML = "用户名";
    document.getElementById("workTeam").innerHTML = "工作时间";
    document.getElementById("shortTeam").innerHTML = "短休息时间";
    document.getElementById("longTeam").innerHTML = "长休息时间";
    document.getElementById("finalizeCreate").innerHTML = "创建队伍";
    // document.getElementById("teamsLabel").innerHTML = "组队";
    //document.getElementById("welcome").innerHTML = "欢迎使用";
    document.getElementById("workText").innerHTML = "工作";
    document.getElementById("ShortBreakText").innerHTML = "短休息";
    document.getElementById("LongBreakText").innerHTML = "长休息";
    document.getElementById("start-btn").innerHTML = "开始计时";
    document.getElementById("settingsTitle").innerHTML = "设置";
    document.getElementById("WorkTimeTitle").innerHTML = "工作时长（分钟）：";
    document.getElementById("ShortBreakTitle").innerHTML = "短休息时长（分钟）：";
    document.getElementById("LongBreakTitle").innerHTML = "长休息时长（分钟）：";
    document.getElementById("languageTitle").innerHTML = "语言：";
    document.getElementById("LongBreakInterval").innerHTML = "每轮工作次数：";
    document.getElementById("sound-select").innerHTML = "铃声：";
    document.getElementById("default-1").innerHTML = "闹钟";
    document.getElementById("default-2").innerHTML = "大本钟";
    document.getElementById("default-3").innerHTML = "教堂（低频）";
    document.getElementById("colorblindtitle").innerHTML = "色盲模式：";
    // document.getElementById("statistics").innerHTML = "统计";
    document.getElementById("saveSettings").innerHTML = "保存";
    document.getElementById("statisticsTitle").innerHTML = "统计数据";
    document.getElementById("statsCong").innerHTML = "继续加油吧！";
    document.getElementById("OKbtn-statistics").innerHTML = "好";
    alertTime = "请输入1到120的整数。"
    alertIntv = "请输入1到10的整数"
    // Doge Shop
    document.getElementById("dogeTitle").innerHTML = "Doge 商店";
    document.getElementById("themeTitle").innerHTML = "主题";
    document.getElementById("preview").innerHTML = "点击预览";
    document.getElementById("select").innerHTML = "购买/选择";
    document.getElementById("wildjungletitle").innerHTML = "原始森林";
    document.getElementById("junglecost").innerHTML = "免费";
    document.getElementById("nightmodetitle").innerHTML = "夜间模式";
    document.getElementById("nightcost").innerHTML = "免费";
    document.getElementById("aquatictitle").innerHTML = "深海";
    document.getElementById("aquaticcost").innerHTML = "50金币";
    document.getElementById("sanfranciscotitle").innerHTML = "旧金山";
    document.getElementById("sanfranciscocost").innerHTML = "100金币";
    document.getElementById("dogelandtitle").innerHTML = "Doge天地";
    document.getElementById("dogecost").innerHTML = "倾家荡产";
    document.getElementById("dogebuy").innerHTML = "购买";
    document.getElementById("dogeSave").innerHTML = "关闭";
    document.getElementById("insufficientText").innerHTML = "金币不足";
}

function SwitchToEnglish() {
    language = "EN";
    storage["language"] = "EN";
    //document.getElementById("welcome").innerHTML = "Welcome Guest!";
    document.getElementById("workText").innerHTML = "Work Phase";
    document.getElementById("ShortBreakText").innerHTML = "Short Break";
    document.getElementById("LongBreakText").innerHTML = "Long Break";
    document.getElementById("start-btn").innerHTML = "START";
    document.getElementById("settingsTitle").innerHTML = "Settings";
    document.getElementById("WorkTimeTitle").innerHTML = "Work Phase (min):";
    document.getElementById("ShortBreakTitle").innerHTML = "Short Break (min):";
    document.getElementById("LongBreakTitle").innerHTML = "Long Break (min):";
    document.getElementById("languageTitle").innerHTML = "Language:";
    document.getElementById("LongBreakInterval").innerHTML = "Work Phases in 1 Round:";
    document.getElementById("sound-select").innerHTML = "Ring: ";
    document.getElementById("default-1").innerHTML = "Bell";
    document.getElementById("default-2").innerHTML = "Big Ben";
    document.getElementById("default-3").innerHTML = "Temple (Low Freq)";
    document.getElementById("colorblindtitle").innerHTML = "Color Blind Mode:";
    // Team
    document.getElementById("teamsLabel").innerHTML = "Teams";
    document.getElementById("invite").innerHTML = "Invite";
    document.getElementById("createTeamButton").innerHTML = "Create";
    document.getElementById("teamsAccountLogin").innerHTML = "Login";
    document.getElementById("disableText").innerHTML = "Disable Teams";
    // Create team
    document.getElementById("createTeamTag").innerHTML = "Create Team";
    document.getElementById("backToTeams").innerHTML = "Back";
    document.getElementById("teamName").innerHTML = "Name";
    document.getElementById("workTeam").innerHTML = "Work Time";
    document.getElementById("shortTeam").innerHTML = "Short Break";
    document.getElementById("longTeam").innerHTML = "Long Break";
    document.getElementById("finalizeCreate").innerHTML = "Create";
    // document.getElementById("statistics").innerHTML = "Stats";
    document.getElementById("saveSettings").innerHTML = "Save";
    document.getElementById("statisticsTitle").innerHTML = "Statistics";
    document.getElementById("statsCong").innerHTML = "Congrats! Keep on moving!";
    document.getElementById("OKbtn-statistics").innerHTML = "OK";
    alertTime = "Please enter an integer between 1 and 120.";
    alertIntv = "Please enter an integer between 1 and 10.";
    // Doge Shop
    document.getElementById("dogeTitle").innerHTML = "Doge Shop";
    document.getElementById("themeTitle").innerHTML = "Themes";
    document.getElementById("preview").innerHTML = "Click to Preview";
    document.getElementById("select").innerHTML = "Buy/Select";
    document.getElementById("wildjungletitle").innerHTML = "Wild Jungle";
    document.getElementById("junglecost").innerHTML = "Free";
    document.getElementById("nightmodetitle").innerHTML = "Night Mode";
    document.getElementById("nightcost").innerHTML = "Free";
    document.getElementById("aquatictitle").innerHTML = "Aquatic";
    document.getElementById("aquaticcost").innerHTML = "50 Coins";
    document.getElementById("sanfranciscotitle").innerHTML = "San Francisco";
    document.getElementById("sanfranciscocost").innerHTML = "100 Coins";
    document.getElementById("dogelandtitle").innerHTML = "Doge Land";
    document.getElementById("dogecost").innerHTML = "Everything";
    document.getElementById("dogebuy").innerHTML = "Buy";
    document.getElementById("dogeSave").innerHTML = "Close";
    document.getElementById("insufficientText").innerHTML = "Insufficient Funds";
}


/* ============================================================================
 * Name         : chooseSoundEffect
 * First Created: March 2  -- Bo Yang
 * Last  Revised: March 2  -- Bo Yang
 * Revised Times: 1
 * 
 * Description  : Choose which sound effect to use according to user's input
 * Description in CN： 根据用户输入选择要使用的音效
 * Type         : Helper Function.
 =========================================================================== */
function chooseSoundEffect(){
    if(document.getElementById("sound-selection").value == "Bell"){
        document.getElementById("sound-effect").src = "source/Front-end/css/assets/bellChime.mp3";
        window.localStorage.setItem("sound-selection","source/Front-end/css/assets/bellChime.mp3");
    }
    else if(document.getElementById("sound-selection").value == "BigBen"){
        document.getElementById("sound-effect").src = "source/Front-end/css/assets/BigBenBellChime.mp3";
        window.localStorage.setItem("sound-selection","source/Front-end/css/assets/BigBenBellChime.mp3");
    }
    else{
        document.getElementById("sound-effect").src = "source/Front-end/css/assets/TempleBell.mp3";
        window.localStorage.setItem("sound-selection","source/Front-end/css/assets/TempleBell.mp3");
    }
    
}


function showStats() {
    let english = document.getElementById("language-form").value == "English";

    let statsWork = document.getElementById("statsWork");
    if (english) {
        statsWork.innerHTML = "You have worked " + totalWorkMins + " mins.";
    }
    else {
        statsWork.innerHTML = "您已工作" + totalWorkMins + "分钟";
    }

    let statsBreak = document.getElementById("statsBreak");
    if (english) {
        statsBreak.innerHTML = "And rested " + totalBreakMins + " mins.";
    }
    else {
        statsBreak.innerHTML = "您已休息" + totalBreakMins + "分钟";
    }
}
