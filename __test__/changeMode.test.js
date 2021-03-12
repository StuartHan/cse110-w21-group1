




const { changeMode, workSec, secToTime } = require("../source/Front-end/javascript/mainjest.js")

describe("changeMode testing", () => {
    //
    // test 1
    //
    test("change HTML content when radio-working-mode is checked", () => {
        changeMode();
        expect(document.getElementById("time").innerHTML).toBe(secToTime(workSec));
    });

    //
    // test 2
    //
    test("change HTML content when radio-shortBreak-mode is checked", () => {

        changeMode();
        expect(document.getElementById("time").innerHTML).toBe(secToTime(workSec));
    });

    //
    // test 3
    //
    test("change HTML content when radio-longBreak-mode is checked", () => {

        changeMode();
        expect(document.getElementById("time").innerHTML).toBe(secToTime(workSec));
    });
});