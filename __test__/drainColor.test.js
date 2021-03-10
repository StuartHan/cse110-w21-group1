document.body.innerHTML =
    `
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

        <span id="teams">
            <h2 id="teamsLabel">Teams</h2>
            <button id="invite">Invite</button>
            <button id="createTeamButton">Create</button>
            <p id="teamsExit">X</p>
            <span id="teamsEntry">

            </span>
            <p id="disableText">Disable Teams</p>
            <input type="checkbox" id="disableTeams">
        </span>

        <span id="createTeam">
            <h2 id="createTeamTag">Create Team</h2>
            <button id="backToTeams">Back</button>
            <p id="quitCreateTeam">X</p>
            <p id="teamName">Name</p>
            <p id="workTeam">Work Time</p>
            <p id="shortTeam">Short Break</p>
            <p id="longTeam">Long Break</p>
            <button id="finalizeCreate">Create</button>
        </span>

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
                <h3 id="wildjungletitle">Wild Jungle</h3>
                <p  id="junglecost">Free</p>
            </div>
            <button id="wildjunglebuy" class="buyButton">Selected</button>
            <div id="night" class="theme">
                <h3 id="nightmodetitle">Night Mode</h3>
                <p  id="nightcost">Free</p>
            </div>
            <button id="nightbuy" class="buyButton">Owned</button>
            <div id="aquatic" class="theme">
                <h3 id="aquatictitle">Aquatic</h3>
                <p  id="aquaticcost">50 Coins</p>
            </div>
            <button id="aquaticbuy" class="buyButton">Buy</button>
            <div id="sanfrancisco" class="theme">
                <h3 id="sanfranciscotitle">San Francisco</h3>
                <p  id="sanfranciscocost">100 Coins</p>
            </div>
            <button id="sanfranciscobuy" class="buyButton">Buy</button>
            <div id="dogeland" class="theme">
                <h3 id="dogelandtitle">Doge Land</h3>
                <p  id="dogecost">Everything</p>
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
            <h2 id="heytitle">Hey There!</h2>
            <h3 id="lookstitle">Looks like you aren't logged in</h3>
            <button id="guestCont">Continue as </br>Guest</button>
            <button id="loginCont">Login</button>
            <p id="notifCreate">Create an account</p>
        </span>

        <span id="loginMain">
            <h1 id="logintitle">Login</h1>
            <h2 id="usertext">Username </h2>
            <input type="text" id="user">
            <h2 id="passtext">Password </h2>
            <input type="password" id="pass">
            <button id="quitLogin">X</button>
            <button id="proceedLogin">Login</button>
            <button id="createAccInstead">Create an account</button>
        </span>

        <span id="accountCreation">
            <h1 id="createTitle">Create Account</h1>
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


const { drainColor } = require("../source/Front-end/javascript/mainjest.js");

describe("drainColor testing", () => {

    test("before setting, should be empty string", () => {
        header = document.getElementById("header");
        footer = document.getElementById("footer");
        gear = document.getElementById("gear");

        expect(header.style.backgroundColor).toBe("");
        expect(footer.style.backgroundColor).toBe("");
        expect(gear.style.backgroundColor).toBe("");

    })

    test("should set style attribute", () => {
        header = document.getElementById("header");
        footer = document.getElementById("footer");
        gear = document.getElementById("gear");
        gear_img = "source/Front-end/css/assets/gearblack.png";

        drainColor();

        // after calling function
        expect(header.style.backgroundColor).toBe("grey");
        expect(header.style.color).toBe("black");
        expect(header.style.textShadow).toBe("0px 0px black");
        expect(footer.style.backgroundColor).toBe("grey");
        expect(gear.src).toEqual("http://localhost/" + gear_img);
    });
});