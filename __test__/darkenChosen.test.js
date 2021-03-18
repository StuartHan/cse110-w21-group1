



document.body.innerHTML = 
`
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, user-scalable=0">
    <link href="./source/Front-end/css/assets/favicon.ico" rel="icon" />
    <title>PomoTime</title>
    <link rel="stylesheet" href="./source/Front-end/css/main.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@600&display=swap" rel="stylesheet">
</head>

<body id="body">
    <div id="container">
        <header id="header">
            <h1>PomoTime</h1>
            <img id="profilepic" src="./source/Front-end/css/assets/basicprofilepic.png">
            <h2 id="welcome">Welcome <br/> Guest!</h2>
            <img id="stats" src="./source/Front-end/css/assets/stats.png">
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
            <button id="teamsAccountLogin">Login</button>
            <p id="disableText">Disable Teams</p>
            <input type="checkbox" id="disableTeams">
        </span>

        <span id="createTeam">
            <h2 id="createTeamTag">Create Team</h2>
            <button id="backToTeams">Back</button>
            <p id="quitCreateTeam">X</p>
            <p id="teamName">Name</p>
            <input type="text" id="nameTeam">
            <p id="workTeam">Work Time</p>
            <input type="text" id="workTimeTeam">
            <p id="shortTeam">Short Break</p>
            <input type="text" id="shortTimeTeam">
            <p id="longTeam">Long Break</p>
            <input type="text" id="longTimeTeam">
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
            <select id="language-form">
                <option value="English" id="english-selection">English</option>
                <option value="Chinese" id="chinese-selection">Chinese(简体中文)</option>
            </select>
            <h3 id="sound-select" style="text-align:center">Select sound:</h3>
            <select id="sound-selection">
                <option value="Bell" id="default-1">Bell</option>
                <option value="BigBen" id="default-2">Big Ben</option>
                <option value="Temple" id="default-3">Temple (Low Freq)</option>
            </select>
            <!-- Long break interval -->
            <h3    id="LongBreakInterval">Work Phases in 1 Round:</h3>
            <input id="long-break-interval" name="long-break-interval" type="text" min="1" max="10" value="4">
            <h3 id="colorblindtitle">Color Blind Mode:</h3>
            <input type="checkbox" id="colorblindbox">
            <div id="settingsButtons">
                <!-- Statistics button -->
                <!-- <button id="statistics">Stats</button> -->
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
            <h3 id="statsWork">You have worked 0 mins.</h3>
            <h3 id="statsBreak">And rested 0 mins.</h3>
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
            databaseURL: "https://userdata-e83e7-default-rtdb.firebaseio.com",
            measurementId: "G-QE552WPF9J",
        };
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        var db = firebase.firestore();
    </script>
    <script src="./source/Front-end/javascript/main.js"></script>
</body>
`



const { darkenChosen } = require("../source/Front-end/javascript/mainjest.js")

describe("darkenchosen testing", () => {
    test ("text and style should be default, shopitems=000, active=00000", () => {

        localStorage.setItem("shopitems", "000")
        localStorage.setItem("active", "00000")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Owned");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Buy");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Buy");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
        
    })

    test ("should set appropriate text and style, shopitems=100, active=10000", () => {

        localStorage.setItem("shopitems", "100")
        localStorage.setItem("active", "10000")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Selected");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Buy");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
    })

    test ("should set appropriate text and style, shopitems=100, active=01000", () => {

        localStorage.setItem("shopitems", "100")
        localStorage.setItem("active", "01000")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Owned");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Selected");

        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Buy");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
    })

    test ("should set appropriate text and style, shopitems=100, active=00010", () => {

        localStorage.setItem("shopitems", "100")
        localStorage.setItem("active", "00010")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        
        // default items (Owned)
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Owned");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Owned");

        // shop items
        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Selected");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
    })

    test ("should set appropriate text and style, shopitems=100, active=00010", () => {

        localStorage.setItem("shopitems", "000")
        localStorage.setItem("active", "00100")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        
        // default items (Owned)
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Owned");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Owned");

        // shop items
        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Selected");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Buy");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
    })
})