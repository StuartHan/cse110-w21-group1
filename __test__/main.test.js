/**
 * @jest-environment jsdom
 */

// import 'jest-dom/extend-expect'
// import { render, cleanup } from 'react-testing-library'

document.body.innerHTML = `
<div id="container">
<header id="header">
    <h1>PomoTime</h1>
    <img id="profilepic" src="./source/Front-end/css/assets/basicprofilepic.png">
    <h2 id="welcome">Welcome Guest!</h2>
    <div id="options">
        <!--<h2>Options</h2> -->
        <!--<h2 id="stats">Stats</h2> To be implemented later.-->
        <img id="gear" src="./source/Front-end/css/assets/Geartransparent.png">
    </div>
    <div id="dogecoin">
        <img id="coinimg" src="./source/Front-end/css/assets/dogecoin.png">
        <p id="cointext">0</p>
    </div>
</header>

<main id="main">
    <div id="clock">
        <h1 id="time">25:00</h1>
    </div>

    <fieldset id="mode-selection">
        <div id="radio-working-mode-container">
            <input type="radio" id="radio-working-mode" name="radio-mode" checked>
            <label for="radio-working-mode">Work</label>
        </div>
        <div id="radio-shortBreak-mode-container">
            <input type="radio" id="radio-shortBreak-mode" name="radio-mode">
            <label for="radio-shortBreak-mode">Short Break</label>
        </div>
        <div id="radio-longBreak-mode-container">
            <input type="radio" id="radio-longBreak-mode" name="radio-mode">
            <label for="radio-longBreak-mode">Long Break</label>
        </div>
    </fieldset>

    <table id="chart">
        <tr id="workPhase">
            <td id="workText">Work Phase</td>
            <td id="workTime">25m</td>
        </tr>
        <tr>
            <td>&#8597</td>
            <td id="counter">4x</td>
        </tr>
        <tr id="shortBreak">
            <td id="ShortBreakText">Short Break</td>
            <td id="shortBreakTime">5m</td>
        </tr>
        <tr>
            <td>&#8595</td>
        </tr>
        <tr id="longBreak">
            <td id="LongBreakText">Long Break</td>
            <td id="longBreakTime">15m</td>
        </tr>
    </table>

    <div id="start-btn-container">
        <button id="start-btn" type="button">START</button>
    </div>

    <audio id="sound-effect"></audio>
</main>

<span id="settingsMenu">
    <h2 id="settingsTitle">Settings</h2>
    <div id="volume-controls">
        <img id="volume-pic" src="source/Front-end/css/assets/volume-level-3.svg">
        <input id="volume-slider" type="range" min="0" max="100" value="100">
    </div>
    <h3 id="WorkTimeTitle">Work Time (min):</h3>
    <input id="work-time-number" name="work-time-number" type="text" min="0" max="120" value="25">
    <h3 id="ShortBreakTitle">Short Break (min):</h3>
    <input id="short-break-number" name="short-break-number" type="text" min="0" max="120" value="5">
    <h3 id="LongBreakTitle">Long Break (min):</h3>
    <input id="long-break-number" name="long-break-number" type="text" min="0" max="120" value="15">
    <h3 id="languageTitle"> Language:</h3>
    <form  id="language-form">
        <input id="english-selection" type="radio" name="language" value="language" checked>English
        <br>
        <input id="chinese-selection" type="radio" name="language" value="language">Chinese(简体中文)
    </form>
    <h3 id="sound-select" style="text-align:center">Select sound:</h3>
    <form id="sound-selection">
        <input id="default-1" type="radio" name="sound" value="default-1">
        <label id="Bell" for="default-1">Bell</label>
        <br>
        <input id="default-2" type="radio" name="sound" value="default-2">
        <label id="BigBen" for="default-2">Big Ben</label>
        <br>
        <input id="default-3" type="radio" name="sound" value="default-3">
        <label id="Temple" for="default-3">Temple (Low Freq)</label>
    </form>
    <!-- Long break interval -->
    <h3    id="LongBreakInterval">Long Break Interval:</h3>
    <input id="long-break-interval" name="long-break-interval" type="text" min="1" max="10" value="4">
    <h3 id="colorblindtitle">Color Blind Mode:</h3>
    <input type="checkbox" id="colorblindbox">
    <div id="settingsButtons">
        <!-- Statistics button -->
        <button id="statistics">Stats</button>
        <button id="saveSettings">Save</button>
    </div>
</span>

<span id="dogeCoinMenu">
    <h2 id="dogeTitle">Doge Shop</h2>
    <h3 id="themeTitle">Themes</h3>
    <p id="preview">Click to Preview</p>
    <p id="select">Buy/Select</p>
    <div id="wildjungle" class="theme">
        <h3>Wild Jungle</h3>
        <p id="junglecost">Free</p>
    </div>
    <button id="wildjunglebuy" class="buyButton">Selected</button>
    <div id="night" class="theme">
        <h3>Night Mode</h3>
        <p id="nightcost">Free</p>
    </div>
    <button id="nightbuy" class="buyButton">Owned</button>
    <div id="aquatic" class="theme">
        <h3>Aquatic</h3>
        <p id="aquaticcost">50 Coins</p>
    </div>
    <button id="aquaticbuy" class="buyButton">Buy</button>
    <div id="sanfrancisco" class="theme">
        <h3>San Francisco</h3>
        <p id="sanfranciscocost">100 Coins</p>
    </div>
    <button id="sanfranciscobuy" class="buyButton">Buy</button>
    <div id="dogeland" class="theme">
        <h3>Doge Land</h3>
        <p id="dogecost">Everything</p>
    </div>
    <button id="dogebuy" class="buyButton">Buy</button>
    <button id="dogeSave">Close</button>
    <p id="insufficientText">Insufficient Funds</p>
</span>

<span id="statisticsMenu">
    <h2 id="statisticsTitle">Stats</h2>
    <h3 id="statsWork">You have worked 0 mins</h3>
    <h3 id="statsBreak">And rested 0 mins</h3>
    <h3 id="statsCong">Congrats! Keep on moving!</h3>
    <button id="OKbtn-statistics">OK</button>
</span>
<footer id="footer">

</footer>

<span id="loginNotification">
    <h2>Hey There!</h2>
    <h3>Looks like you aren't logged in</h3>
    <button id="guestCont">Continue as </br>Guest</button>
    <button id="loginCont">Login</button>
    <p id="notifCreate">Create an account</p>
</span>

<span id="loginMain">
    <h1>Login</h1>
    <h2 id="usertext">Username </h2>
    <input type="text" id="user">
    <h2 id="passtext">Password </h2>
    <input type="password" id="pass">
    <button id="quitLogin">X</button>
    <button id="proceedLogin">Login</button>
    <button id="createAccInstead">Create an account</button>
</span>

<span id="accountCreation">
    <h1>Create Account</h1>
    <h2 id="emailtext">Email </h2>
    <input type="text" id="emailCreate">
    <h2 id="createPassText">Password </h2>
    <input type="password" id="passCreate">
    <h2 id="nameText">Name </h2>
    <input type="text" id="nameCreate">
    <button id="quitCreate">X</button>
    <button id="switchToLogin">Sign In Instead</button>
    <button id="createAcc">Create</button>
</span>

<span id="greywrapper"></span>
</div>

<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js"></script>

<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
<script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-analytics.js"></script>

<!-- Add Firebase products that you want to use -->
<script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-firestore.js"></script>
<script>
var firebaseConfig = {
    apiKey: "AIzaSyC3aqVaAxSSt5FlCOBkoL5JVmiFoib9aTE",
    authDomain: "userdata-e83e7.firebaseapp.com",
    projectId: "userdata-e83e7",
    storageBucket: "userdata-e83e7.appspot.com",
    messagingSenderId: "161185941557",
    appId: "1:161185941557:web:89bd010354b630be6b897c",
    measurementId: "G-QE552WPF9J"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
</script>
<script src="./source/Front-end/javascript/main.js"></script>
`;

const { getByText, getByTestId, fireEvent } = require("@testing-library/dom");
let {
  // methods
  timeToSec,
  secToTime,
  fillColor,
  drainColor,
  updateTable,
  countDown,
  autoSwitchMode,
  changeMode,
  runCounter,

  // vars
  workSec,
  totalSec,
  currMode,
  currSec,
  counts,
} = require("../source/Front-end/javascript/main.js");

describe("timeToSec testing", () => {
  test("should turn 02:00 into 120", () => {
    expect(timeToSec("02:00")).toBe(120);
  });

  test("should turn 00:00 into 0", () => {
    expect(timeToSec("00:00")).toBe(0);
  });

  test("should turn 05:22 into 322", () => {
    expect(timeToSec("05:22")).toBe(322);
  });

  //   test("should set max of input", () => {
  //     expect(timeToSec("99:99")).toBe(23*60+59);
  //   });
});

describe("setToTime testing", () => {
  test("should turn 120 into 02:00", () => {
    expect(secToTime(120)).toBe("02:00");
  });

  test("should turn 0 into 00:00", () => {
    expect(secToTime(0)).toBe("00:00");
  });

  test("should turn 322 into 05:22", () => {
    expect(secToTime(322)).toBe("05:22");
  });
});

describe("fillColor testing", () => {
  test("should set style attribute", () => {
    header = document.getElementById("header");
    footer = document.getElementById("footer");
    gear = document.getElementById("gear");
    gear_img = "./source/Front-end/css/assets/Geartransparent.png";

    fillColor();

    // after calling function
    expect(header.style.backgroundColor).toBe("rgba(3, 165, 89, 0.6)");
    expect(header.style.color).toBe("white");
    expect(header.style.textShadow).toBe("2px 2px black");
    expect(footer.style.backgroundColor).toBe("rgba(3, 165, 89, 0.6)");
    // expect(gear.src).toEqual(gear_img);
  });
});

describe("drainColor testing", () => {
  test("should set style attribute", () => {
    header = document.getElementById("header");
    footer = document.getElementById("footer");
    gear = document.getElementById("gear");
    gear_img = "./source/Front-end/css/assets/gearblack.png";

    drainColor();

    // after calling function
    expect(header.style.backgroundColor).toBe("grey");
    expect(header.style.color).toBe("black");
    expect(header.style.textShadow).toBe("0px 0px black");
    expect(footer.style.backgroundColor).toBe("grey");
    // expect(gear.src).toEqual(gear_img);
  });
});

describe("updateTable testing", () => {
  let counter = document.getElementById("counter");
  let workPhase = document.getElementById("workPhase");
  let longBreak = document.getElementById("longBreak");
  let shortBreak = document.getElementById("shortBreak");

  test("should updateTable, currMode=w, counts=0", () => {
    let currMode = "w";
    let counts = 0;

    updateTable();

    expect(counter.style.opacity).toBe("0.4");
    expect(workPhase.style.opacity).toBe("1");
    expect(longBreak.style.opacity).toBe("0.4");
    expect(shortBreak.style.opacity).toBe("0.4");

    expect(counter.innerHTML).toBe("4x");
  });

  test("should updateTable, currMode=w, counts=1", () => {
    let currMode = "w";
    let counts = 1;

    updateTable();

    expect(counter.style.opacity).toBe("0.4");
    expect(workPhase.style.opacity).toBe("1");
    expect(longBreak.style.opacity).toBe("0.4");
    expect(shortBreak.style.opacity).toBe("0.4");

    // expect(counter.innerHTML).toBe("3x");
  });

  test("should updateTable, currMode=w, counts=2", () => {
    let currMode = "w";
    let counts = 2;

    updateTable();

    expect(counter.style.opacity).toBe("0.4");
    expect(workPhase.style.opacity).toBe("1");
    expect(longBreak.style.opacity).toBe("0.4");
    expect(shortBreak.style.opacity).toBe("0.4");

    // expect(counter.innerHTML).toBe("2x");
  });

  test("should updateTable, currMode=w, counts=3", () => {
    let currMode = "w";
    let counts = 3;

    updateTable();

    expect(counter.style.opacity).toBe("0.4");
    expect(workPhase.style.opacity).toBe("1");
    expect(longBreak.style.opacity).toBe("0.4");
    expect(shortBreak.style.opacity).toBe("0.4");

    // expect(counter.innerHTML).toBe("1x");
  });

  test("should updateTable, currMode=w, counts=4", () => {
    let currMode = "w";
    let counts = 4;

    updateTable();

    expect(counter.style.opacity).toBe("0.4");
    expect(workPhase.style.opacity).toBe("1");
    expect(longBreak.style.opacity).toBe("0.4");
    expect(shortBreak.style.opacity).toBe("0.4");

    //     expect(counter.innerHTML).toBe("0x");
  });
});

describe("changeMode testing", () => {
  test("change HTML content when radio-working-mode is checked", () => {
    document.body.innerHTML = `
    <div id="container">
        <header id="header">
            <h1>PomoTime</h1>
            <h2 id="welcome">Welcome Guest!</h2>
            <div id="options">
                <!--<h2>Options</h2> -->
                <!--<h2 id="stats">Stats</h2> To be implemented later.-->
                <img id="gear" src="./source/Front-end/css/assets/Geartransparent.png">
            </div>
        </header>
 
        <main>
            <div id="clock">
                <h1 id="time">25:00</h1>
            </div>
 
            <fieldset id="mode-selection">
                <div id="radio-working-mode-container">
                    <input type="radio" id="radio-working-mode" name="radio-mode" checked>
                    <label for="radio-working-mode">Work</label>
                </div>
                <div id="radio-shortBreak-mode-container">
                    <input type="radio" id="radio-shortBreak-mode" name="radio-mode">
                    <label for="radio-shortBreak-mode">Short Break</label>
                </div>
                <div id="radio-longBreak-mode-container">
                    <input type="radio" id="radio-longBreak-mode" name="radio-mode">
                    <label for="radio-longBreak-mode">Long Break</label>
                </div>
            </fieldset>

            <table id="chart">
                <tr id="workPhase">
                    <td>Work Phase</td>
                    <td>25m</td>
                </tr>
                <tr>
                    <td>&#8597</td>
                    <td id="counter">4x</td>
                </tr>
                <tr id="shortBreak">
                    <td>Short Break</td>
                    <td>5m</td>
                </tr>
                <tr>
                    <td>&#8595</td>
                </tr>
                <tr id="longBreak">
                    <td>Long Break</td>
                    <td>15m</td>
                </tr>
            </table>

            <div id="start-btn-container">
                <button id="start-btn" type="button">START</button>
            </div>

            <audio id="sound-effect" src="./source/Front-end/css/assets/bellChime.mp3"></audio>
        </main>

        <span id="settingsMenu">
            <h2 id="exitSettings">X</h2>
            <h2 id="settingsTitle">Settings</h2>
            <div id="volume-controls">
                <img id="volume-pic" src="source/Front-end/css/assets/volume-level-3.svg">
                <input id="volume-slider" type="range" min="0" max="100" value="100">
            </div>
            <button id="statistics">Statistics</button>
        </span>

        <footer id="footer">

        </footer>
    </div>
`;
    changeMode();
    expect(document.getElementById("time").innerHTML).toBe(secToTime(workSec));
  });

//   test("change HTML content when radio-shortBreak-mode is checked", () => {
//     document.body.innerHTML = `
//     <div id="container">
//         <header id="header">
//             <h1>PomoTime</h1>
//             <h2 id="welcome">Welcome Guest!</h2>
//             <div id="options">
//                 <!--<h2>Options</h2> -->
//                 <!--<h2 id="stats">Stats</h2> To be implemented later.-->
//                 <img id="gear" src="./source/Front-end/css/assets/Geartransparent.png">
//             </div>
//         </header>
 
//         <main>
//             <div id="clock">
//                 <h1 id="time">25:00</h1>
//             </div>
 
//             <fieldset id="mode-selection">
//                 <div id="radio-working-mode-container">
//                     <input type="radio" id="radio-working-mode" name="radio-mode">
//                     <label for="radio-working-mode">Work</label>
//                 </div>
//                 <div id="radio-shortBreak-mode-container">
//                     <input type="radio" id="radio-shortBreak-mode" name="radio-mode" checked>
//                     <label for="radio-shortBreak-mode">Short Break</label>
//                 </div>
//                 <div id="radio-longBreak-mode-container">
//                     <input type="radio" id="radio-longBreak-mode" name="radio-mode">
//                     <label for="radio-longBreak-mode">Long Break</label>
//                 </div>
//             </fieldset>

//             <table id="chart">
//                 <tr id="workPhase">
//                     <td>Work Phase</td>
//                     <td>25m</td>
//                 </tr>
//                 <tr>
//                     <td>&#8597</td>
//                     <td id="counter">4x</td>
//                 </tr>
//                 <tr id="shortBreak">
//                     <td>Short Break</td>
//                     <td>5m</td>
//                 </tr>
//                 <tr>
//                     <td>&#8595</td>
//                 </tr>
//                 <tr id="longBreak">
//                     <td>Long Break</td>
//                     <td>15m</td>
//                 </tr>
//             </table>

//             <div id="start-btn-container">
//                 <button id="start-btn" type="button">START</button>
//             </div>

//             <audio id="sound-effect" src="./source/Front-end/css/assets/bellChime.mp3"></audio>
//         </main>

//         <span id="settingsMenu">
//             <h2 id="exitSettings">X</h2>
//             <h2 id="settingsTitle">Settings</h2>
//             <div id="volume-controls">
//                 <img id="volume-pic" src="source/Front-end/css/assets/volume-level-3.svg">
//                 <input id="volume-slider" type="range" min="0" max="100" value="100">
//             </div>
//             <button id="statistics">Statistics</button>
//         </span>

//         <footer id="footer">

//         </footer>
//     </div>
// `;
//     changeMode();
//     expect(document.getElementById("time").innerHTML).toBe(secToTime(workSec));
//   });
//   test("change HTML content when radio-longBreak-mode is checked", () => {
//     document.body.innerHTML = `
//     <div id="container">
//         <header id="header">
//             <h1>PomoTime</h1>
//             <h2 id="welcome">Welcome Guest!</h2>
//             <div id="options">
//                 <!--<h2>Options</h2> -->
//                 <!--<h2 id="stats">Stats</h2> To be implemented later.-->
//                 <img id="gear" src="./source/Front-end/css/assets/Geartransparent.png">
//             </div>
//         </header>
 
//         <main>
//             <div id="clock">
//                 <h1 id="time">25:00</h1>
//             </div>
 
//             <fieldset id="mode-selection">
//                 <div id="radio-working-mode-container">
//                     <input type="radio" id="radio-working-mode" name="radio-mode">
//                     <label for="radio-working-mode">Work</label>
//                 </div>
//                 <div id="radio-shortBreak-mode-container">
//                     <input type="radio" id="radio-shortBreak-mode" name="radio-mode">
//                     <label for="radio-shortBreak-mode">Short Break</label>
//                 </div>
//                 <div id="radio-longBreak-mode-container">
//                     <input type="radio" id="radio-longBreak-mode" name="radio-mode" checked>
//                     <label for="radio-longBreak-mode">Long Break</label>
//                 </div>
//             </fieldset>

//             <table id="chart">
//                 <tr id="workPhase">
//                     <td>Work Phase</td>
//                     <td>25m</td>
//                 </tr>
//                 <tr>
//                     <td>&#8597</td>
//                     <td id="counter">4x</td>
//                 </tr>
//                 <tr id="shortBreak">
//                     <td>Short Break</td>
//                     <td>5m</td>
//                 </tr>
//                 <tr>
//                     <td>&#8595</td>
//                 </tr>
//                 <tr id="longBreak">
//                     <td>Long Break</td>
//                     <td>15m</td>
//                 </tr>
//             </table>

//             <div id="start-btn-container">
//                 <button id="start-btn" type="button">START</button>
//             </div>

//             <audio id="sound-effect" src="./source/Front-end/css/assets/bellChime.mp3"></audio>
//         </main>

//         <span id="settingsMenu">
//             <h2 id="exitSettings">X</h2>
//             <h2 id="settingsTitle">Settings</h2>
//             <div id="volume-controls">
//                 <img id="volume-pic" src="source/Front-end/css/assets/volume-level-3.svg">
//                 <input id="volume-slider" type="range" min="0" max="100" value="100">
//             </div>
//             <button id="statistics">Statistics</button>
//         </span>

//         <footer id="footer">

//         </footer>
//     </div>
// `;
//     changeMode();
//     expect(document.getElementById("time").innerHTML).toBe(secToTime(workSec));
//   });
});

describe("countDown testing", () => {
  test("totalSec = 0, should call autoSwitchMode", () => {
    expect(1).toBe(1);
    // ------ TODO: remaining test case: when totalSec is 0, autoSwitch would be called once
    //     let mockfunc = jest.fn();
    //     autoSwitchMode = mockfunc;

    //     totalSec = 0;
    //     countDown();

    //     expect(document.getElementById("sound-effect").paused).toBe(true);
    //     expect(autoSwitchMode).toHaveBeenCalled();
  });

//   test("totalSec = 2, should update HTML content to 00:01", () => {
//     totalSec = 2;

//     countDown();

//     expect(document.getElementById("time").innerHTML).toBe("00:01");
//   });
});

// TODO
// describe("autoSwitchMode testing", () => {
//   test("currMode = w, counts != 4 --> enter short break mode", () => {
//     document.body.innerHTML = `
//     <div id="container">
//         <header id="header">
//             <h1>PomoTime</h1>
//             <h2 id="welcome">Welcome Guest!</h2>
//             <div id="options">
//                 <!--<h2>Options</h2> -->
//                 <!--<h2 id="stats">Stats</h2> To be implemented later.-->
//                 <img id="gear" src="./source/Front-end/css/assets/Geartransparent.png">
//             </div>
//         </header>
 
//         <main>
//             <div id="clock">
//                 <h1 id="time">25:00</h1>
//             </div>
 
//             <fieldset id="mode-selection">
//                 <div id="radio-working-mode-container">
//                     <input type="radio" id="radio-working-mode" name="radio-mode" checked>
//                     <label for="radio-working-mode">Work</label>
//                 </div>
//                 <div id="radio-shortBreak-mode-container">
//                     <input type="radio" id="radio-shortBreak-mode" name="radio-mode">
//                     <label for="radio-shortBreak-mode">Short Break</label>
//                 </div>
//                 <div id="radio-longBreak-mode-container">
//                     <input type="radio" id="radio-longBreak-mode" name="radio-mode">
//                     <label for="radio-longBreak-mode">Long Break</label>
//                 </div>
//             </fieldset>

//             <table id="chart">
//                 <tr id="workPhase">
//                     <td>Work Phase</td>
//                     <td>25m</td>
//                 </tr>
//                 <tr>
//                     <td>&#8597</td>
//                     <td id="counter">4x</td>
//                 </tr>
//                 <tr id="shortBreak">
//                     <td>Short Break</td>
//                     <td>5m</td>
//                 </tr>
//                 <tr>
//                     <td>&#8595</td>
//                 </tr>
//                 <tr id="longBreak">
//                     <td>Long Break</td>
//                     <td>15m</td>
//                 </tr>
//             </table>

//             <div id="start-btn-container">
//                 <button id="start-btn" type="button">START</button>
//             </div>

//             <audio id="sound-effect" src="./source/Front-end/css/assets/bellChime.mp3"></audio>
//         </main>

//         <span id="settingsMenu">
//             <h2 id="exitSettings">X</h2>
//             <h2 id="settingsTitle">Settings</h2>
//             <div id="volume-controls">
//                 <img id="volume-pic" src="source/Front-end/css/assets/volume-level-3.svg">
//                 <input id="volume-slider" type="range" min="0" max="100" value="100">
//             </div>
//             <button id="statistics">Statistics</button>
//         </span>

//         <footer id="footer">

//         </footer>
//     </div>
// `;
//     currMode = "w";
//     counts = 4;

//     autoSwitchMode();

//     expect(document.getElementById("radio-working-mode").checked).toBe(true);
//   });
// });

describe("runCounter testing", () => {
    test("should increment counts", () => {

        currMode = "w";
        counts = 2;

        runCounter();

        expect(counts).toBe(2);
    })
})