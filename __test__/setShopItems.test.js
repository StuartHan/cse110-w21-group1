


const { setShopItems } = require("../source/Front-end/javascript/mainjest.js");

describe("setShopItems testing", () => {
    test("should set at index 0", () => {
        localStorage.setItem("shopitems", "00000");
        setShopItems(0);
        expect(localStorage.getItem("shopitems")).toBe("10000");
    })

    test("should set at index 2", () => {
        localStorage.setItem("shopitems", "00000");
        setShopItems(2);
        expect(localStorage.getItem("shopitems")).toBe("00100");
    })

    test("should set at index 6", () => {
        localStorage.setItem("shopitems", "0000000");
        setShopItems(6);
        expect(localStorage.getItem("shopitems")).toBe("0000001");
    })

    test("should set at index 0, len=1", () => {
        localStorage.setItem("shopitems", "0");
        setShopItems(0);
        expect(localStorage.getItem("shopitems")).toBe("1");
    })
})