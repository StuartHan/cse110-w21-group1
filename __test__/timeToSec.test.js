/**
 * @jest-environment jsdom
 */

const { getByText, getByTestId, fireEvent } = require("@testing-library/dom");

describe("timeToSec", () => {

  document.body.innerHTML = `
  <!--***************************************************************************
 * File Name    : index.html
 * First Created: Feb 14
 * Last  Revised: Feb 14 -- Yichen Han
 * Curr  Version: 1.0
 * 
 * Description  : [NOTE!!! TIME HTML MUST CORRESPOND TO worSec]
 * Variables    : 
 * Functions    : 
 * 
 * Next Feature : 
 ***************************************************************************-->

 <!DOCTYPE html>
 <html lang="en">
 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PomoTime</title>
    <link rel="stylesheet" href="./source/Front-end/css/main.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@600&display=swap" rel="stylesheet">
</head>
 
<body>
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

</body>
    <script src="./source/Front-end/javascript/main.js"></script>

</html>
  `;

  const timeToSec = require("../source/Front-end/javascript/main.js");

  test("should change 02:00 into 120", () => {
    expect(timeToSec("02:00")).toBe(120);
  });

  test("should change 00:00 into 0", () => {
    expect(timeToSec("00:00")).toBe(0);
  });

  test("should change 05:20 into 320", () => {
    expect(timeToSec("00:00")).toBe(0);
  });
});
