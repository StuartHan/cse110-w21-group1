

const { secToTime } = require("../source/Front-end/javascript/mainjest.js");

describe("secToTime testing", () => {
    test("should turn 120 into 02:00", () => {
        expect(secToTime(120)).toBe("02:00");
    });

    test("should turn 0 into 00:00", () => {
        expect(secToTime(0)).toBe("00:00");
    });

    test("should turn 322 into 05:22", () => {
        expect(secToTime(322)).toBe("05:22");
    });

    test("should turn 1439 into 23:59", () => {
        expect(secToTime(1439)).toBe("23:59");
    });
});