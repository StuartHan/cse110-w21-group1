



const { timeToSec } = require("../source/Front-end/javascript/mainjest.js");


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

    test("should turn 23:59 into 23*60+59", () => {
        expect(timeToSec("23:59")).toBe(23*60+59);
    });
});