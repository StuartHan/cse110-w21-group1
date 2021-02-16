/******************************************************************************
 * File Name    : main.js
 * First Created: Feb 14
 * Last  Revised: Feb 15 -- Yichen Han
 * Curr  Version: 1.0
 * 
 * Description  : (changeMode) -> runCounter -> countDown -> autoSwitchMode -> changeMode
 *                In current version: [NOTE!!! TIME HTML MUST CORRESPOND TO worSec]
 * Variables    : 
 * Functions    : 
 * 
 * Next Feature : 
 *****************************************************************************/

var workSec = 3; // total seconds in work mode 
var sBrkSec = 1; // total seconds in short break mode
var lBrkSec = 2; // total seconds in long break mode

var currMode = "w"; // current mode. Default is working mode
var counts = 0; // # of working periods. counts = 4 -> long break

var totalSec = workSec; // default starting mode is working mode



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
    if(currMode == "w") {
        counts++;
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
var radioMode  = document.getElementsByName("radio-mode"); // radios

function changeMode() {
    // Find which radio is checked. Then reset time, seconds, and mode.
    // Working mode.
    if(radioMode[0].checked) {
        document.getElementById("time").innerHTML = secToTime(workSec); // time
        totalSec = workSec; // seconds
        currMode = "w"; // mode
    }
    // Short break mode.
    else if(radioMode[1].checked) {
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
    let timer = setInterval (function() {
        if (currSec == 0) { // time ends
            startBtn.disabled = false; // enable start button
            clearInterval(timer);
            autoSwitchMode(); // curr sections ends, enter next mode
        }
        else {
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
    if(currMode == "w") {
        // count != 4. Next: short break mode
        if (counts != 4) {
            document.getElementById("radio-shortBreak-mode").checked = true;
        }
        // count == 4. Next: long break mode
        else {
            count = 0;
            document.getElementById("radio-longBreak-mode").checked = true;
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
    let minStr = "" + minInt;            // minite in str
    // If minInt < 10, add 0 before minStr. Eg: 1 -> 01
    if (minInt < 10) {
        minStr = "0" + minStr;
    }
    let secInt = currSec % 60; // second in int
    let secStr = "" + secInt;  // second in str
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
    let minStr = currTime.substr(0,2);
    let minInt = parseInt(minStr);

    let secStr = currTime.substr(3,5);
    let secInt = parseInt(secStr);

    return (minInt * 60 + secInt);
}