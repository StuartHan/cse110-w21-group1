

const { turnLight } = require("../source/Front-end/javascript/mainjest.js");

describe("turnLight testing", () => {
    test("test", () => {

        turnLight();

        expect(document.getElementById("header").style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById("main").style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById("footer").style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        // expect(color).toBe("rgba(255, 255, 255, 0.4)");
    })

})