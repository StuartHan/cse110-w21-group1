


const { incrementCoin } = require("../source/Front-end/javascript/mainjest.js");

describe("incrementCoin testing", () => {
    test("should be 0 initially", () => {
        expect(document.getElementById("cointext").innerHTML).toBe("0");
    })

    test("should update cointext", () => {
        localStorage.setItem("coin", 0);
        incrementCoin(100);
        expect(document.getElementById("cointext").innerHTML).toBe("100");
    })

    test("should update cointext", () => {
        localStorage.setItem("coin", 55);
        incrementCoin(120);
        expect(document.getElementById("cointext").innerHTML).toBe("175");
    })

    // test("should be 0 when negative number entered", () => {
    //     localStorage.setItem("coin", 80);
    //     incrementCoin(-1);
    //     expect(document.getElementById("cointext").innerHTML).toBe("80");
    // })
})