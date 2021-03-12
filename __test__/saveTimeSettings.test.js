


const { saveTimeSettings,
        sBrkSec,
        lBrkSec,
        workSec,
        secToTime,
        counts } = require("../source/Front-end/javascript/mainjest.js")

describe("saveTimeSettings testing", () => {
    test("should detect edge cases: all numbers are zero", () => {

        // ----- settings before function call -----

        // set to edge cases (all zero)
        document.getElementById("work-time-number").value = 0;
        document.getElementById("short-break-number").value = 0;
        document.getElementById("long-break-number").value = 0;
        document.getElementById("long-break-interval").value = 0;

        // mock empty localstotage
        storage = window.localStorage;

        // ----- function call: ----- 
        saveTimeSettings();  // should detect zero and set the values to 1

        // -----  testing -----

        // test html content
        expect(document.getElementById("workTime").innerHTML).toBe("1m");
        expect(document.getElementById("shortBreakTime").innerHTML).toBe("1m");
        expect(document.getElementById("longBreakTime").innerHTML).toBe("1m");

        // test update total sec
        expect(document.getElementById("time").innerHTML).toBe(secToTime(60));

        // test long break interval, edge cases should be detected
        expect(document.getElementById("long-break-interval").value).toBe("1");

        // set to 1 directly
        expect(document.getElementById("counter").innerHTML).toBe( ((1 - counts) > 1 ? (1 - counts) : 1) + "x");

        // test storage
        expect(storage["workSec"]).toBe("60");
        expect(storage["sBrkSec"]).toBe("60");
        expect(storage["lBrkSec"]).toBe("60");
        expect(storage["lBrkItv"]).toBe("1");
    });

    test("test general case 1", () => {

        // ----- settings before function call -----

        // set to general cases 
        document.getElementById("work-time-number").value = 5;
        document.getElementById("short-break-number").value = 4;
        document.getElementById("long-break-number").value = 3;
        document.getElementById("long-break-interval").value = 2;
        storage = window.localStorage;
        currMode = "w";

        // ---- function call -----

        saveTimeSettings();

        // ----- testing -----

        // test html content
        expect(document.getElementById("workTime").innerHTML).toBe("5m");
        expect(document.getElementById("shortBreakTime").innerHTML).toBe("4m");
        expect(document.getElementById("longBreakTime").innerHTML).toBe("3m");

        // test update total sec
        expect(document.getElementById("time").innerHTML).toBe(secToTime(300));

        // set to 1 directly
        expect(document.getElementById("counter").innerHTML).toBe( ((2 - counts) > 1 ? (2 - counts) : 1) + "x");

        // test storage
        expect(storage["workSec"]).toBe("300");
        expect(storage["sBrkSec"]).toBe("240");
        expect(storage["lBrkSec"]).toBe("180");
        expect(storage["lBrkItv"]).toBe("2");
    });

    test("test general case 2", () => {

        // ----- settings before function call -----

        // set to general cases 
        document.getElementById("work-time-number").value = 25;
        document.getElementById("short-break-number").value = 5;
        document.getElementById("long-break-number").value = 30;
        document.getElementById("long-break-interval").value = 10;
        storage = window.localStorage;
        currMode = "w";

        // ---- function call -----

        saveTimeSettings();

        // ----- testing -----

        // test html content
        expect(document.getElementById("workTime").innerHTML).toBe("25m");
        expect(document.getElementById("shortBreakTime").innerHTML).toBe("5m");
        expect(document.getElementById("longBreakTime").innerHTML).toBe("30m");

        // test update total sec
        expect(document.getElementById("time").innerHTML).toBe("25:00");

        // set to 1 directly
        expect(document.getElementById("counter").innerHTML).toBe( ((10 - counts) > 1 ? (10 - counts) : 1) + "x");

        // test storage
        expect(storage["workSec"]).toBe("1500");
        expect(storage["sBrkSec"]).toBe("300");
        expect(storage["lBrkSec"]).toBe("1800");
        expect(storage["lBrkItv"]).toBe("10");
    });


});