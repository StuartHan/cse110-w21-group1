/**
 * @jest-environment jsdom
 */

// import 'jest-dom/extend-expect'
// import { render, cleanup } from 'react-testing-library'

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

const { getByText, getByTestId, fireEvent } = require("@testing-library/dom");
const {
  // methods
  timeToSec,
  secToTime,
  fillColor,
  drainColor,
  updateTable,
  countDown,
  autoSwitchMode,
  changeMode,

  // vars
  workSec,
  totalSec,
  currMode,
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
    expect(header.style.backgroundColor).toBe("lightgreen");
    expect(header.style.color).toBe("white");
    expect(header.style.textShadow).toBe("2px 2px black");
    expect(footer.style.backgroundColor).toBe("lightgreen");
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

describe("countDown testing", () => {
  test("totalSec = 0, should switch mode", () => {
    let totalSec = 0;
    countDown();

    // TODO
    expect(document.getElementById("sound-effect").played.length).toBe(0);
  });
});

describe("autoSwitchMode testing", () => {
  // TODO
  test("test", () => {
    expect(1).toBe(1);
  });
});

describe("changeMode testing", () => {
  // TODO

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

  test("change HTML content when radio-shortBreak-mode is checked", () => {
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
                    <input type="radio" id="radio-working-mode" name="radio-mode">
                    <label for="radio-working-mode">Work</label>
                </div>
                <div id="radio-shortBreak-mode-container">
                    <input type="radio" id="radio-shortBreak-mode" name="radio-mode" checked>
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
  test("change HTML content when radio-longBreak-mode is checked", () => {
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
                    <input type="radio" id="radio-working-mode" name="radio-mode">
                    <label for="radio-working-mode">Work</label>
                </div>
                <div id="radio-shortBreak-mode-container">
                    <input type="radio" id="radio-shortBreak-mode" name="radio-mode">
                    <label for="radio-shortBreak-mode">Short Break</label>
                </div>
                <div id="radio-longBreak-mode-container">
                    <input type="radio" id="radio-longBreak-mode" name="radio-mode" checked>
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
});
