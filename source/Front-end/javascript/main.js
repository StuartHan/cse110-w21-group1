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

 /******************************************************************************
 * 文件名：main.js
 * 首次创建：2月14日
 * 最近修订时间：2月15日-Suk Chan Lee
 * 最新版本：1.1
 *
 * 描述：（改变版本）-> 启动计时器-> 倒数-> 自动改变版本-> 改变版本
 *       在当前版本中：[注意！ HTML的时间必须与worSec对应]
 * 变量：
 * 功能：
 *
 * 下一个功能：
 *****************************************************************************/
var workSec = 1; // total seconds in work mode, 1500 for Pomodoro 工作模式下的总秒数，番茄工作法时间为1500秒
var sBrkSec = 1; // total seconds in short break mode, 300 for Pomodoro 短暂休息模式下的总秒数，番茄工作法时间为300秒
var lBrkSec = 900; // total seconds in long break mode, 900 for Pomodoro 长时间休息模式下的总秒数，番茄工作法时间为900秒

var currMode = "w"; // current mode. Default is working mode 当前模式。默认为工作模式
var counts = 0; // # of working periods. counts = 4 -> long break 工作周期数。计数为4则换为长时间休息

var totalSec = workSec; // default starting mode is working mode 默认启动模式为工作模式
document.getElementById("time").innerHTML = secToTime(workSec); //On load 加载

document.getElementById("gear").addEventListener("click", function() { //On click, show settings 点击后显示设置
    document.getElementById("settingsMenu").style.visibility = "visible";
});

document.getElementById("exitSettings").addEventListener("click", function() { //On click, hide settings 点击后隐藏设置
    document.getElementById("settingsMenu").style.visibility = "hidden";
    saveTimeSettings();
});

document.getElementById("volume-slider").addEventListener("click", function() { //Alter volume 改变音量
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

 /* ============================================================================ 
 * 名称：runCounter（）
 * 首次创建：2月14日-韩逸尘
 * 最近修订时间：2月15日-韩逸尘
 * 修改次数：2
 *
 * 说明：监听按钮，如果单击，则调用runCounter（）。
 *      runCounter（）如果现在处于工作模式，则增加计数。
 *      然后使用countDown（）
 * 类型：管理器功能。
 * 参数：N / A。但是需要听取radios。
 * 返回值：不适用。
 =========================================================================== */
var startBtn = document.getElementById("start-btn"); // button 按钮
startBtn.addEventListener("click", runCounter); // listen & call runCounter 听取以及调用runCounter

function runCounter() {
    // If now's working mode, increase counts by 1. 如果是现在的工作模式，则将计数增加1。
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

 /* ============================================================================
 * 名称：changeMode（）
 * 首次创建：2月15日-韩逸尘
 * 最近修订时间：2月15日-韩逸尘
 * 修改次数：1
 *
 * 说明：收听模式收音机。如果检查了另一个电台，请调用
 *      changeMode（）来改变time（HTML），seconds（int），mode（Str）。
 *      changeMode（）也可以由autoSwitchMode（）调用。
 * 类型：主要功能。
 * 参数：N / A。但是需要听广播。
 * 返回值：不适用。
 =========================================================================== */
// Listen fieldset, if radio is reckected, call changeMode()
var modeSelect = document.getElementById("mode-selection"); // fieldset 场集
modeSelect.addEventListener("input", changeMode); // listener 事件侦听器
var radioMode = document.getElementsByName("radio-mode"); // radios 收音机

function changeMode() {
    // Find which radio is checked. Then reset time, seconds, and mode. 查找选中的收音机。然后重设时间，秒数和模式。
    // Working mode. 工作模式
    if (radioMode[0].checked) {
        document.getElementById("time").innerHTML = secToTime(workSec); // time 时间
        totalSec = workSec; // seconds 秒
        currMode = "w"; // mode 模式
    }
    // Short break mode. 短暂休息模式
    else if (radioMode[1].checked) {
        document.getElementById("time").innerHTML = secToTime(sBrkSec); // time 时间
        totalSec = sBrkSec; // seconds 秒
        currMode = "s"; // mode 模式
    }
    // Long break mode. 长时间休息模式
    else {
        document.getElementById("time").innerHTML = secToTime(lBrkSec); // time 时间
        totalSec = lBrkSec; // seconds 秒
        currMode = "l"; // mode 模式
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
 
/* ============================================================================
 * 名称：countDown（）
 * 首次创建：2月14日-韩逸尘
 * 最近修订时间：2月15日-韩逸尘
 * 修改次数：2
 *
 * 说明：倒数计时器启动时调用。每秒降低1秒。
 *      调用secToTime（int）将sec更改为时间。
 *      重置时间HTML（每秒-1）。
 *      完成后，将autoSwitchMode（）设置为切换模式。
 * 类型：主要功能。
 * 参数：不适用。但是需要变量totalSec。
 * 返回值：不适用。但是更改HTML。
 =========================================================================== */
function countDown() {
    startBtn.disabled = true; // disable start button 禁用开始按钮
    let currSec = totalSec; // will count down from totalSec 从totalSec倒数
    let timer = setInterval(function() {
        if (currSec == 0) { // time ends 时间到
            startBtn.disabled = false; // enable start button 启用开始按钮
            document.getElementById("sound-effect").play(); //Play alarm 播放闹铃
            clearInterval(timer);
            autoSwitchMode(); // curr sections ends, enter next mode 当前部分结束，进入下一个模式
        } else {
            currSec--; // decrease remaining sec by 1 将剩余秒数减少1
            let currTime = secToTime(currSec);
            console.log(currTime); // TEST CODE 测试代码
            document.getElementById("time").innerHTML = currTime; // reset HTML 重置HTML
        }
    }, 1000); // decrease 1 per sec 每秒减少1
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

 /* ============================================================================
 * 名称：autoSwitchMode（）
 * 首次创建：2月15日-韩逸尘
 * 最近修订时间：2月15日-韩逸尘
 * 修改次数：1
 *
 * 说明：如果当前模式正在工作且计数不等于 4，
 *      那么进入短暂休息模式。
 *      如果当前模式正在工作且计数等于 4，
 *      那么进入长时间休息模式并清除计数。
 *      如果当前模式是短暂或长时间休息，
 *      那么进入工作模式。
 *      最后使用changeMode（）更改totalSec和HTML。
 * 类型：主要功能。
 * 参数：不适用。但是需要变量currMode。
 * 返回值：不适用。
 =========================================================================== */
function autoSwitchMode() {
    // Now: working mode 现在：工作模式
    if (currMode == "w") {
        // count != 4. Next: short break mode 计数不等于4.下一个：短暂休息模式
        if (counts != 4) {
            document.getElementById("radio-shortBreak-mode").checked = true;
        }
        // count == 4. Next: long break mode 计数等于4.下一个：长时间休息模式
        else {
            counts = 0;
            document.getElementById("radio-longBreak-mode").checked = true;
        }
    }
    // Now: short/long break mode. Next: working mode 现在：短暂/长时间休息模式。下一步：工作模式
    else {
        document.getElementById("radio-working-mode").checked = true;
    }
    changeMode(); // deligate changeMode() to change totalSec & HTML 委托changeMode（）更改totalSec和HTML
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

 /* ============================================================================
 * 名称：secToTime（int）
 * 首次创建：2月14日-韩逸尘
 * 最近修订时间：2月14日-韩逸尘
 * 修改次数：1
 *
 * 说明：以秒为单位，将其更改为时间。例如：120更改为“ 02:00”
 * 类型：助手功能。
 * 参数：整数：多少秒。例如：120
 * 返回值：字符串：时间。例如：“ 02:00”
 =========================================================================== */
function secToTime(currSec) {
    let minInt = parseInt(currSec / 60); // minite in int 分钟以整数形式
    let minStr = "" + minInt; // minite in str 分钟以字符串形式
    // If minInt < 10, add 0 before minStr. Eg: 1 -> 01 如果minInt小于10，则在minStr之前添加0。例如：1-> 01
    if (minInt < 10) {
        minStr = "0" + minStr;
    }
    let secInt = currSec % 60; // second in int 秒数以整数形式
    let secStr = "" + secInt; // second in str 秒数以字符串形式
    // If secInt < 10, add 0 before secStr. Eg: 1 -> 01 如果secInt小于10，则在secStr之前加0。例如：1-> 01
    if (secInt < 10) {
        secStr = "0" + secStr;
    }
    return (minStr + ":" + secStr); // concate "min:sec" 加上“ min：sec”
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
 /* ============================================================================
 * 名称：timeToSec（String）
 * 首次创建：2月14日-韩逸尘
 * 最近修订时间：2月14日-韩逸尘
 * 修改次数：1
 *
 * 说明：输入时间，将其更改为秒。例如：“ 02:00”变为 120
 * 类型：助手功能。
 * 参数：字符串：时间。例如：“ 02:00”
 * 返回值：整数：多少秒。例如：120
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

 /* ============================================================================
 * 名称：rainColor（）
 * 首次创建：2月15日-Suk Chan Lee
 * 最近修订时间：2月15日-Suk Chan Lee
 * 修改次数：0
 *
 * 说明：将颜色带出页面
 * 类型：助手功能。
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

/* ============================================================================
* 名称：fillColor（）
* 首次创建：2月15日-Suk Chan Lee
* 最近修订时间：2月15日-Suk Chan Lee
* 修改次数：0
*
* 说明：将颜色放回页面中。
* 类型：助手功能。
=========================================================================== */
function fillColor() {
    document.getElementById("header").style.backgroundColor = "lightgreen";
    document.getElementById("header").style.color = "white";
    document.getElementById("header").style.textShadow = "2px 2px black";
    document.getElementById("footer").style.backgroundColor = "lightgreen";
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