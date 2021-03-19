var workSec = 1500; 
var sBrkSec = 300; 
var lBrkSec = 900; 
var ms = 1000; 

var firebaseConfig = {
    apiKey: "AIzaSyC3aqVaAxSSt5FlCOBkoL5JVmiFoib9aTE",
    authDomain: "userdata-e83e7.firebaseapp.com",
    projectId: "userdata-e83e7",
    storageBucket: "userdata-e83e7.appspot.com",
    messagingSenderId: "161185941557",
    appId: "1:161185941557:web:89bd010354b630be6b897c",
    databaseURL: "https://userdata-e83e7-default-rtdb.firebaseio.com",
    measurementId: "G-QE552WPF9J",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();


function setms(thisms) { ms = thisms; }

var currMode = "w"; 
var counts = 0;
var countsThres = 4; 
var color = "rgba(3,165,89,0.6)";
var language = "EN";
var loggedIn = false;
var teams = []; 
var adminTracker = []; 
var teamListeners = []; 
var teamNames = []; 
var teamsDisabled = false;

var totalSec = workSec; 

document.getElementById("time").innerHTML = secToTime(workSec);

 var totalWorkMins  = 0;
 var totalBreakMins = 0;
 var totalWorkCount = 0;
 var totalSBrkCount = 0;
 var totalLBrkCount = 0;
 var currSec;

 window.addEventListener('DOMContentLoaded', () => {
    loadUserSettings();
    if (localStorage.getItem('coin') == null || localStorage.getItem('shopitems') == null || localStorage.getItem('visited') == null){ //Initialize Doge Coins
        window.localStorage.setItem('coin', "0");
        window.localStorage.setItem('shopitems', "000"); //Bit based indexing
        window.localStorage.setItem('active', "10000");
        window.localStorage.setItem('colorblind', "0");
        window.localStorage.setItem('teams', "");
        document.getElementById("cointext").innerHTML = "0";
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
    loadActive();
    darkenChosen();
});

 function loadUserSettings(){
    if (localStorage.getItem("username") != null) {
        loggedIn = true;
        firebase.auth().signInWithEmailAndPassword(localStorage.getItem("username"),localStorage.getItem("password"))
        .then((userCredential) => {
            let user = userCredential.user;
            document.getElementById("welcome").innerHTML = "Welcome "+user.displayName+"!";
            document.getElementById("loginNotification").style.visibility = "hidden";
            document.getElementById("greywrapper").style.visibility = "hidden";
            document.getElementById("teamsAccountLogin").innerHTML = "Logout";
            getUserData(localStorage.getItem("username"));
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            document.getElementById("teamsAccountLogin").innerHTML = "Login";
            if(language=="CN") {document.getElementById("teamsAccountLogin").innerHTML = "登陆";}
        });
    }
    else{
        document.getElementById("teamsAccountLogin").innerHTML = "Login";
        if(language=="CN") {document.getElementById("teamsAccountLogin").innerHTML = "登陆";}
    }
}

document.getElementById("proceedLogin").addEventListener("click", function() { //Login Press
    document.getElementById("invalidLogin").style.visibility = "hidden";
    document.getElementById("loadingNotif").style.visibility = "visible";
    firebase.auth().signInWithEmailAndPassword(document.getElementById("user").value, document.getElementById("pass").value)
    .then((userCredential) => {
        loggedIn = true;
        var user = userCredential.user;
        localStorage.setItem("username", document.getElementById("user").value);
        localStorage.setItem("password",document.getElementById("pass").value);
        localStorage.setItem("name",user.displayName);
        document.getElementById("welcome").innerHTML = "Welcome "+user.displayName+"!";
        document.getElementById("loginMain").style.visibility = "hidden";
        document.getElementById("greywrapper").style.visibility = "hidden";
        document.getElementById("loadingNotif").style.visibility = "hidden";
        document.getElementById("teamsAccountLogin").innerHTML = "Logout";
        getUserData(localStorage.getItem("username"));
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("invalidLogin").style.visibility = "visible";
        document.getElementById("loadingNotif").style.visibility = "hidden";
    });
});

 function createUserData(email,name,coins,shopitems,active,colorblind){
    firebase.database().ref('users/'+email.substring(0,email.indexOf("."))).set({
        username: name,
        coin: coins,
        shopitems: shopitems,
        active: active,
        colorblind: colorblind,
        teams: ""
    });
}

function getUserData(userEmail){
    firebase.database().ref().child("users").child(userEmail.substring(0,userEmail.indexOf("."))).get().then(function(snapshot) {
        if (snapshot.exists()) {
          localStorage.setItem("coin",snapshot.val().coin);
          localStorage.setItem("name",snapshot.val().username);
          localStorage.setItem("shopitems",snapshot.val().shopitems);
          localStorage.setItem("active",snapshot.val().active);
          localStorage.setItem("colorblind",snapshot.val().colorblind);
          localStorage.setItem("teams",localStorage.getItem("teams"));
        }
        else {
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
    });
}

function updateUser(){
    if (localStorage.getItem("username") != null){
    firebase.database().ref('users/' + localStorage.getItem("username").substring(0,localStorage.getItem("username").indexOf("."))).set({
        username: localStorage.getItem("name"),
        coin: localStorage.getItem("coin"),
        shopitems: localStorage.getItem("shopitems"),
        active: localStorage.getItem("active"),
        colorblind: localStorage.getItem("colorblind"),
        teams: localStorage.getItem("teams")
    });
    }
}

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
                localStorage.getItem('coin'),
                localStorage.getItem('shopitems'),
                localStorage.getItem('active'),
                localStorage.getItem('colorblind'),
            );
            localStorage.setItem("username", document.getElementById("emailCreate").value);
            localStorage.setItem("password",document.getElementById("passCreate").value);
            document.getElementById("welcome").innerHTML = "Welcome "+document.getElementById("nameCreate").value+"!";
            document.getElementById("greywrapper").style.visibility = "hidden";
            document.getElementById("accountCreation").style.visibility = "hidden";
            loggedIn = true;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
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

function updateCoin(user,amount){
    let string = '/users/' + user +'/coin';
    firebase.database().ref().update({string : amount})
}

document.getElementById("quitCreate").addEventListener("click", function() {
    document.getElementById("greywrapper").style.visibility = "hidden";
    document.getElementById("accountCreation").style.visibility = "hidden";
    document.getElementById("createError").style.visibility = "hidden";
});

document.getElementById("notifCreate").addEventListener("click", function() { 
    document.getElementById("loginNotification").style.visibility = "hidden";
    document.getElementById("accountCreation").style.visibility = "visible";
});

document.getElementById("createAccInstead").addEventListener("click", function() { 
    document.getElementById("loginMain").style.visibility = "hidden";
    document.getElementById("accountCreation").style.visibility = "visible";
    document.getElementById("invalidLogin").style.visibility = "hidden";
});

document.getElementById("switchToLogin").addEventListener("click", function() { 
    document.getElementById("loginMain").style.visibility = "visible";
    document.getElementById("accountCreation").style.visibility = "hidden";
    document.getElementById("createError").style.visibility = "hidden";
});

document.getElementById("teamsAccountLogin").addEventListener("click", function() { 
    if (loggedIn){
        document.getElementById("welcome").innerHTML = "Welcome Guest!";
        document.getElementById("teamsAccountLogin").innerHTML = "Login";
        localStorage.setItem("coin","0")
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }
    else{
        document.getElementById("loginMain").style.visibility = "visible";
        document.getElementById("teams").style.visibility = "hidden";
    }
});

function createTeam(name,worktime,shorttime,longtime,user){
    firebase.database().ref('teams/'+name).set({
        worktime: worktime,
        shorttime: shorttime,
        longtime: longtime,
        admins: user, 
        users: user,
        on: "false"
    });
}

document.getElementById("finalizeCreate").addEventListener("click",function() {
    createTeam(
        document.getElementById("nameTeam").value,
        document.getElementById("workTimeTeam").value,
        document.getElementById("shortTimeTeam").value,
        document.getElementById("longTimeTeam").value,
        localStorage.getItem("username")
    );
    if (localStorage.getItem("teams") != null){
        localStorage.setItem("teams",localStorage.getItem("teams")+","+document.getElementById("nameTeam").value);
    }
    else{
        localStorage.setItem("teams",document.getElementById("nameTeam").value);
    }
    updateUser();
    loadTeams();
    document.getElementById("teams").style.visibility = "visible";
    document.getElementById("createTeam").style.visibility = "hidden";
});

function loadTeams(){
    if(loggedIn && !teamsDisabled){
        let userEmail = localStorage.getItem("username");
        while (document.getElementById("teamsEntry").childNodes.length != 0) //Clear table
            document.getElementById("teamsEntry").removeChild(document.getElementById("teamsEntry").childNodes[0]);
        firebase.database().ref().child("users").child(userEmail.substring(0,userEmail.indexOf("."))).get().then(function(snapshot) {
            if (snapshot.exists() && snapshot.val().teams != null) {
                let list = snapshot.val().teams.split(",");
                for (let i = 0; i < list.length;i++){
                    if (list[i] != "null" && list[i] != ""){
                        firebase.database().ref().child("teams").child(list[i]).get().then(function(snapshot2) {
                            if (snapshot2.exists()) {
                                teams.push(snapshot2.val().users.split(",")); //All the users in a team
                                adminTracker.push(snapshot2.val().admins.includes(localStorage.getItem("username")));
                                let tempElement = document.createElement('p');
                                tempElement.className = "TeamRow";
                                tempElement.value = i.toString();
                                tempElement.innerHTML = list[i];
                                tempElement.addEventListener("click", function() {
                                    showTeam(i, list[i]);
                                });
                                document.getElementById("teamsEntry").insertAdjacentElement("beforeend",tempElement)
                                let listenerTemp = firebase.database().ref("teams/"+list[i]);
                                listenerTemp.on('value', (snapshot3) => {
                                    const data = snapshot3.val();
                                    if (currSec == 0 && snapshot3.val().on == "true"){
                                        document.getElementById("work-time-number").value = parseInt(snapshot3.val().worktime);
                                        document.getElementById("short-break-number").value = parseInt(snapshot3.val().shorttime);
                                        document.getElementById("long-break-number").value = parseInt(snapshot3.val().longtime);
                                        document.getElementById("start-btn").click();
                                    }
                                });
                            }
                            else {
                                console.log("No data available");
                            }
                        }).catch(function(error) {
                            console.error(error);
                        });
                    }
                }
            }
            else {
                console.log("No data available");
            }
            }).catch(function(error) {
            console.error(error);
        });
    }
}

function showTeam(index, teamname){
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("teamPage").style.visibility = "visible";
    document.getElementById("teamPageName").innerHTML = teamname;
    while (document.getElementById("teamUsers").childNodes.length != 0) //Clear table
            document.getElementById("teamUsers").removeChild(document.getElementById("teamUsers").childNodes[0]);
    for (let i = 0; i < teams[index].length; i++){
        let tempElement = document.createElement('p');
        tempElement.className = "TeamUser";
        tempElement.value = i.toString();
        tempElement.innerHTML = teams[index][i];
        document.getElementById("teamUsers").insertAdjacentElement("beforeend",tempElement);
    }
    if (adminTracker[index]){
        document.getElementById("adminStart").style.visibility = "visible";
    }
    else {
        document.getElementById("adminStart").style.visibility = "hidden";
    }
}

document.getElementById("disableTeams").addEventListener("click",function() {
    teamsDisabled = document.getElementById("disableTeams").checked;
    if (teamsDisabled){
        while (document.getElementById("teamsEntry").childNodes.length != 0) //Clear table
            document.getElementById("teamsEntry").childNodes.removeItem(0);
        document.getElementById("invite").disabled = true;
        document.getElementById("createTeamButton").disabled = true;
    }
    else {
        document.getElementById("invite").disabled = false;
        document.getElementById("createTeamButton").disabled = false;
    }
});

document.getElementById("profilepic").addEventListener("click", function() { 
        document.getElementById("teams").style.visibility = "visible";
        loadTeams();
});


document.getElementById("teamsExit").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("inviteSuccess").style.visibility = "hidden";
});

 document.getElementById("quitInviteTeam").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("inviteTeam").style.visibility = "hidden";
});

 document.getElementById("backToTeamsMain").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "visible";
    document.getElementById("inviteTeam").style.visibility = "hidden";
});

document.getElementById("quitCreateTeam").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("createTeam").style.visibility = "hidden";
});

document.getElementById("createTeamButton").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("createTeam").style.visibility = "visible";
    document.getElementById("inviteSuccess").style.visibility = "hidden";
});

 document.getElementById("quitInviteTeam").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("inviteTeam").style.visibility = "hidden";
    document.getElementById("notExist").style.visibility = "hidden";
    document.getElementById("notInTeam").style.visibility = "hidden";
});

 document.getElementById("backToTeamsMain").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "visible";
    document.getElementById("inviteTeam").style.visibility = "hidden";
    document.getElementById("notExist").style.visibility = "hidden";
    document.getElementById("notInTeam").style.visibility = "hidden";
});

 document.getElementById("backToTeamsMain2").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "visible";
    document.getElementById("teamPage").style.visibility = "hidden";
    document.getElementById("adminStart").style.visibility = "hidden";
    stopTeamTimer();
});

 document.getElementById("quitTeamMain").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("teamPage").style.visibility = "hidden";
    document.getElementById("adminStart").style.visibility = "hidden";
    stopTeamTimer();
});

 document.getElementById("invite").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "hidden";
    document.getElementById("inviteTeam").style.visibility = "visible";
    document.getElementById("inviteSuccess").style.visibility = "hidden";
});

document.getElementById("backToTeams").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "visible";
    document.getElementById("createTeam").style.visibility = "hidden";
});

 document.getElementById("finalizeInvite").addEventListener("click", function() { 
    document.getElementById("teams").style.visibility = "visible";
    document.getElementById("createTeam").style.visibility = "hidden";
    document.getElementById("notInTeam").style.visibility = "hidden";
    document.getElementById("notExist").style.visibility = "hidden";
    if (!localStorage.getItem("teams").includes(document.getElementById("inviteTeamName").value)){
        document.getElementById("notInTeam").style.visibility = "visible";
        return;
    }
    let input = document.getElementById("emailInvite").value;
    firebase.database().ref().child("users").child(input.substring(0,input.indexOf("."))).get().then(function(snapshot) {
        if (snapshot.exists()) {
            firebase.database().ref('users/' + input.substring(0,input.indexOf("."))).set({
                username: snapshot.val().username,
                coin: snapshot.val().coin,
                shopitems: snapshot.val().shopitems,
                active: snapshot.val().active,
                colorblind: snapshot.val().colorblind,
                teams: snapshot.val().teams + "," + input
            });
            loadTeams();
        }
        else {
            document.getElementById("notExist").style.visibility = "visible";
        }
      }).catch(function(error) {
        console.error(error);
    });
});

document.getElementById("adminStart").addEventListener("click", function(){
    firebase.database().ref().child("teams").child(document.getElementById("teamPageName").innerHTML).get().then(function(snapshot) {
        if (snapshot.exists()) {
            firebase.database().ref('teams/' + document.getElementById("teamPageName").innerHTML).set({
                worktime: snapshot.val().worktime,
                shorttime: snapshot.val().shorttime,
                longtime: snapshot.val().longtime,
                admins: snapshot.val().admins, //Person who created team is admin
                users: snapshot.val().users,
                on: "true"
            });
            loadTeams();
            document.getElementById("start-btn").click();
        }
        else {
            console.log("error");
        }
      }).catch(function(error) {
        console.error(error);
    });

});

function stopTeamTimer(){
    firebase.database().ref().child("teams").child(document.getElementById("teamPageName").innerHTML).get().then(function(snapshot) {
        if (snapshot.exists()) {
            firebase.database().ref('teams/' + document.getElementById("teamPageName").innerHTML).set({
                worktime: snapshot.val().worktime,
                shorttime: snapshot.val().shorttime,
                longtime: snapshot.val().longtime,
                admins: snapshot.val().admins, //Person who created team is admin
                users: snapshot.val().users,
                on: "false"
            });
            loadTeams();
        }
        else {
            console.log("error");
        }
      }).catch(function(error) {
        console.error(error);
    });
}

document.getElementById("gear").addEventListener("click", function() { //On click, show settings
    document.getElementById("settingsMenu").style.visibility = "visible";
    document.getElementById("main").style.visibility = "hidden";
    document.getElementById("statisticsMenu").style.visibility = "hidden";
    document.getElementById("dogeCoinMenu").style.visibility = "hidden";
    chooseSoundEffect();
});

document.getElementById("stats").addEventListener("click", function() { //On click, show statistics
    document.getElementById("statisticsMenu").style.visibility = "visible";
    document.getElementById("main").style.visibility = "hidden";
    document.getElementById("settingsMenu").style.visibility = "hidden";
    document.getElementById("dogeCoinMenu").style.visibility = "hidden";
    showStats();
});

document.getElementById("OKbtn-statistics").addEventListener("click", function() { //On click, hide statistics page
    document.getElementById("statisticsMenu").style.visibility = "hidden";
    // document.getElementById("gear").click();
    document.getElementById("main").style.visibility = "visible";
});

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

document.getElementById("colorblindbox").addEventListener("click",function(){
    if (document.getElementById("colorblindbox").checked)
        localStorage.setItem("colorblind","1");
    else
    localStorage.setItem("colorblind","0");
});

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
    updateUser();
});

document.getElementById("dogecoin").addEventListener("click", function() { //On click, show Doge Store
    document.getElementById("dogeCoinMenu").style.visibility = "visible";
    document.getElementById("statisticsMenu").style.visibility = "hidden";
    document.getElementById("settingsMenu").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "hidden";
    saveTimeSettings();
});

document.getElementById("dogeSave").addEventListener("click", function() {
    document.getElementById("insufficientText").style.visibility = "hidden";
    document.getElementById("dogeCoinMenu").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "visible";
    loadActive();
    darkenChosen();
    updateUser();
});

document.getElementById("wildjungle").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbwildjungle.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/wildjungle.jpg")';
    turnLight();
});

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

document.getElementById("night").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbnight.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/night.jpg")';
    turnLight();
});

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

document.getElementById("aquatic").addEventListener("click", function() {
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbaquatic.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/aquatic.jpg")';
    turnLight();
});

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

document.getElementById("sanfrancisco").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbsanfrancisco.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/sanfrancisco.jpg")';
    turnLight();
});

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

document.getElementById("dogeland").addEventListener("click", function() { 
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (document.getElementById("colorblindbox").checked)
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/cbgod.jpg")';
    else
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/god.jpg")';
    turnLight();
});

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

function cypressSetCoin(amount){
    localStorage.setItem("coin",amount);
    document.getElementById("cointext").innerHTML = amount;
}

document.getElementById("guestCont").addEventListener("click", function() {
    document.getElementById("loginNotification").style.visibility = "hidden";
    document.getElementById("greywrapper").style.visibility = "hidden";
});

document.getElementById("loginCont").addEventListener("click", function() { 
    document.getElementById("loginNotification").style.visibility = "hidden";
    document.getElementById("loginMain").style.visibility = "visible";
});

document.getElementById("quitLogin").addEventListener("click", function() { 
    document.getElementById("loginMain").style.visibility = "hidden";
    document.getElementById("greywrapper").style.visibility = "hidden";
    document.getElementById("invalidLogin").style.visibility = "hidden";
});

function incrementCoin(amount){
    let newNum = (parseInt(localStorage.getItem("coin"))+amount).toString();
    localStorage.setItem("coin",newNum);
    if (loggedIn)
        updateUser();
    document.getElementById("cointext").innerHTML = newNum;
}

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

function turnLight(){
    document.getElementById("header").style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById("main").style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById("footer").style.backgroundColor = "rgba(256,256,256,0.4)";
    color = "rgba(256,256,256,0.4)";
}

function turnDark(){
    document.getElementById("header").style.backgroundColor = "rgba(102,102,102,0.4)";
    document.getElementById("main").style.backgroundColor = "rgba(102,102,102,0.4)";
    document.getElementById("footer").style.backgroundColor = "rgba(102,102,102,0.4)";
    color = "rgba(102,102,102,0.4)";
}

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

var startBtn = document.getElementById("start-btn"); 
startBtn.addEventListener("click", runCounter); 

function runCounter() {
    updateTable();
    if (currMode == "w") {
        counts++;
        drainColor();
    }
    countDown();
}

var modeSelect = document.getElementById("mode-selection");
modeSelect.addEventListener("input", changeMode);
var radioMode = document.getElementsByName("radio-mode");

function changeMode() {
    if (radioMode[0].checked) {
        document.getElementById("time").innerHTML = secToTime(workSec);
        totalSec = workSec; 
        currMode = "w"; 
    }
    else if (radioMode[1].checked) {
        document.getElementById("time").innerHTML = secToTime(sBrkSec); 
        totalSec = sBrkSec; 
        currMode = "s"; 
    }
    else {
        document.getElementById("time").innerHTML = secToTime(lBrkSec); 
        totalSec = lBrkSec; 
        currMode = "l"; 
    }
    updateTable();
    fillColor();
}



function countDown() {
    startBtn.disabled = true;
    currSec = totalSec; 
    let timer = setInterval(function() {
        if (currSec == 0) {
            startBtn.disabled = false;
            document.getElementById("sound-effect").play();
            clearInterval(timer);
            autoSwitchMode();
        } else {
            currSec--;
            let currTime = secToTime(currSec);
            document.getElementById("time").innerHTML = currTime; 
        }
    }, ms);
}

function autoSwitchMode() {
    // Now: working mode
    if (currMode == "w") {
        totalWorkMins += (workSec / 60);
        totalWorkCount ++;
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


function secToTime(currSec) {
    let minInt = parseInt(currSec / 60);
    let minStr = "" + minInt;
    if (minInt < 10) {
        minStr = "0" + minStr;
    }
    let secInt = currSec % 60;
    let secStr = "" + secInt; 
    if (secInt < 10) {
        secStr = "0" + secStr;
    }
    return (minStr + ":" + secStr); 
}

function timeToSec(currTime) {
    let minStr = currTime.substr(0, 2);
    let minInt = parseInt(minStr);

    let secStr = currTime.substr(3, 5);
    let secInt = parseInt(secStr);

    return (minInt * 60 + secInt);
}

function drainColor() {
    document.getElementById("header").style.backgroundColor = "grey";
    document.getElementById("header").style.color = "black";
    document.getElementById("header").style.textShadow = "0px 0px black";
    document.getElementById("footer").style.backgroundColor = "grey";
    document.getElementById("gear").src = "./source/Front-end/css/assets/gearblack.png";
}

function fillColor() {
    document.getElementById("header").style.backgroundColor = color;
    document.getElementById("header").style.color = "white";
    document.getElementById("header").style.textShadow = "2px 2px black";
    document.getElementById("footer").style.backgroundColor = color;
    document.getElementById("gear").src = "./source/Front-end/css/assets/Geartransparent.png";
}

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

var regex=/^[0-9]+$/; // RegEx
// Alerts
var alertTime = "Please enter an integer between 1 and 120.";
var alertIntv = "Please enter an integer between 1 and 10."

document.getElementById("work-time-number").addEventListener("input", function() {
    let worknumber = document.getElementById("work-time-number").value;
    if ((worknumber != "" && !worknumber.match(regex)) // RegEx: "" or int
    ||  !(worknumber >= 0 && worknumber <= 120)) {     // Range: 0~120
        alert(alertTime);
        document.getElementById("work-time-number").value = workSec / 60;
    }
});

document.getElementById("short-break-number").addEventListener("input", function() {
    let shortBreaknumber = document.getElementById("short-break-number").value;
    if ((shortBreaknumber != "" && !shortBreaknumber.match(regex)) // RegEx: "" or int
    ||  !(shortBreaknumber >= 0 && shortBreaknumber <= 120)) {     // Range: 0~120
        alert(alertTime);
        document.getElementById("short-break-number").value = sBrkSec / 60;
    }
});

document.getElementById("long-break-number").addEventListener("input", function() {
    let longBreaknumber = document.getElementById("long-break-number").value;
    if ((longBreaknumber != "" && !longBreaknumber.match(regex)) // RegEx: "" or int
    ||  !(longBreaknumber >= 0 && longBreaknumber <= 120)) {     // Range: 0~120
        alert(alertTime);
        document.getElementById("long-break-number").value = lBrkSec / 60;
    }
});

document.getElementById("long-break-interval").addEventListener("input", function() {
    let longBreakinterval = document.getElementById("long-break-interval").value;
    if ((longBreakinterval != "" && !longBreakinterval.match(regex)) // RegEx: "" or int
    ||  !(longBreakinterval >= 0 && longBreakinterval <= 10)) {      // Range: 0~10
        alert(alertIntv);
        document.getElementById("long-break-interval").value = countsThres;
    }
});

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
