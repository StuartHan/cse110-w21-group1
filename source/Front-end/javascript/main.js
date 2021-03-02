/******************************************************************************
 * File Name    : main.js
 * First Created: Feb 14
 * Last  Revised: Feb 26 -- Yichen Han
 * Curr  Version: 1.2
 * 
 * Description  : (changeMode) -> runCounter -> countDown -> autoSwitchMode -> changeMode
 *                A concern on logic: does var "totalSec" decrease lines or make logic more complex? --Stuart
 * Variables    : 
 * Functions    : 
 * 
 * Next Feature : 
 *****************************************************************************/

var workSec = 1500; // total seconds in work mode, 1500 for Pomodoro 
var sBrkSec = 300; // total seconds in short break mode, 300 for Pomodoro 
var lBrkSec = 900; // total seconds in long break mode, 900 for Pomodoro 

var currMode = "w"; // current mode. Default is working mode
var counts = 0; // # of working periods. counts >= countsThres -> long break
var countsThres = 4; // = Long break interval

var totalSec = workSec; // default starting mode is working mode
document.getElementById("time").innerHTML = secToTime(workSec); //On load

document.getElementById("gear").addEventListener("click", function() { //On click, show settings
    document.getElementById("settingsMenu").style.visibility = "visible";
});

document.getElementById("exitSettings").addEventListener("click", function() { //On click, hide settings
    document.getElementById("settingsMenu").style.visibility = "hidden";
    saveTimeSettings();
});

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


// Statistics vars
var totalWorkMins  = 0;
var totalBreakMins = 0;
var totalWorkCount = 0;
var totalSBrkCount = 0;
var totalLBrkCount = 0;




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
    }, 10); // decrease 1 per sec. DECREASE IT FOR FASTER TESTING!!!
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
 * Type         : Major Function.
 * Parameter    : N/A. But need var currMode.
 * Return       : N/A.
 =========================================================================== */
function autoSwitchMode() {
    // Now: working mode
    if (currMode == "w") {
        totalWorkMins += (workSec / 60); // Statistics
        totalWorkCount ++;               // Statistics
        alert (totalWorkMins + " " + totalWorkCount);
        // count < countsThres. Next: short break mode
        if (counts < countsThres) {
            document.getElementById("radio-shortBreak-mode").checked = true;
        }
        // count >= countsThres. Next: long break mode
        else {
            counts = 0;
            document.getElementById("radio-longBreak-mode").checked = true;
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
        alert (totalBreakMins + " " + totalSBrkCount + " " + totalLBrkCount);
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
    document.getElementById("header").style.backgroundColor = "lightgreen";
    document.getElementById("header").style.color = "white";
    document.getElementById("header").style.textShadow = "2px 2px black";
    document.getElementById("footer").style.backgroundColor = "lightgreen";
    document.getElementById("gear").src = "./source/Front-end/css/assets/Geartransparent.png";
}


/* ============================================================================
 * Name         : updateTable()
 * First Created: Feb 15 -- Suk Chan Lee
 * Last  Revised: Feb 26 -- Yichen Han, update counter logic again
 * Revised Times: 3
 * 
 * Description  : Set the table below the clock when timer tuns
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
 * Last  Revised: Feb 26 -- Yichen Han
 * Revised Times: 3
 * 
 * Description  : Update vars and HTMLs according to Settings
 * Type         : Major Function.
 =========================================================================== */
/* --------------------------------------------------------------------------
 * Check the range of input values
 --------------------------------------------------------------------------- */
// Work phase (min)
document.getElementById("work-time-number").addEventListener("input", function() {
    let worknumber = document.getElementById("work-time-number").value;
    if(!(worknumber >= 0 && worknumber <= 120)) {
        alert("Please enter a value between 0 and 120");
        document.getElementById("work-time-number").value = workSec / 60;
    }
});
// Short break (min)
document.getElementById("short-break-number").addEventListener("input", function() {
    let shortBreaknumber = document.getElementById("short-break-number").value;
    if(!(shortBreaknumber >= 0 && shortBreaknumber <= 120)) {
        alert("Please enter a value between 0 and 120");
        document.getElementById("short-break-number").value = sBrkSec / 60;
    }
});
// Long break (min)
document.getElementById("long-break-number").addEventListener("input", function() {
    let longBreaknumber = document.getElementById("long-break-number").value;
    if(!(longBreaknumber >= 0 && longBreaknumber <= 120)) {
        alert("Please enter a value between 0 and 120");
        document.getElementById("long-break-number").value = lBrkSec / 60;
    }
});
// Long break interval
document.getElementById("long-break-interval").addEventListener("input", function() {
    let longBreakinterval = document.getElementById("long-break-interval").value;
    if(!(longBreakinterval >= 0 && longBreakinterval <= 10)) {
        alert("Please enter a value between 1 and 10");
        document.getElementById("long-break-interval").value = countsThres;
    }
});

function saveTimeSettings() {
    /* ------------------------------------------------------------------------
     * Work & Braks time
     ----------------------------------------------------------------------- */
    // get values
    let worknumber       = document.getElementById("work-time-number"  ).value;
    let shortBreaknumber = document.getElementById("short-break-number").value;
    let longBreaknumber  = document.getElementById("long-break-number" ).value;

    // update HTMLs
    document.getElementById("workTime"      ).innerHTML = worknumber       + "m";
    document.getElementById("shortBreakTime").innerHTML = shortBreaknumber + "m";
    document.getElementById("longBreakTime" ).innerHTML = longBreaknumber  + "m";

    // update modes' seconds
    workSec = parseInt(worknumber * 60);
    sBrkSec = shortBreaknumber    * 60;
    lBrkSec = longBreaknumber     * 60;

    // update totalSec
    if(currMode == "w") {
        totalSec = parseInt(worknumber * 60);
    }
    else if(currMode == "s") {
        totalSec = shortBreaknumber * 60;
    }
    else {
        totalSec = longBreaknumber * 60;
    }
    
    // update timer's HTML
    document.getElementById("time").innerHTML = secToTime(totalSec);


    /* ------------------------------------------------------------------------
     * Long break interval
     ----------------------------------------------------------------------- */
    countsThres = document.getElementById("long-break-interval").value;
    document.getElementById("counter").innerHTML = countsThres + "x"
}