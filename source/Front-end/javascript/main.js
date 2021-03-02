/******************************************************************************
 * File Name    : main.js
 * First Created: Feb 14
 * Last  Revised: Feb 15 -- Suk Chan Lee
 * Curr  Version: 1.1
 * 
 * Description  : (changeMode) -> runCounter -> countDown -> autoSwitchMode -> changeMode
 *                In current version: [NOTE!!! TIME HTML MUST CORRESPOND TO worSec]
 * Variables    : 
 * Functions    : 
 * 
 * Next Feature : 
 *****************************************************************************/

var workSec = 1; // total seconds in work mode, 1500 for Pomodoro 
var sBrkSec = 1; // total seconds in short break mode, 300 for Pomodoro 
var lBrkSec = 1; // total seconds in long break mode, 900 for Pomodoro 

var currMode = "w"; // current mode. Default is working mode
var counts = 0; // # of working periods. counts = 4 -> long break
var color = "rgba(3,165,89,0.6)";

var totalSec = workSec; // default starting mode is working mode
document.getElementById("time").innerHTML = secToTime(workSec); //On load

document.getElementById("gear").addEventListener("click", function() { //On click, show settings
    document.getElementById("settingsMenu").style.visibility = "visible";
    document.getElementById("main").style.visibility = "hidden";
    document.getElementById("dogeCoinMenu").style.visibility = "hidden";
});

document.getElementById("saveSettings").addEventListener("click", function() { //On click, hide settings
    document.getElementById("settingsMenu").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "visible";
    saveTimeSettings();
});

document.getElementById("dogecoin").addEventListener("click", function() { //On click, show Doge Store
    document.getElementById("dogeCoinMenu").style.visibility = "visible";
    document.getElementById("settingsMenu").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "hidden";
    saveTimeSettings();
});

document.getElementById("dogeSave").addEventListener("click", function() { //On click, hide Doge Store
    document.getElementById("insufficientText").style.visibility = "hidden";
    document.getElementById("dogeCoinMenu").style.visibility = "hidden";
    document.getElementById("main").style.visibility = "visible";
    loadActive();
    darkenChosen();
});

document.getElementById("wildjungle").addEventListener("click", function() { //On click, preview the Jungle Theme
    document.getElementById("insufficientText").style.visibility = "hidden";
    document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/wildjungle.jpg")';
    turnLight();
});

document.getElementById("wildjunglebuy").addEventListener("click", function() { //On click, switch to Jungle Theme
    document.getElementById("insufficientText").style.visibility = "hidden";
    setActive(0);
    document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/wildjungle.jpg")';
    turnLight();
    darkenChosen();
});

document.getElementById("night").addEventListener("click", function() { //On click, preview night Theme
    document.getElementById("insufficientText").style.visibility = "hidden";
    document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/night.jpg")';
    turnLight();
});

document.getElementById("nightbuy").addEventListener("click", function() { //On click, switch to night Theme
    document.getElementById("insufficientText").style.visibility = "hidden";
    setActive(1);
    document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/night.jpg")';
    turnDark();
    darkenChosen();
});

document.getElementById("aquatic").addEventListener("click", function() {//On click, preview Aquatic Theme
    document.getElementById("insufficientText").style.visibility = "hidden";
    document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/aquatic.jpg")';
    turnLight();
});

document.getElementById("aquaticbuy").addEventListener("click", function() { //On click, switch to Aquatic Theme if enough coins
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (window.localStorage.getItem('shopitems')[0] == '1'){
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/aquatic.jpg")';
        turnLight();
        setActive(2);
    }
    else if (parseInt(window.localStorage.getItem('coin')) >= 50){
        document.getElementById("cointext").innerHTML = (parseInt(window.localStorage.getItem('coin')) - 50).toString();
        window.localStorage.setItem('coin',(parseInt(window.localStorage.getItem('coin')) - 50).toString());
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/aquatic.jpg")';
        setShopItems(0);
        turnLight();
        setActive(2);
    }
    else
        document.getElementById("insufficientText").style.visibility = "visible";
    darkenChosen();
});

document.getElementById("sanfrancisco").addEventListener("click", function() { //On click, preview San Francisco Theme
    document.getElementById("insufficientText").style.visibility = "hidden";
    document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/sanfrancisco.jpg")';
    turnLight();
});

document.getElementById("sanfranciscobuy").addEventListener("click", function() { //On click, switch to San Francisco Theme if enough coins
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (window.localStorage.getItem('shopitems')[1] == '1'){
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/sanfrancisco.jpg")';
        turnLight();
        setActive(3);
    }
    else if (parseInt(window.localStorage.getItem('coin')) >= 100){
        document.getElementById("cointext").innerHTML = (parseInt(window.localStorage.getItem('coin')) - 100).toString();
        window.localStorage.setItem('coin',(parseInt(window.localStorage.getItem('coin')) - 100).toString());
        setShopItems(1);
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/sanfrancisco.jpg")';
        turnLight();
        setActive(3);
    }
    else
        document.getElementById("insufficientText").style.visibility = "visible";
    darkenChosen();
});

document.getElementById("dogeland").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("insufficientText").style.visibility = "hidden";
    document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/god.jpg")';
    turnLight();
});

document.getElementById("dogebuy").addEventListener("click", function() { //On click, switch to Doge Theme if enough coins
    document.getElementById("insufficientText").style.visibility = "hidden";
    if (window.localStorage.getItem('shopitems')[2] == '1'){
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/god.jpg")';
        turnLight();
        setActive(4);
    }
    else{
        window.localStorage.setItem("coin","0");//Take away everything they own. Everything.
        document.getElementById("cointext").innerHTML = "0";
        setShopItems(2);
        document.getElementById("body").style.backgroundImage = 'url("source/Front-end/css/assets/god.jpg")';
        turnLight();
        setActive(4);
    }
    darkenChosen();
});

/* ============================================================================
 * Name         : incrementCoin(amount)
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Volume Slider controls. Change image and sound accordingly.
 * Parameter    : amount, the amount to increase coin inventory by.
 * Return       : N/A
 =========================================================================== */
function incrementCoin(amount){
    let newNum = (parseInt(localStorage.getItem("coin"))+amount).toString();
    localStorage.setItem("coin",newNum);
    document.getElementById("cointext").innerHTML = newNum;
}

/* ============================================================================
 * Name         : DOMContentLoaded
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : When the DOM Content is loaded, if it is a user's first time visiting
 *                the website, load in the coin, shopitems, and active localStorage items.
 *                Otherwise, load the most recently used background and coins.
 =========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('coin',"900");
    if (localStorage.getItem('coin') == null || localStorage.getItem('shopitems') == null){ //Initialize Doge Coins
        window.localStorage.setItem('coin', "0");
        window.localStorage.setItem('shopitems', "000"); //Bit based indexing
        window.localStorage.setItem('active', "10000");
        document.getElementById("cointext").innerHTML = "0";
    }
    else{
        document.getElementById("cointext").innerHTML = window.localStorage.getItem('coin');
    }
    let items = window.localStorage.getItem('shopitems');
    if (items[0] == 1)
        document.getElementById('aquaticcost').innerHTML = "Owned";
    if (items[1] == 1)
        document.getElementById('sanfranciscocost').innerHTML = "Owned";
    if (items[2] == 1)
        document.getElementById('dogecost').innerHTML = "Owned";
    loadActive();
    darkenChosen();
});

/* ============================================================================
 * Name         : loadActive()
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Load the last selected theme
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
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
function darkenChosen(){
    let active = window.localStorage.getItem('active');
    let shopitems = window.localStorage.getItem('shopitems');
    document.getElementById('wildjunglebuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('nightbuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('aquaticbuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('sanfranciscobuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('dogebuy').style.backgroundColor = "rgba(256,256,256,0.4)";
    document.getElementById('wildjunglebuy').innerHTML = "Owned";
    document.getElementById('nightbuy').innerHTML = "Owned";
    if (shopitems[0] == 1)
        document.getElementById('aquaticbuy').innerHTML = "Owned";
    else
        document.getElementById('aquaticbuy').innerHTML = "Buy";
    if (shopitems[1] == 1)
        document.getElementById('sanfranciscobuy').innerHTML = "Owned";
    else
        document.getElementById('sanfranciscobuy').innerHTML = "Buy";
    if (shopitems[2] == 1)
        document.getElementById('dogebuy').innerHTML = "Owned";
    else
        document.getElementById('dogebuy').innerHTML = "Buy";
    if (active[0] == 1){
        document.getElementById('wildjunglebuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        document.getElementById('wildjunglebuy').innerHTML = "Selected";
    }
    else if (active[1] == 1){
        document.getElementById('nightbuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        document.getElementById('nightbuy').innerHTML = "Selected";
    }
    else if (active[2] == 1){
        document.getElementById('aquaticbuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        document.getElementById('aquaticbuy').innerHTML = "Selected";
    }
    else if (active[3] == 1){
        document.getElementById('sanfranciscobuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        document.getElementById('sanfranciscobuy').innerHTML = "Selected";
    }
    else if (active[4] == 1){
        document.getElementById('dogebuy').style.backgroundColor = "rgba(256,256,256,0.1)";
        document.getElementById('dogebuy').innerHTML = "Selected";
    }
}

/* ============================================================================
 * Name         : setShopItems(index)
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Set the index to 1 in shopitems in localStorage
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
 * Parameter    : N/A
 * Return       : N/A
 =========================================================================== */
document.getElementById("volume-slider").addEventListener("click", function() { //Alter volume
    let volume = document.getElementById("volume-slider").value;
    document.getElementById("sound-effect").volume = volume / 100;
    if (volume == 0)
        document.getElementById("volume-pic").src = "source/Front-end/css/assets/volume-level-0.svg";
    else if (volume > 0 && volume < 33)
        document.getElementById("volume-pic").src = "source/Front-end/css/assets/volume-level-1.svg";
    else if (volume > 33 && volume < 66)
        document.getElementById("volume-pic").src = "source/Front-end/css/assets/volume-level-2.svg";
    else
        document.getElementById("volume-pic").src = "source/Front-end/css/assets/volume-level-3.svg";
});

/* ============================================================================
 * Name         : turnLight()
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Set header + main + footer to white and opaque settings.
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
    localStorage.setItem('active',string);
}

/* ============================================================================
 * Name         : runCounter()
 * First Created: Feb 14 -- Yichen Han
 * Last  Revised: Feb 15 -- Yichen Han
 * Revised Times: 2
 * 
 * Description  : Listen to button, if clicked, call runCounter().
 *                runCounter() increase counts if now is working mode. 
 *                Then deligate countDown()
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
        currMode = "s"; // mode
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
            console.log(currTime); // TEST CODE
            document.getElementById("time").innerHTML = currTime; // reset HTML
        }
    }, 1000); // decrease 1 per sec
}



/* ============================================================================
 * Name         : autoSwitchMode()
 * First Created: Feb 15 -- Yichen Han
 * Last  Revised: Feb 15 -- Yichen Han
 * Revised Times: 1
 * 
 * Description  : If   current mode is working & counts != 4, 
 *                Then enter short break mode.
 *                If   current mode is working & count == 4,
 *                Then enter long break mode   & clear count.
 *                If   current mode is short break / long break,
 *                Then enter working mode.
 *                Finally deligate changeMode() to change totalSec & HTML.
 * Type         : Major Function.
 * Parameter    : N/A. But need var currMode.
 * Return       : N/A.
 =========================================================================== */
function autoSwitchMode() {
    // Now: working mode
    if (currMode == "w") {
        // count != 4. Next: short break mode
        if (counts != 4) {
            document.getElementById("radio-shortBreak-mode").checked = true;
            incrementCoin(5); //5 coin reward
        }
        // count == 4. Next: long break mode
        else {
            counts = 0;
            document.getElementById("radio-longBreak-mode").checked = true;
            incrementCoin(15); //15 coin reward
        }
    }
    // Now: short/long break mode. Next: working mode
    else {
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
 * First Created: March 2 -- Suk Chan (Kevin) Lee
 * Last  Revised: March 2 -- Suk Chan (Kevin) Lee
 * Revised Times: 0
 * 
 * Description  : Update table according to current 
 * Parameter    : N/A
 * Return       : N/A
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
    document.getElementById("counter").innerHTML = (4 - counts).toString() + "x";
}


function saveTimeSettings() {
    let worknumber = document.getElementById("work-time-number").value;
    let longBreaknumber = document.getElementById("long-break-number").value;
    let shortBreaknumber = document.getElementById("short-break-number").value;
    document.getElementById("workTime").innerHTML = worknumber + "m";
    document.getElementById("shortBreakTime").innerHTML = shortBreaknumber + "m";
    document.getElementById("longBreakTime").innerHTML = longBreaknumber + "m";
    workSec = parseInt(worknumber * 60);
    sBrkSec = shortBreaknumber * 60;
    lBrkSec = longBreaknumber * 60;
    document.getElementById("time").innerHTML = secToTime(workSec);
}