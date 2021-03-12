


const { setActive } = require("../source/Front-end/javascript/mainjest.js");

describe("setActive testing", () => {
    test("setActive of first element", () => {
        setActive(0);
        expect(localStorage.getItem("active")).toBe("10000");
    })

    test("setActive of third element", () => {
        setActive(2);
        expect(localStorage.getItem("active")).toBe("00100");
    })

    test("setActive should not working when input >= 5", () => {
        setActive(5);
        expect(localStorage.getItem("active")).toBe("00000");
    })

    test("setActive should not working when input < 0", () => {
        setActive(-1);
        expect(localStorage.getItem("active")).toBe("00000");
    })
})