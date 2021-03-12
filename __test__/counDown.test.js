





const { countDown } = require("../source/Front-end/javascript/mainjest.js")

describe("countDown testing", () => {
    test("totalSec = 0, should call autoSwitchMode", () => {
        expect(1).toBe(1);
        // ------ TODO: remaining test case: when totalSec is 0, autoSwitch would be called once
            let mockfunc = jest.fn();
            autoSwitchMode = mockfunc;

            totalSec = 0;
            countDown();

            expect(document.getElementById("sound-effect").paused).toBe(true);
    });

    //   test("totalSec = 2, should update HTML content to 00:01", () => {
    //     totalSec = 2;

    //     countDown();

    //     expect(document.getElementById("time").innerHTML).toBe("00:01");
    //   });
});